async function connectToMetaMask() {
	// Check if MetaMask is installed
	if (typeof window.ethereum !== "undefined") {
		console.log("MetaMask is installed!");
		try {
			// Request account access
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
			const account = accounts[0];
			const balance = await window.ethereum.request({ method: "eth_getBalance", params: [account] });
			document.getElementById("loginBtn").style.display = "none";
			document.getElementById("logoutBtn").style.display = "block";
			document.getElementById("walletBalance").style.display = "block";
			document.getElementById("walletBalance").innerHTML = `Wallet Balance: ${balance} ETH`;
			isMetaMaskConnected = true;
		} catch (error) {
			console.error(error);
		}
	} else {
		alert("Please install MetaMask extension in your browser.");
	}
}

async function disconnectFromMetaMask() {
	// Reset UI elements
	document.getElementById("loginBtn").style.display = "block";
	document.getElementById("logoutBtn").style.display = "none";
	document.getElementById("walletBalance").style.display = "none";
	document.getElementById("walletBalance").innerHTML = "";
	isMetaMaskConnected = false;
}
