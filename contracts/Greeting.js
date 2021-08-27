import web3 from '../web3client';

const contractAddress = '0xdD56E578c079532A04D879391596ac95751D7FBC';

const byteCode =
  '60806040523480156200001157600080fd5b50604051620009f8380380620009f8833981810160405281019062000037919062000250565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415620000b45780600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000f6565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b81600090805190602001906200010e92919062000117565b50505062000468565b828054620001259062000373565b90600052602060002090601f01602090048101928262000149576000855562000195565b82601f106200016457805160ff191683800117855562000195565b8280016001018555821562000195579182015b828111156200019457825182559160200191906001019062000177565b5b509050620001a49190620001a8565b5090565b5b80821115620001c3576000816000905550600101620001a9565b5090565b6000620001de620001d884620002d3565b620002aa565b905082815260208101848484011115620001f757600080fd5b620002048482856200033d565b509392505050565b6000815190506200021d816200044e565b92915050565b600082601f8301126200023557600080fd5b815162000247848260208601620001c7565b91505092915050565b600080604083850312156200026457600080fd5b600083015167ffffffffffffffff8111156200027f57600080fd5b6200028d8582860162000223565b9250506020620002a0858286016200020c565b9150509250929050565b6000620002b6620002c9565b9050620002c48282620003a9565b919050565b6000604051905090565b600067ffffffffffffffff821115620002f157620002f06200040e565b5b620002fc826200043d565b9050602081019050919050565b600062000316826200031d565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60005b838110156200035d57808201518184015260208101905062000340565b838111156200036d576000848401525b50505050565b600060028204905060018216806200038c57607f821691505b60208210811415620003a357620003a2620003df565b5b50919050565b620003b4826200043d565b810181811067ffffffffffffffff82111715620003d657620003d56200040e565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b620004598162000309565b81146200046557600080fd5b50565b61058080620004786000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063fe50cc7214610057575b600080fd5b610055600480360381019061005091906102bc565b610075565b005b61005f61011f565b60405161006c9190610359565b60405180910390f35b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610105576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100fc9061037b565b60405180910390fd5b806000908051906020019061011b9291906101b1565b5050565b60606000805461012e9061044f565b80601f016020809104026020016040519081016040528092919081815260200182805461015a9061044f565b80156101a75780601f1061017c576101008083540402835291602001916101a7565b820191906000526020600020905b81548152906001019060200180831161018a57829003601f168201915b5050505050905090565b8280546101bd9061044f565b90600052602060002090601f0160209004810192826101df5760008555610226565b82601f106101f857805160ff1916838001178555610226565b82800160010185558215610226579182015b8281111561022557825182559160200191906001019061020a565b5b5090506102339190610237565b5090565b5b80821115610250576000816000905550600101610238565b5090565b6000610267610262846103c0565b61039b565b90508281526020810184848401111561027f57600080fd5b61028a84828561040d565b509392505050565b600082601f8301126102a357600080fd5b81356102b3848260208601610254565b91505092915050565b6000602082840312156102ce57600080fd5b600082013567ffffffffffffffff8111156102e857600080fd5b6102f484828501610292565b91505092915050565b6000610308826103f1565b61031281856103fc565b935061032281856020860161041c565b61032b81610510565b840191505092915050565b60006103436013836103fc565b915061034e82610521565b602082019050919050565b6000602082019050818103600083015261037381846102fd565b905092915050565b6000602082019050818103600083015261039481610336565b9050919050565b60006103a56103b6565b90506103b18282610481565b919050565b6000604051905090565b600067ffffffffffffffff8211156103db576103da6104e1565b5b6103e482610510565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b82818337600083830152505050565b60005b8381101561043a57808201518184015260208101905061041f565b83811115610449576000848401525b50505050565b6000600282049050600182168061046757607f821691505b6020821081141561047b5761047a6104b2565b5b50919050565b61048a82610510565b810181811067ffffffffffffffff821117156104a9576104a86104e1565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f43616c6c6572206973206e6f74206f776e65720000000000000000000000000060008201525056fea2646970667358221220092e36e706761595c330e9cc2b654faf33e63cd9ebb9c0efd198958fafed447a64736f6c63430008040033';

const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_greeting',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'getGreeting',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_greeting',
        type: 'string',
      },
    ],
    name: 'setGreeting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

async function getRevertReason(txHash) {
  const tx = await web3.eth.getTransaction(txHash);

  var result = await web3.eth.call(tx, tx.blockNumber);

  result = result.startsWith('0x') ? result : `0x${result}`;

  if (result && result.substr(138)) {
    const reason = web3.utils.toAscii(result.substr(138));
    console.log('Revert reason:', reason);
    return reason;
  } else {
    console.log('Cannot get reason - No return value');
  }
}

const getDeployedContract = contractAddress => {
  return new web3.eth.Contract(abi, contractAddress);
};

const getGreeting = async greetingAddress => {
  const Greeting = getDeployedContract(greetingAddress);
  const greeting = await Greeting.methods.getGreeting().call();
  return greeting;
};

const setGreeting = async (greetingAddress, greeting, pk) => {
  try {
    const {address: from} = web3.eth.accounts.privateKeyToAccount(pk);
    console.log('Greeting Contract Address ' + greetingAddress);
    const Greeting = getDeployedContract(greetingAddress);
    let bytecodeWithEncodedParameters = await Greeting.methods
      .setGreeting(greeting)
      .encodeABI();
    const nonce = await web3.eth.getTransactionCount(from);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await web3.eth.estimateGas({
      data: bytecodeWithEncodedParameters,
    });
    console.log('Gas Limit is ' + gasLimit);

    const txObject = {
      to: greetingAddress,
      nonce: web3.utils.toHex(nonce),
      gasLimit: web3.utils.toHex(gasLimit),
      gasPrice: web3.utils.toHex(gasPrice),
      data: `${bytecodeWithEncodedParameters}`,
      chainId: 2018,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, pk);

    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    console.log('Transaction Hash:', txReceipt.transactionHash);
    return txReceipt;
  } catch (error) {
    let errJson = JSON.stringify(error);
    let err = JSON.parse(errJson);
    console.log(err.receipt.transactionHash);
    return null;
  }
};

const deployGreetingSmartContract = async pk => {
  const {address: from} = web3.eth.accounts.privateKeyToAccount(pk);
  let contract = new web3.eth.Contract(abi);
  // deploy contract with constructor value
  console.log('here');
  const bytecodeWithEncodedParameters = contract
    .deploy({
      data: byteCode,
      arguments: ['မင်္ဂလာပါ', from],
    })
    .encodeABI();
  console.log('Deploying...');

  const nonce = await web3.eth.getTransactionCount(from);
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = await web3.eth.estimateGas({
    data: bytecodeWithEncodedParameters,
  });
  console.log(gasLimit);

  const txObject = {
    nonce: web3.utils.toHex(nonce),
    gasLimit: web3.utils.toHex(gasLimit),
    gasPrice: web3.utils.toHex(gasPrice),
    data: `${bytecodeWithEncodedParameters}`,
    chainId: 2018,
  };

  const signedTx = await web3.eth.accounts.signTransaction(txObject, pk);

  const txReceipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .on('receipt', receipt => {
      console.log(receipt);
    })
    .catch(error => {
      console.log(error);
    });
  console.log('Contract Address:', txReceipt.contractAddress);
  console.log('Transaction Hash:', txReceipt.transactionHash);
  return txReceipt;
};

export {abi, byteCode};

export {
  getDeployedContract,
  deployGreetingSmartContract,
  getGreeting,
  setGreeting,
};