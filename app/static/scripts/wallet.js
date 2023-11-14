async function connectToMetaMask() {
	// Check if MetaMask is installed
	if (typeof window.ethereum !== "undefined") {
		console.log("MetaMask is installed!");
		try {
			// Request account access
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
			isMetaMaskConnected = true;
			return accounts[0];
		} catch (error) {
			console.error(error);
		}
	} else {
		alert("Please install MetaMask extension in your browser.");
	}
}

async function disconnectFromMetaMask() {
	// Reset UI elements
	isMetaMaskConnected = false;
}
