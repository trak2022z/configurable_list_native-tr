import * as React from 'react';
import { StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native';
import { onChange } from 'react-native-reanimated';

import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL, getToken} from "../../api/env";
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function LoginScreen({ navigation }: RootTabScreenProps<'TabList'>) {



const [login, setLogin] = useState('');
const [name, setName] = useState('');
const [password, setPassword] = useState('');
const [password_confirmation, setConfirmPassword] = useState('');

const Register = () => {


if(name && login && password && password_confirmation && (password == password_confirmation)) { 
    const response = {
        "name": name,
        "email": login,
        "password": password,
        "password_confirmation":password_confirmation,
        "token":''
    }

    axios.post(API_URL + '/register', response)
    .then(
        async response => {
            await AsyncStorage.setItem("@token", response.data.token)
            .then(
                response => {
                    navigation.navigate('Root');
                }
            );
        },
        err => {
            alert(err.message);
        }



    )


   } else alert('Uzupełnij dane logowania!');
}

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
     <Text style={styles.Listak_header}>Listak</Text>

     <Text >Imię:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Podaj swoje imię"
        onChangeText={name => setName(name)}
        defaultValue={name}       
      />


     <Text  style={{paddingTop: 15}} >E-mail:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Podaj swój e-mail"
        onChangeText={login => setLogin(login)}
        defaultValue={login}       
      />

      <Text style={{paddingTop: 15}} >Hasło:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Podaj swoje hasło"
        onChangeText={password => setPassword(password)}
        defaultValue={password}    
        secureTextEntry
      />
      <Text style={{paddingTop: 15}} >Potwierdź hasło:</Text>
      <TextInput
        style={styles.TextInput}
        placeholder="Potwierdź swoje hasło"
        onChangeText={password_confirmation => setConfirmPassword(password_confirmation)}
        defaultValue={password_confirmation}    
        secureTextEntry
      />


      <TouchableOpacity
      onPress={() => Register()}     
      style={styles.ButtonRegister}


      >
        <Text style={styles.ButtonText}>
            Zarejestruj się
        </Text>

      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  TextInput: {

    backgroundColor: "#f2f2f2",
    width: "90%",
    borderRadius:5,
    borderWidth:1,
    borderColor:"#d9d9d9",
    height:45,
    padding:10

  },

  Listak_header: {

    fontSize: 48,
    paddingBottom: 24,
    fontWeight: 'bold'

  },

  ButtonText: {
      textAlign:"center",
      color:"black",
      paddingTop: 10,
      fontWeight: "bold",
      fontSize:18,
      

  },

  ButtonRegister: {
    marginTop:25,
    backgroundColor: "#adadeb",
    width: "50%",
    height:45,
    borderRadius: 10
  },

});
