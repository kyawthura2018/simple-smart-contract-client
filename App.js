import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';

import {
  getDeployedContract,
  getGreeting,
  setGreeting,
  deployGreetingSmartContract,
} from './Greeting';
import {deployUserSmartContract, signDocument, getUser} from './User';
import web3, {pk} from './web3client';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      latestBlock: {},
      greeting: null,
      hello: '',
      greetingAddress: '0x074bF216979389dE24F0684feC80790a8c2D2508',
      userAddress: '0x0893C3937aCc139643Fe3641c27A59a312897a04',
    };
  }

  async componentWillMount() {
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
    await setGreeting(this.state.greetingAddress, this.state.hello, pk);
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
    await signDocument(this.state.userAddress, pk);
    await getUser(this.state.userAddress);
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
          <Button
            title="Deploy Greeting"
            onPress={this.handleGreetingDeployClick}
          />
          <Text></Text>
          <TextInput
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
