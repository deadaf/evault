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
		walletAddress = await connectToMetaMask();
	} else {
		const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
		walletAddress = accounts[0];
	}

	// Get form data
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const userType = document.getElementById("userType").value;

	// Make a PUT request to /user with form data
	try {
		const response = await fetch("/users", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				userType,
				walletAddress,
			}),
		});

		if (response.ok) {
			// Successfully created user, now make a GET request to retrieve user details
			await handleLogin();
		} else {
			location.reload(true);
			alert("Already registered with this wallet address, Please Login.");
		}
	} catch (error) {
		location.reload(true);
		alert("Already registered with this wallet address, Please Login.");
	}
}

async function handleLogin() {
	if (!isMetaMaskConnected) {
		await connectToMetaMask();
	}

	try {
		const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
		const walletAddress = accounts[0];

		const response = await fetch(`/users/${walletAddress}`);
		if (response.ok) {
			const userData = await response.json();

			document.getElementById("signupForm").style.display = "none";
			document.getElementById("authBtns").style.display = "none";
			// Update UI with user details
			document.getElementById("userData").style.display = "block";
			document.getElementById("userName").innerText = `Name: ${userData.name}`;
			document.getElementById("userEmail").innerText = `Email: ${userData.email}`;
			document.getElementById("userType").innerText = `User Type: ${userData.userType}`;

			// Make a GET request to /users/{wallet_address}/cases
			const casesResponse = await fetch(`/users/${walletAddress}/cases`);
			if (casesResponse.ok) {
				const casesData = await casesResponse.json();
				displayCases(casesData);
			} else {
				console.error("Error retrieving cases:", casesResponse.status, casesResponse.statusText);
			}
		} else {
			console.error("Error retrieving user details:", response.status, response.statusText);
		}
	} catch (error) {
		console.error("Error during login:", error);
	}
}

function displayCases(casesData) {
	// Show the cases table
	const casesTable = document.getElementById("casesTable");
	casesTable.style.display = "block";

	// Clear existing table content
	casesTable.innerHTML = "";

	// Create table headers
	const tableHeaders = "<tr><th>Case ID</th><th>Title</th><th>Type</th><th>Status</th></tr>";
	casesTable.innerHTML += tableHeaders;

	// Populate table rows with case data
	casesData.forEach((caseInfo) => {
		const row = `<tr onclick="showCaseDetails(${caseInfo})">
                        <td>${caseInfo.caseId}</td>
                        <td>${caseInfo.title}</td>
                        <td>${caseInfo.caseType}</td>
                        <td>${caseInfo.status}</td>
                    </tr>`;
		casesTable.innerHTML += row;
	});

	// Add event listener to all rows
	const rows = casesTable.getElementsByTagName("tr");
	console.log(rows);
	for (let i = 1; i < rows.length; i++) {
		rows[i].addEventListener("click", () => {
			showCaseDetails(casesData[i - 1]);
		});
	}
}

function showCaseDetails(caseInfo) {
	console.log("Showing case details for case ID:", caseInfo);

	// Create popup element
	const popup = document.createElement("div");
	popup.classList.add("popup");

	// Create popup content
	const content = `
		<h2>${caseInfo.title}</h2>
		<p><strong>Case ID:</strong> ${caseInfo.caseId}</p>
		<p><strong>Type:</strong> ${caseInfo.caseType}</p>
		<p><strong>Status:</strong> ${caseInfo.status}</p>
	`;

	// Add content to popup
	popup.innerHTML = content;

	// Add popup to page
	document.body.appendChild(popup);

	// Add event listener to close popup when clicked outside
	popup.addEventListener("click", (event) => {
		if (event.target === popup) {
			popup.remove();
		}
	});
}
