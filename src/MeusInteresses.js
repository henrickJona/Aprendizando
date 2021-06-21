import React, { Component,useState,useEffect } from "react";
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
import TimeAgo from "react-native-timeago";
import AsyncStorage from '@react-native-community/async-storage';
const moment = require("moment");
require("moment/locale/pt-br");
moment.locale("pt-br");
const { width, height } = Dimensions.get("window");

const MeusInteresses = ({navigation})=> {
const[firstLoading,setFirstLoading] = useState(true)
const [menu1,setMenu1] = useState(true) 
const [menu2,setMenu2] = useState(false) 
const [titulo,setTitulo] = useState("") 
const [descricao,setDescricao] = useState("") 
const [valor,setValor] = useState("") 
const [anexo,setAnexo] = useState("") 
const [listaInteresses,setListaInteresses] = useState([])
const [altura,setAltura] = useState(160)
const [aguarda,setAguarda] = useState(false) 
const [anuncioConfirmadoLista,setAnuncioConfirmadoLista] = useState([])
useEffect(()=>{
  getInteresses()
  getInteressesConfirmados()
},[])
function botaoInteressados  (){
  if (!menu1) {
    setMenu1(true)
    setMenu2(false)

  }
};
function botaoEditar()  {
  if (!menu2) {
    setMenu1(false)
    setMenu2(true)

  }
};
 async function getInteresses  ()  {
    let anuncios = [];
    let dataMesclada ={}
    let interesses = []
    setAguarda(true)
    try {
      const usuario = JSON.parse(
        await AsyncStorage.getItem("@CodeFrila:usuario")
      );
      const response = await axios.get(
        `${process.env.APP_URL}/contratante/${usuario.id}/interessado`
      );
      for (let i = 0; i < response.data.interesses.length; i++) {
interesses[i] = response.data.interesses[i]
        const resp = await axios.get(
          `${process.env.APP_URL}/anuncio/${response.data.interesses[i].fk_anuncio_id}`
        );
      
        
        dataMesclada={titulo:resp.data.titulo,
        descricao:resp.data.descricao,
        createdAt:interesses[i].createdAt
        }
        anuncios[i] =dataMesclada
      }
   
     
      for (let i = 0; i < response.data.interesses.length; i++) {
        console.log(anuncios[i], "hjyfj");
      }
      console.log(response.data);
      setListaInteresses(anuncios)
      setAguarda(false)
      setFirstLoading(false)
    } catch (error) {
      console.log(error);
      setAguarda(false)
      

    }
  };
  function calculaAltura  () {
    return height - altura;
  };
  async function getInteressesConfirmados   ()  {
    let aprendiz = [];
   let anuncio =[]
   let dataMesclada ={}
   let ministrante = []
   let nomeCompleto = ""
    setAguarda(true)
    try {
      const usuario = JSON.parse(
        await AsyncStorage.getItem("@CodeFrila:usuario")
      );
      const response = await axios.get(
        `${process.env.APP_URL}/ministrante/${usuario.id}`
      );

      for (let i = 0; i < response.data.ministrante.length; i++) {
        ministrante[i] = response.data.ministrante[i];
      }
      console.log(ministrante[0].id, "joanta");
      for (let i = 0; i < response.data.ministrante.length; i++) {
        const resp = await axios.get(
          `${process.env.APP_URL}/aprendiz/${ministrante[i].fk_aprendiz_id}`
        );

        aprendiz[i] = resp.data;
      }
      for (let i = 0; i < response.data.ministrante.length; i++) {
        const resp = await axios.get(
          `${process.env.APP_URL}/anuncio/${ministrante[i].fk_anuncio_id}`
        );
        nomeCompleto = aprendiz[i].nome_contratante+" "+aprendiz[i].sobre_nome_contratante
dataMesclada={
  
  id:response.data.ministrante[i].id,
  titulo:resp.data.titulo,
  aprendiz:nomeCompleto,
  aprendizFoto:aprendiz[i].foto_perfil_contratante,
  createdAt:ministrante[i].createdAt

}
        anuncio[i] = dataMesclada;
      }

      /* for (let i = 0; i < anuncios.length; i++) {
        console.log(numeroInteressado[i], "hjyfj");
      } */

      /*  console.log(response.data); */
     
      setAnuncioConfirmadoLista(anuncio)
      setAguarda(false)
    
    } catch (error) {
      console.log(error);
      setAguarda(false)
    }
  };


  function renderEmptyContainer(){
    return(
      <View style={{alignSelf:"center"}}>
        <Text style={{fontSize:25,color:"#767c8c",textAlign:"center"}}>
          Nada Encontrado
        </Text>
<Image source={require("../assets/NadaEncontrado.png")} />
      </View>
      
    )
  }
    return (
      <View style={estilo.scroll}>
        <Loader loading={aguarda} />
        <View
          style={{
            borderWidth: 1,
            backgroundColor: "#F6F6F6",
            width: "100%",
            height: 80,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            borderColor: "#C9D0DB",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() =>botaoInteressados()}
            style={{
              borderRadius: 15,
              backgroundColor: "#F6F6F6",
              height: 70,
              marginTop: 2,
              width: "40%",
              alignSelf: "center",
            }}
          >
            {menu2 ? (
              <Icon
                name="bookmark"
                size={40}
                color="#8d9ba6"
                style={{ alignSelf: "center", marginTop: 5 }}
              />
            ) : null}
            {menu2 ? (
              <Text
                style={{
                  color: "#aab6bf",
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: 1,
                }}
              >
                Meus Interesses
              </Text>
            ) : null}
            {!menu2 ? (
              <Icon
                name="bookmark"
                size={40}
                color="#4d6273"
                style={{ alignSelf: "center", marginTop: 5 }}
              />
            ) : null}
            {!menu2 ? (
              <Text
                style={{
                  color: "#727272",
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: 1,
                }}
              >
                Meus Interesses
              </Text>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>botaoEditar()}
            style={{
              borderRadius: 15,
              backgroundColor: "#F6F6F6",
              height: 70,
              marginTop: 2,
              width: "40%",
              alignSelf: "center",
            }}
          >
            {menu1 ? (
              <Icon
                name="thumbs-o-up"
                size={40}
                color="#8d9ba6"
                style={{ alignSelf: "center", marginTop: 5 }}
              />
            ) : null}
            {menu1 ? (
              <Text
                style={{
                  color: "#aab6bf",
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: 1,
                }}
              >
                Confirmados
              </Text>
            ) : null}
            {!menu1 ? (
              <Icon
                name="thumbs-o-up"
                size={40}
                color="#4d6273"
                style={{ alignSelf: "center", marginTop: 5 }}
              />
            ) : null}
            {!menu1 ? (
              <Text
                style={{
                  color: "#727272",
                  textAlign: "center",
                  fontSize: 15,
                  marginTop: 1,
                }}
              >
                Confirmados
              </Text>
            ) : null}
          </TouchableOpacity>
        </View>
        <View>
          {menu2 ? (
            <View
            style={{
              paddingRight: 5,
              paddingLeft: 5,
              height: calculaAltura(),
            }}
          >
            <FlatList
              style={{ marginTop: 2 }}
              data={anuncioConfirmadoLista}
              ListEmptyComponent={!firstLoading?renderEmptyContainer():null}
              refreshing={false}
              onRefresh={() => getInteressesConfirmados()}
              renderItem={({ item: rowData, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("chatAprendiz",{
idConfirmado:rowData.id,
aprendizNome:rowData.aprendiz,
aprendizFotoPerfil:rowData.aprendizFoto
                    })}
                    style={{
                      minHeight: 70,
                      maxHeight: 150,
                      width: "100%",

                      borderWidth: 1,
                      borderColor: "#F3F1F2",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "white",
                    }}
                  >
                    <View style={{ width: "100%" }}>
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#626A7F",
                          paddingLeft: 5,
                          paddingTop: 10,
                        }}
                      >
                        {rowData.titulo}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: 10,
                          paddingRight: 10,
                          textAlign: "justify",
                          color: "#717682",
                          lineHeight: 20,
                          paddingTop: 5,
                        }}
                        numberOfLines={2}
                      >
                        Aprendiz: {rowData.aprendiz}
                      </Text>
                      <View >
                        
                        <View >
                          <TimeAgo
                          
                            time={rowData.createdAt}
                            style={{
                              marginLeft: "auto",
                              paddingRight: 5,
                              paddingTop: 5,
                              color: "#9a9ca1",
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => item.titulo}
            />
          </View>
          ) : null}
          {menu1 ? (
            <View
              style={{
                paddingRight: 5,
                paddingLeft: 5,
                height: calculaAltura(),
              }}
            >
              <FlatList
                style={{ marginTop: 2 }}
                data={listaInteresses}
                refreshing={false}
                ListEmptyComponent={!firstLoading?renderEmptyContainer():null}
                onRefresh={() => getInteresses()}
                renderItem={({ item: rowData }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("anuncioDetalhes", {
                        anuncio: rowData,
                      })
                        
                      }
                      style={{
                        minHeight: 70,
                        maxHeight: 150,
                        width: "100%",

                        borderWidth: 1,
                        borderColor: "#F3F1F2",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                      }}
                    >
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            fontSize: 19,
                            color: "#626A7F",
                            paddingLeft: 5,
                            paddingTop: 10,
                          }}
                        >
                          {rowData.titulo}
                        </Text>
                        <Text
                          style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            textAlign: "justify",
                            color: "#717682",
                            lineHeight: 20,
                            paddingTop: 5,
                          }}
                          numberOfLines={2}
                        >
                          {rowData.descricao}
                        </Text>
                        <TimeAgo
                          time={rowData.createdAt}
                          style={{
                            marginLeft: "auto",
                            paddingRight: 5,
                            paddingTop: 5,
                            color: "#9a9ca1",
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => item.titulo}
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  
}
export default MeusInteresses;
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
