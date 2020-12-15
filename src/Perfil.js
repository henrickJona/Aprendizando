import React, { Component, useState, useEffect } from "react";
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
  AsyncStorage,
  ImageBackground
} from "react-native";
import { Container, Header, Left, Right, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import Loader from "./Loader";
import axios from "axios";
import { round } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import Moment from "moment";
import GLOBALS from "../GLOBALS";

const Perfil = ({  }) => {
  /*
  static navigationOpotions = {
    headerStyle: {
      backgroundColor: "#626A7F",
    },

    title: "Detalhes",
    headerTintColor: "#fff",
  };*/
  //const { anuncio } = route.params;
  const [menu1, setMenu1] = useState(true);
  const [menu2, setMenu2] = useState(false);


  const [valor, setValor] = useState("");
  const [anexo, setAnexo] = useState("");
  const [aguarda, setAguarda] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  const [data, setData] = useState("");
  //const [nota,setNota] = useState("")
  //const {titulo}=  route.params
  useEffect(() => {
 

    getUser();
   
  }, []);
  /*componentDidMount = async () => {
    console.log("fdfdfd")
    console.log(routes.params.anuncio,"id do anuncio")
    console.log(this.props.navigation.state.params.anuncio);
    this.setState({
      titulo: this.props.navigation.state.params.anuncio.titulo,
      descricao: this.props.navigation.state.params.anuncio.descricao,
      investimento: this.props.navigation.state.params.anuncio.investimento,
      data: Moment(this.props.navigation.state.params.anuncio.createdAt).format(
        "DD/MM/YYYY"
      ),
    });
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    this.getUser();
    this.ehInteressado();
  };*/

  async function getUser() {
  
   
   
  }
 

  

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: "column",
      }}
      style={{
        backgroundColor: "#F2F2F7",
      }}
      enableOnAndroid={true}
      extraHeight={130}
      extraScrollHeight={130}
    >
      <Loader loading={aguarda} />

      <View
        style={{
          flexDirection: "column",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          backgroundColor: "#FFF",
          borderWidth: 1,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderColor: "#F2F2F7",

          justifyContent: "space-between",
          minHeight: 120,
          borderRadius:12,
          elevation:5
        }}
      >
        <View style={{ height: "35%", backgroundColor:"#F2F2F7" , borderRadius:12}}>
            <ImageBackground 
            source={foto?{ uri: foto }:require("./default.jpg")}
          
            style={{ flex: 1, resizeMode: "cover", justifyContent: "center",height:"100%",borderRadius:12 }}
            blurRadius={28}
            imageStyle={{ opacity: 0.8 ,borderRadius:12}}
            >
<Image
             source={foto?{ uri: foto }:require("./default.jpg")}
            style={{
              height: 150,
              width: 150,
              borderRadius: 80,
              alignSelf: "center",
            }}
          />
            </ImageBackground>
          
        </View>
        <View style={{ height: "10%", borderTopRightRadius:15,borderTopLeftRadius:15 }}>
          <Text style={{ fontSize: 23, color: "#626A7F",alignSelf:"center" }}>
            jonathan henrick
          </Text>
        
        </View>
        <View style={{ height: "35%",flexDirection:"row", justifyContent:"center",backgroundColor:"#fcfcff",borderTopColor:"#E7E8EC", borderTopWidth:1, borderRadius:12}}>
<View style={{width:"35%",alignItems:"center"}}>
<TouchableOpacity>
<Icon name="smile-o" size={40} color={"#9BBCC5"}/>
<Text style={{ fontSize: 18, color: "#626A7F",alignSelf:"center" }}>
    0
</Text>
</TouchableOpacity>
</View>
<View style={{width:"35%",alignItems:"center"}}>
<TouchableOpacity>
<Icon name="frown-o" size={40} color={"#B8434F"}/>
<Text style={{ fontSize: 18, color: "#626A7F",alignSelf:"center" }}>0</Text>
</TouchableOpacity>
</View>
        </View>
      
      </View>
     

     
     
    </KeyboardAwareScrollView>
  );
};
export default Perfil;
const estilo = StyleSheet.create({
  principal: {
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
    height: 50,

    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "#E2E2E2",
  },
  s: {
    height: 95,

    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "#E2E2E2",
  },
  titulo: {
    color: "#F6F6F6",
    width: "80%",
    fontSize: 25,
    paddingTop: 35,
    textAlign: "center",
    paddingLeft: "15%",
  },
  botao: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 5,
    width: "50%",
    backgroundColor: "#466494",
    height: 40,
    alignSelf: "center",
  },
  botaoVeremlho: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 5,
    width: "50%",
    backgroundColor: "red",
    height: 40,
    alignSelf: "center",
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
