import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Linking } from 'react-native';

export default class Example extends Component {
  const Signup = ()  => {
    return (
      <View>
          <TextInput />
      </View>
    );
  }

  const Auth = () => {
    return(
      <View style = {styles.authwrap}>
        <TextInput style = {styles.texts} type="text" placeholder='Email Address'/>
        <TextInput style = {styles.texts} type="password" placeholder="Password" secureTextEntry = {true}/>
        <Text style = {styles.signup}>New With Us? <Text onclick={this.signup}>Join Us</Text></Text>
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <Auth />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  authwrap: {
    height: 700,
    width: 350,
    borderRadius:20,
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(255,62,55)'
  },
  texts: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 15,
    height: 50,
    paddingLeft: 20,
    marginTop: 20,
  },
  signup :{
    marginTop: 40,
  }
});
