// Change this file name to web3.js then uncomment the code below

import Web3 from 'web3';

const rpcUrl = 'http://10.0.2.2:8545';
const rpcRemote =
  'https://ropsten.infura.io/v3/be163254e88346c99818b808fb27deb0';

const pk = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
// const pk = 'faba0c52d697e7f5b85633e2da3aa578b8dfcd51030834dea9672f8fdc375903';

const account = '0xAB330c8C4C40E07C2C8Af12490bb09D2d669e90b';

const provider = new Web3.providers.HttpProvider(rpcUrl);
const web3 = new Web3(provider);
const nonce = web3.eth.getTransactionCount(account, 'latest'); // nonce starts counting from 0

export {rpcUrl, account, nonce, pk};
export default web3;
