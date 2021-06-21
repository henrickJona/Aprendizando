import React, { Component,useEffect,useState,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
} from "react-native";
import { Container, Header, Left, Right, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import * as Facebook from "expo-facebook";
import { GoogleSignIn } from "expo-google-sign-in";
import axios from "axios";
import api from "../services/api";
import * as Google from "expo-google-app-auth";
import Loader from "./Loader";
import AuthContext from "./Contexts/AuthContext"
import AsyncStorage from '@react-native-community/async-storage';
const telaInicial=({navigation})=> {
  const {testaLogin} = useContext(AuthContext)
  const [loading,setLoading] =useState(false)
  const [id,setId] =useState({})
 useEffect(()=>{
  if(!isEmpty(id)){
    console.log(id)
    navigation.navigate("ScreenTwo", {
      idd: id,
    })
  }
 },[id])

  function isEmpty  (obj)  {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };
  async function teste  (nome, sobrenome, email, foto)  {
    
    
    setLoading(true)
    let objeto = { nome: nome, sobrenome: sobrenome, email: email, foto: foto };
    console.log(email,"awui");
    console.log(process.env.APP_URL,'sdsdsdsd')
    try {
      const resps = await api.get(
        `/contratante/${email}`
      );

      const { contratante, token } = resps.data;
      console.log(resps.data, "r");
      if (isEmpty(resps.data)) {
        console.log("joantahn");
        setId(objeto)
       
        setLoading(false)
        
        
      } else {
        console.log("preencheu")
        await AsyncStorage.multiSet([
          ["@CodeFrila:token", token],
          ["@CodeFrila:usuario", JSON.stringify(contratante)],
        ]);
        testaLogin();
        setLoading(false)
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function logIn()  {
    try {
      await Facebook.initializeAsync("1284563348398995");

      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await axios.get(
          `https://graph.facebook.com/me?access_token=${token}&fields=first_name,last_name,email,picture.type(large)`
        );

        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        //console.log((await response.json()).picture.data.url);
        //console.log( response.data);
        const nome = response.data.first_name;

        let sobrenome = response.data.last_name;
        let email = response.data.email;

        let foto = response.data.picture.data.url;
        teste(nome, sobrenome, email, foto);
      } else {
        type === "cancel";
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };
  async function signInWithGoogleAsync  ()  {
    setLoading(true)
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "229284470930-8di619af432vt8s9aa1a9p332f3k41av.apps.googleusercontent.com",

        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        const nome = result.user.givenName;

        let sobrenome = result.user.familyName;
        let email = result.user.email;

        let foto = result.user.photoUrl;
        teste(nome, sobrenome, email, foto);
      } else {
        setLoading(false)
        return { cancelled: true };
      }
    } catch (e) {
      setLoading(false)
      return { error: true };
    }
  };
 
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FBF9FC",
          flexDirection: "column",
          justifyContent: "space-between",
          borderWidth: 1,
        }}
      >
        <Loader loading={loading} />
        <View style={{ height: "50%" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/firstScreen.png")}
            resizeMode="contain"
          />
        </View>
        <View style={{ height: "20%" }}>
          <Text style={estilo.Titulo}>Aprendizando</Text>
          <Text style={estilo.texto}>
            Selecione uma das opções abaixo e entre com sua conta:
          </Text>
        </View>

        <View style={{ height: "30%", padding: 10 }}>
          <View style={estilo.faceBotao}>
            <TouchableOpacity onPress={()=> logIn()}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon name="facebook" size={40} style={estilo.faceIcone}></Icon>
                <Text style={estilo.faceTexto}>Entrar com o Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={estilo.googleBotao}>
            <TouchableOpacity onPress={()=> signInWithGoogleAsync()}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require("../assets/g.png")}
                />
                <Text style={estilo.googleTexto}>Entrar com o Google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  
}
export default telaInicial;
const estilo = StyleSheet.create({
  Fundo: { flex: 1, backgroundColor: "#F6F6F6" },
  Titulo: {
    textAlign: "center",
    fontSize: 50,
    color: "#626A7F",
  },
  Botao: { textAlign: "center", fontSize: 20, color: "#212731" },
  Icone: { textAlign: "center", color: "#DBE7FB" },
  Moldura: {
    backgroundColor: "#0186AF",
    width: "45%",
    height: 125,
    paddingTop: 25,
    borderRadius: 15,
  },
  faceBotao: {
    width: "100%",
    backgroundColor: "#3b5998",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
  },
  faceTexto: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    width: "85%",
    paddingTop: 5,
  },
  faceIcone: { color: "#ffffff", width: "10%" },
  googleBotao: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#9fa6ad",
    borderRadius: 12,
  },
  googleTexto: {
    color: "#323B4A",
    textAlign: "center",
    fontSize: 20,
    width: "85%",
    paddingTop: 5,
  },
  googleIcone: { color: "#323B4A", width: "10%" },
  scroll: {
    backgroundColor: "#2F2D52",
  },
  texto: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "justify",
    fontSize: 20,
    color: "#5F637F",
  },
});
