// Change this file name to web3.js then uncomment the code below

import Web3 from 'web3';

const rpcUrl = 'http://10.0.2.2:8545';
const rpcRemote =
  'https://ropsten.infura.io/v3/be163254e88346c99818b808fb27deb0';

const pk = 'c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3';
const pk1 = 'dac1a0747d85b78fcd98cf857c79ec62c3d1be2ad1fc9ad816d094395f4d48bb';

const provider = new Web3.providers.HttpProvider(rpcUrl);
const web3 = new Web3(provider);

export {rpcUrl, pk};
export default web3;
