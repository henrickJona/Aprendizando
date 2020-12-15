import React, { Component,useContext,useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Alert,
  ImageBackground,
  AsyncStorage,
} from "react-native";
import { Container, Header, Left, Right, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import Loader from "./Loader";
import axios from "axios";
import { round } from "react-native-reanimated";
import GLOBALS from "../GLOBALS";
import AuthContext from "./Contexts/AuthContext"
import SocketContext from "./Contexts/SocketContext"
const telaEditar =()=> {
  const {socket} = useContext(SocketContext)
  const[nome,setNome] = useState("")
  const[sobreNome,setsobreNome] = useState("")
  const[nota,setnota] = useState("")
  const[foto,setfoto] = useState("")
 /*  state = {
    nome: "",
    sobreNome: "",
    nota: "",
    foto:
      "https://lh3.googleusercontent.com/a-/AOh14Gjcn0Z_RYy2VEjVmWEPSRB8B_4dWUN7s438xae9",
  }; */


  useEffect(()=>  {
    async function get(){

        const usuario = JSON.parse(
          await AsyncStorage.getItem("@CodeFrila:usuario")
        );
    setNome(usuario.nome_contratante)
    setsobreNome(usuario.sobre_nome_contratante)
    setfoto(usuario.foto_perfil_contratante)
      };
    get()
  },[])
  /* componentDidMount = async () => {
    
    this.get();
  }; */
  const {sair} = useContext(AuthContext)
 
  async function logOut()  {
    console.log("sair")
    
      sair();
    //await AsyncStorage.removeItem("@CodeFrila:token");
    //await AsyncStorage.removeItem("@CodeFrila:usuario");
    //this.props.navigation.navigate("auth");
  };

 
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#F5F5F5",
          flexDirection: "column",
        }}
        contentContainerStyle={{ justifyContent: "space-between" }}
      >
        <View
          style={{ height: "50%", backgroundColor: "#E2E8F0", elevation: 5 }}
        >
          <ImageBackground
            source={foto?{ uri: foto }:require("./default.jpg")}
          
            style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }}
            blurRadius={25}
            imageStyle={{ opacity: 0.6 }}
          >
            <Image
              source={foto?{ uri: foto }:require("./default.jpg")}
              style={{
                height: 140,
                width: 140,
                borderRadius: 70,
                alignSelf: "center",
                marginTop: 60,
              }}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                paddingTop: 15,
                color: "#626A7F",
              }}
            >
              {nome} {sobreNome}
            </Text>
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                paddingTop: 15,
                color: "#626A7F",
              }}
            >
              5.00
              <Icon name="star" />
            </Text>
          </ImageBackground>
        </View>

        <View style={{ height: "50%", padding: 10 }}>
          <View
            style={{
              paddingLeft: 10,
              borderWidth: 1,
              borderColor: "#F3F1F2",
              backgroundColor: "#FFFFFF",
            }}
          >
            <TouchableOpacity
         
              style={{ backgroundColor: "#FFFFFF", height: 70, paddingTop: 15 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon
                  name="life-saver"
                  size={35}
                  color={"#EBBE8F"}
                  style={{ width: "12%" }}
                ></Icon>
                <Text
                  style={{
                    width: "88%",
                    fontSize: 18,
                    paddingTop: 7,
                    color: "#444444",
                  }}
                >
                  Ajuda
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingLeft: 10,
              borderWidth: 1,
              borderColor: "#F3F1F2",
              backgroundColor: "#FFFFFF",
            }}
          >
            <TouchableOpacity
             
              style={{ backgroundColor: "#FFFFFF", height: 70, paddingTop: 15 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon
                  name="credit-card"
                  size={35}
                  color={"#A09FBD"}
                  style={{ width: "12%" }}
                ></Icon>
                <Text
                  style={{
                    width: "88%",
                    fontSize: 18,
                    paddingTop: 7,
                    color: "#444444",
                  }}
                >
                  Pagamento
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingLeft: 10,
              borderWidth: 1,
              borderColor: "#F3F1F2",
              backgroundColor: "#FFFFFF",
            }}
          >
            <TouchableOpacity
           onPress={()=> socket.emit("gf",1)}
              style={{ backgroundColor: "#FFFFFF", height: 70, paddingTop: 15 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon
                  name="cog"
                  size={35}
                  color={"#93B8C1"}
                  style={{ width: "12%" }}
                ></Icon>
                <Text
                  style={{
                    width: "88%",
                    fontSize: 18,
                    paddingTop: 7,
                    color: "#444444",
                  }}
                >
                  Configurações
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingLeft: 10,
              borderWidth: 1,
              borderColor: "#F3F1F2",
              backgroundColor: "#FFFFFF",
            }}
          >
            <TouchableOpacity
              onPress={logOut}
              style={{ backgroundColor: "#FFFFFF", height: 70, paddingTop: 15 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Icon
                  name="sign-out"
                  size={35}
                  color={"#F592A0"}
                  style={{ width: "12%" }}
                ></Icon>
                <Text
                  style={{
                    width: "88%",
                    fontSize: 18,
                    paddingTop: 7,
                    color: "#444444",
                  }}
                >
                  Sair
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  
}
export default telaEditar;
const estilo = StyleSheet.create({
  principal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 0.1,
    margin: 10,
  },
  Titulo: {
    textAlign: "center",
    fontSize: 50,
    color: "#F6F6F6",
    paddingTop: 160,
  },
  entrada: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "white",
  },
  titulo: {
    color: "#F6F6F6",

    fontSize: 25,
    paddingTop: 40,
    textAlign: "center",
  },
  botao: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 10,
    width: "50%",
    backgroundColor: "#0186AF",
    height: 40,
  },
  botaoTexto: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  esqsenha: {
    paddingTop: 20,
    alignItems: "center",
  },
  scroll: {
    flex: 1,

    backgroundColor: "#F6F6F6",
  },
});
