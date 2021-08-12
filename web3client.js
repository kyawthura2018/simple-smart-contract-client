// Change this file name to web3.js then uncomment the code below

import Web3 from 'web3';

const rpcUrl = 'http://10.0.2.2:8545';
const rpcRemote =
  'https://ropsten.infura.io/v3/be163254e88346c99818b808fb27deb0';

const pk = 'YOUR-PRIVATE-KEY';

const provider = new Web3.providers.HttpProvider(rpcUrl);
const web3 = new Web3(provider);
const nonce = web3.eth.getTransactionCount(account, 'latest'); // nonce starts counting from 0

export {rpcUrl, account, nonce, pk};
export default web3;
