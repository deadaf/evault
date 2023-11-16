import json
from web3 import Web3, HTTPProvider

# truffle development blockchain address
blockchain_address = 'http://127.0.0.1:9545'

# Client instance to interact with the blockchain
web3 = Web3(HTTPProvider(blockchain_address)) 

print("List of accounts: \n",web3.eth.accounts)
web3.eth.defaultAccount = web3.eth.accounts[0]

compiled_contract_path = 'build/contracts/User.json'


deployed_contract_address = '0x4D478f2D004527baC07e8Ac64f1ADA8CEadE7125'

# load contract info as JSON
with open(compiled_contract_path) as file:
	contract_json = json.load(file) 
	
	# fetch contract's abi - necessary to call its functions
	contract_abi = contract_json['abi']

# Fetching deployed contract reference
contract = web3.eth.contract(
	address = deployed_contract_address, abi = contract_abi)


output = contract.functions.deleteUser('').call()

print(output)
