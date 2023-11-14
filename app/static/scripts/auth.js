function showSignupForm() {
	document.getElementById("signupForm").style.display = "block";
	document.getElementById("authBtns").style.display = "none";
}

function hideSignupForm() {
	document.getElementById("signupForm").style.display = "none";
	document.getElementById("authBtns").style.display = "block";
}

async function handleSignup() {
	if (!isMetaMaskConnected) {
		await connectToMetaMask();
	}

	// Get form data
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const userType = document.getElementById("userType").value;

	// Make a PUT request to /user with form data
	try {
		const response = await fetch("/user", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				userType,
			}),
		});

		if (response.ok) {
			// Successfully created user, now make a GET request to retrieve user details
			await handleLogin();
		} else {
			console.error("Error creating user:", response.status, response.statusText);
		}
	} catch (error) {
		console.error("Error during signup:", error);
	}
}

async function handleLogin() {
	if (!isMetaMaskConnected) {
		await connectToMetaMask();
	}

	// Make a GET request to /users/{wallet_address}
	try {
		const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
		const walletAddress = accounts[0];

		const response = await fetch(`/users/${walletAddress}`);
		if (response.ok) {
			const userData = await response.json();

			// Update UI with user details
			document.getElementById("userData").style.display = "block";
			document.getElementById("userName").innerText = `Name: ${userData.name}`;
			document.getElementById("userEmail").innerText = `Email: ${userData.email}`;
			document.getElementById("userType").innerText = `User Type: ${userData.userType}`;
		} else {
			console.error("Error retrieving user details:", response.status, response.statusText);
		}
	} catch (error) {
		console.error("Error during login:", error);
	}
}
