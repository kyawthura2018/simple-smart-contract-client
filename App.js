import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  getDeployedContract,
  getGreeting,
  setGreeting,
  deployGreetingSmartContract,
} from './contracts/Greeting';
import {deployUserSmartContract, signDocument, getUser} from './contracts/User';
import web3, {pk} from './web3client';
const getRevertReason = require('eth-revert-reason');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      latestBlock: {},
      greeting: null,
      hello: '',
      greetingAddress: '0x68D02D2d5e05A6E514fd557991fF821d0dC77a2C',
      userAddress: '0x0893C3937aCc139643Fe3641c27A59a312897a04',
    };
  }

  async componentDidMount() {
    await web3.eth.getBlock('latest').then(latestBlock => {
      console.log(latestBlock);
      this.setState({latestBlock});
    });
    const Greeting = getDeployedContract(this.state.greetingAddress);
    const greeting = await Greeting.methods.getGreeting().call();
    console.log(greeting);
    this.setState({greeting: greeting});
  }

  handleGetClick = async () => {
    const greeting = await getGreeting(this.state.greetingAddress);
    this.setState({greeting: greeting});
    alert(greeting);
  };

  handleSetClick = async () => {
    console.log('Set Click');
    const result = await setGreeting(
      this.state.greetingAddress,
      this.state.hello,
      pk,
    );
    if (result && !result.status) {
      console.log(await getRevertReason(result.transactionHash));
    }
    this.setState({hello: ''});
  };

  handleGreetingDeployClick = async () => {
    const result = await deployGreetingSmartContract(pk);
    this.setState({greetingAddress: result.contractAddress});
    alert('Contract Address ' + result.contractAddress);
  };

  handleUserDeployClick = async () => {
    const result = await deployUserSmartContract(pk);
    this.setState({userAddress: result.contractAddress});
    alert('Contract Address ' + result.contractAddress);
  };

  handleSignDocumentClick = async () => {
    console.log('Sign User');
    const result = await signDocument(this.state.userAddress, pk);
    if (result) {
      await getUser(this.state.userAddress);
    }
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
        <Text></Text>
        <Button
          title="Deploy Greeting"
          onPress={this.handleGreetingDeployClick}
        />
        <Text></Text>
        <TextInput
          style={styles.textInput}
          autoFocus
          onChangeText={hello => this.setState({hello})}
          value={this.state.hello}
        />
        <Button title="Set Hi" onPress={this.handleSetClick} />
        <Text></Text>
        <Button title="Say Hi" onPress={this.handleGetClick} />
        <Text></Text>
        <Button title="Deploy User" onPress={this.handleUserDeployClick} />
        <Text></Text>
        <Button title="Sign Doc" onPress={this.handleSignDocumentClick} />
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
  textInput: {
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 30,
    marginBottom: 8,
    paddingStart: 15,
    paddingRight: 15,
    width: 300,
  },
});
