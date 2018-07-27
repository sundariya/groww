import React, {Component} from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import Home  from './src/home/component/index';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header   
          leftComponent={{ icon: 'home', color: '#fff'}}
          centerComponent={{ text: 'Groww', style: { color: '#fff', fontSize: 20, fontWeight: 'bold', } }}
          // rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <Home />
      </View>
    );
  }
}

