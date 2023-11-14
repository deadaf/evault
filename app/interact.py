import json
from web3 import Web3, HTTPProvider
from web3.contract.contract import Contract
from decouple import config


# Client instance to interact with the blockchain
web3 = Web3(HTTPProvider(config('BLOCKCHAIN_ADDRESS')))
web3.eth.defaultAccount = web3.eth.accounts[0]


compiled_contract_path = config('COMPILED_CONTRACTS_PATH')


def get_user_contract() -> Contract:
    path = compiled_contract_path + 'User.json'

    # load contract info as JSON
    with open(path) as file:
        contract_json = json.load(file) 
        
        # fetch contract's abi - necessary to call its functions
        contract_abi = contract_json['abi']


    # Fetching deployed contract reference
    contract = web3.eth.contract(address = config("USER_CONTRACT_ADDRESS"), abi = contract_abi)
    return contract

def get_case_contract() -> Contract:
    path = compiled_contract_path + 'Case.json'

    # load contract info as JSON
    with open(path) as file:
        contract_json = json.load(file) 
        
        # fetch contract's abi - necessary to call its functions
        contract_abi = contract_json['abi']


    # Fetching deployed contract reference
    contract = web3.eth.contract(address = config("CASE_CONTRACT_ADDRESS"), abi = contract_abi)
    return contract

def get_file_contract() -> Contract:
    path = compiled_contract_path + 'File.json'

    # load contract info as JSON
    with open(path) as file:
        contract_json = json.load(file) 
        
        # fetch contract's abi - necessary to call its functions
        contract_abi = contract_json['abi']


    # Fetching deployed contract reference
    contract = web3.eth.contract(address = config("FILE_CONTRACT_ADDRESS"), abi = contract_abi)
    return contract


