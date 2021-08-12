import React from 'react';
import {StyleSheet, Text, View, Button, Alert} from 'react-native';

import {TextInput} from 'react-native-paper';

import Greeting, {abi, byteCode} from './Greeting';
import User, {userABI, userByteCode} from './User';
import web3, {account, nonce, pk} from './web3client';
const Tx = require('ethereumjs-tx').Transaction;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      latestBlock: {},
      greeting: null,
    };
  }

  async componentWillMount() {
    await web3.eth.getBlock('latest').then(latestBlock => {
      console.log(latestBlock);
      this.setState({latestBlock});
    });
    const greeting = await Greeting.methods.getGreeting().call();
    console.log(greeting);
    this.setState({greeting: greeting});
  }

  sendSignedTransaction = async (address, data, private_key) => {
    const {address: from} = web3.eth.accounts.privateKeyToAccount(pk);
    const transaction = {
      to: address,
      from,
      gas: 80000,
      nonce: await web3.eth.getTransactionCount(from, 'latest'),
      data: data,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      transaction,
      private_key,
    );
    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
        if (!error) {
          console.log(
            '🎉 The hash of your transaction is: ',
            hash,
            '\n Check to view the status of your transaction!',
          );
        } else {
          console.log(
            '❗Something went wrong while submitting your transaction:',
            error,
          );
        }
      })
      .catch(error => {
        console.log(' ' + error);
      });
  };

  handleGetClick = async () => {
    const greeting = await Greeting.methods.getGreeting().call();
    alert(greeting);
  };

  handleSetClick = async () => {
    const {address: from} = web3.eth.accounts.privateKeyToAccount(pk);
    let bytecodeWithEncodedParameters = await Greeting.methods
      .setGreeting('မင်္ဂလာပါ')
      .encodeABI();
    const nonce = await web3.eth.getTransactionCount(from);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await web3.eth.estimateGas({
      data: bytecodeWithEncodedParameters,
    });
    console.log(gasLimit);

    const txObject = {
      to: Greeting._address,
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
  };

  handleDeployClick = async () => {
    const {address: from} = web3.eth.accounts.privateKeyToAccount(pk);
    const account = '0xAB330c8C4C40E07C2C8Af12490bb09D2d669e90b';
    let contract = new web3.eth.Contract(abi);
    // deploy contract with constructor value
    console.log('here');
    const bytecodeWithEncodedParameters = contract
      .deploy({
        data: byteCode,
        arguments: ['Hello'],
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

    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    console.log('Contract Address:', txReceipt.contractAddress);
    console.log('Transaction Hash:', txReceipt.transactionHash);
  };

  handleUserDeployClick = async () => {
    const {address: from} = web3.eth.accounts.privateKeyToAccount(pk);
    const account = '0xAB330c8C4C40E07C2C8Af12490bb09D2d669e90b';
    let contract = new web3.eth.Contract(userABI);
    // deploy contract with constructor value
    console.log('here');
    const bytecodeWithEncodedParameters = contract
      .deploy({
        data: userByteCode,
        arguments: ['Kyaw', 'Kyaw', 'KK', 'signature'],
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

    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );
    console.log('Contract Address:', txReceipt.contractAddress);
    console.log('Transaction Hash:', txReceipt.transactionHash);
  };

  render() {
    const latestBlockNumber = this.state.latestBlock.number;
    const {greeting} = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text>{greeting}</Text>
          <Text>Latest ethereum block is: {latestBlockNumber}</Text>
          <Text>Check your console!</Text>
          <Text>You should find extra info on the latest ethereum block.</Text>
        </View>
        <View>
          <Button title="Deploy User" onPress={this.handleUserDeployClick} />
          <Text></Text>
          <Button title="Deploy Greeting" onPress={this.handleDeployClick} />
          <Text></Text>
          <Button title="Say Hi" onPress={this.handleSetClick} />
          <Text></Text>
          <Button title="Hi" onPress={this.handleGetClick} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});
