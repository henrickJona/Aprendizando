import React, { Component,useState,useContext,useEffect } from "react";
import {
  Picker,
  Alert,
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
  Modal,
  AsyncStorage,
  SafeAreaView,
  ListItem,
  ActivityIndicator,
} from "react-native";
import { Container, Header, Left, Right, Radio, CardItem } from "native-base";
import MapView, {
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
  Marker,
  Polyline,
} from "react-native-maps";
import { ClusterMap } from "react-native-cluster-map";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import { TextInput, ThemeProvider } from "react-native-paper";
import api from "../services/api";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Card } from "react-native-elements";
import { round } from "react-native-reanimated";
import TimeAgo from "react-native-timeago";
import Loader from "./Loader";
import PickerCategorias from "./PickerCategorias";
import io from "socket.io-client";
import GLOBALS from "../GLOBALS";
import socket from "../teste"
import SocketContext from "./Contexts/SocketContext"
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = -0.0063376;
const LONGITUDE = -51.0848025;
let LATITUDE_DELTA = 0.018;
let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let vetorAuxiliar = [];
let todosAnuncios = [];
let indexAtual = -1;
let instituicaoAtualId = -1;
const moment = require("moment");
require("moment/locale/pt-br");
moment.locale("pt-br");


/* const socket = io(`${GLOBALS.APP_URL}`, { forceNode: true })  */
const TelaHome = ({ navigation })=> {
  const [titulo,setTitulo] = useState("");
  const [descricao,setDescricao] = useState("");
  const [valor,setValor] = useState("");
  const [anexo,setAnexo] = useState("");
  const [data,setData] = useState([]);
  const [aguarda,setAguarda] = useState(false);
  const [loading,setLoading] = useState(false);
  const [firstLoading,setFirstLoading] = useState(true)
  //const [anuncios,setAnuncios] = useState([]);
  const [categoriaDeCada,setCategoriaDeCada] = useState("");
  const [nome,setNome] = useState("");
  const [listaAnuncios,setListaAnuncios] = useState([]);
  const [listaCurso,setListaCurso] = useState([]);
  const [quantidade,setQuantidade] = useState(0);
  const [modalVisible,setmodalVisible] = useState(false);
  const [listaFavoritos,setListaFavoritos] = useState([]);
  const [InstituicaoNome,setInstituicaoNome] = useState("");
  const [InputInstituicaoNome,setInputInstituicaoNome] = useState("");
  const [abrePesquisa,setAbrePesquisa] = useState(false);
  const [listaInstituicao,setListaInstituicao] = useState([]);
  const [quantidadeFavoritos,setQuantidadeFavoritos] = useState(0);
  const [removerDisponivel,setRemoverDisponivel] = useState(false);
  const [menu,setMenu] = useState(false);
  const [altura,setAltura] = useState(255);
  const [autoriza,setAutoriza] = useState(false);
const[mostrar,setMostrar] =useState(false)
const {socket} = useContext(SocketContext)
//const {emit,} = useContext(SocketContext)
 useEffect(()=>{
  socket.open();
 socket.emit("teste","teste")

 //socket.socket.connect()
   //console.log(socket.socket.connected,"jonatannn")
  console.log("eiiiiiiii")
  socket.once("t",(data)=>{
    console.log("enciouuuuuuuu")
  alert(data)
  })
socket.once("resposta",(data)=>{
  console.log("enciouuuuuuuu")
alert(data)
})

  inicializa()
  getInteresses()
  getAnuncios()
  
inicializaFavorito()
 },[])
  
  //componentDidMount = async () => {
    
   /* const socket = useSocket();
   socket.on("instituicao/1", (data) => {
    console.log(data);
    alert(data);
  }); */
  /* 
  this.context.on("instituicao/1", (data) => {
      console.log(data);
      alert(data);
    }); */
   // console.log("passou aqui");
    //this.getInteresses();
    //this.getAnuncios();
   // const usuario = JSON.parse(
   //   await AsyncStorage.getItem("@CodeFrila:usuario")
    //);
    //this.inicializaFavorito();
   // this.setState({ nome: usuario.nome_contratante });
    /* this.getAnuncio(usuario.fk_instituicao_id); */
    /* console.log(height, "altura"); */
  //};
  async function inicializa(){
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario"))
      setNome(usuario.nome_contratante)
  }

 async function getAnuncios() {
    setAguarda(true)
    try {
      const usuario = JSON.parse(
        await AsyncStorage.getItem("@CodeFrila:usuario")
      );
      const response = await axios.get(
        `${GLOBALS.APP_URL}/contratante/${usuario.id}/anuncio`
      );
      console.log(response.data.anuncios.length, "tamanho dos anncios");
      if (isEmpty(response.data.anuncios)) {
        console.log("vazio");
        socket.emit("room","Default")
        socket.emit("room", "Default");
        console.log("vazio");
      } else if (response.data.anuncios.length === 1) {
        console.log(
          "apenas um",
          `dono/${usuario.email_contratante}/anuncio/${response.data.anuncios[0].id}`
        );

        socket.emit(
          "room",
          `dono/${usuario.email_contratante}/anuncio/${response.data.anuncios[0].id}`
        );
      } else {
        for (let i = 0; i < response.data.anuncios.length; i++) {
          socket.emit(
            "room",
            `dono/${usuario.email_contratante}/anuncio/${response.data.anuncios[i].id}`
          );
          console.log(
            "vários",
            `dono/${usuario.email_contratante}/anuncio/${response.data.anuncios[i].id}`
          );
        }
      }
      setAguarda(false)
      
    } catch (error) {
      console.log(error);
      setAguarda(false)
    }
  };

  async function getInteresses() {
    setAguarda(true)
    try {
      const usuario = JSON.parse(
        await AsyncStorage.getItem("@CodeFrila:usuario")
      );
      const response = await axios.get(
        `${GLOBALS.APP_URL}/contratante/${usuario.id}/interessado`
      );

      if (isEmpty(response.data.interesses)) {
        console.log("vazio");

        socket.emit("room", "Default");
      }
      else  if (response.data.interesses.length === 1) {
        console.log(
          "apenas um",
          `interessado/${usuario.email_contratante}/anuncio/${response.data.interesses[0].fk_anuncio_id}`
        );

        socket.emit(
          "room",
          `interessado/${usuario.email_contratante}/anuncio/${response.data.interesses[0].fk_anuncio_id}`
        );
      } else {
        console.log("vários", response.data.interesses[i].fk_anuncio_id);
        for (let i = 0; i < response.data.interesses.length; i++) {
         socket.emit("room", response.data.interesses[i].fk_anuncio_id);
          log("vários", response.data.interesses[i].fk_anuncio_id);
        }
      }
      setAguarda(false)
    } catch (error) {
      console.log(error);
      setAguarda(false)
    }
  };

  function stri  (string)  {
    let resto = string.slice(1);
    let minuscula = resto.toLowerCase();
    /*  console.log(string.charAt(0) + minuscula); */
    return string.charAt(0) + minuscula;
  };

  function calculaAltura () {
    return height - altura;
  };

  async function inicializaFavorito () {
    todosAnuncios = [];
    vetorAuxiliar = [];
    indexAtual = 0;
    console.log(GLOBALS.APP_URL);
    console.log("enterei iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    instituicaoAtualId = usuario.fk_instituicao_id;
    try {
      const response = await axios.get(
        `${GLOBALS.APP_URL}/contratante/${usuario.id}/favorito`
      );
      if (response.data.favoritos.length === 1) {
        console.log(
          "apenas um",
          `instituicao/${response.data.favoritos[0].fk_instituicao_id}`
        );

        socket.emit(
          "room",
          `instituicao/${response.data.favoritos[0].fk_instituicao_id}`
        );
      } else {
        for (let i = 0; i < response.data.favoritos.length; i++) {
          socket.emit(
            "room",
            `instituicao/${response.data.favoritos[i].fk_instituicao_id}`
          );
          console.log(
            "vários",
            `instituicao/${response.data.favoritos[i].fk_instituicao_id}`
          );
        }
      }
    
      let vetor = [response.data.favoritos.length];
      /* console.log(
        response.data.favoritos.length,
        "tamanhaoooooooooooo",
        response.data
      ); */
      for (let i = 0; i < response.data.favoritos.length; i++) {
        vetor[i] = await getAnuncio(
          response.data.favoritos[i].fk_instituicao_id,
          i,
          response.data.favoritos[i].id
        );
      }
      /*  for (let i = 0; i < response.data.favoritos.length; i++) {
        console.log(vetor[i], "jonatahnnnn");
      } */
      setListaAnuncios(todosAnuncios[0])
      console.log("borannnnnnn",vetorAuxiliar[0])
      console.log(vetorAuxiliar[0].nome,"boraver")
      setInstituicaoNome(vetorAuxiliar[0].nome)
      setQuantidadeFavoritos(todosAnuncios.length)
      setFirstLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  function armazenaFavoritos (i, id, nome, quantidade, idFavorito)  {
    let aux = {};
    Object.assign(aux, {
      id: id,
      nome: nome,
      quantidade: quantidade,
      idFavorito: idFavorito,
    });
    vetorAuxiliar[i] = aux;

    return vetorAuxiliar;
  };

  async function getAnuncio  (id, i, idFavorito) {

    try {
      const response = await axios.get(
        `${GLOBALS.APP_URL}/instituicao/${id}/anuncio`
      );
      let aux = response.data.nome.split("-")[0];
      let tamanho = response.data.anuncios;
      tamanho = tamanho.reverse();
      let nome = stri(aux);
      todosAnuncios[i] = response.data.anuncios;
      console.log(todosAnuncios[i], "jonatan", i);
      setInstituicaoNome(nome)
      setQuantidade(tamanho.length)
      setListaFavoritos(armazenaFavoritos(
        i,
        id,
        nome,
        tamanho.length,
        idFavorito
      ))
      
      /* console.log(
        this.state.listaFavoritos,
        "joanthannnnnnnnnnnnnnnnnnnnnnnnnn"
      ); */
      return tamanho;
      /* console.log(response.data); */
    } catch (error) {
      console.log(error);
    }
  };

  function trataModal  ()  {
    if (modalVisible) {
      setmodalVisible(false)
     
    } else {
      setmodalVisible(true)

    }
  };

  function trataFavoritos  (id, nome, instituicaoId)  {
    console.log(instituicaoId, "o que foi mandado");
    indexAtual = id;
    instituicaoAtualId = instituicaoId;
    console.log(id, nome, listaAnuncios, todosAnuncios[id]);
    setListaAnuncios(todosAnuncios[id])
    //setAnuncios(todosAnuncios[id])
    setInstituicaoNome(nome)
    
  };

  async function atualizaListaEspecifica () {
    console.log(instituicaoAtualId, "instituicao atuallllllllllllll");
    try {
      const response = await axios.get(
        `${GLOBALS.APP_URL}/instituicao/${instituicaoAtualId}/anuncio`
      );
      let aux = response.data.nome.split("-")[0];
      let tamanho = response.data.anuncios;
      let tamanhoVerdade = response.data.anuncios.length;
      tamanho = tamanho.reverse();
      let nome = stri(aux);
      todosAnuncios[indexAtual] = response.data.anuncios;
      //console.log(todosAnuncios[indexAtual]);

      vetorAuxiliar[indexAtual].quantidade = tamanhoVerdade;
      setListaAnuncios(todosAnuncios[indexAtual])
      setQuantidade(tamanho.length)
      setListaFavoritos(vetorAuxiliar)
   
      /* console.log(
        this.state.listaFavoritos,
        "joanthannnnnnnnnnnnnnnnnnnnnnnnnn"
      ); */

      /* console.log(response.data); */
    } catch (error) {
      console.log(error);
    }
  };

  async function  adicionaFavorito  (id)  {
if(id === -3){

}else{
  setAguarda(true)
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    try {
      const resposta = await axios.post(
        `${GLOBALS.APP_URL}/instituicao/${id}/contratante/${usuario.id}/favorito`,
        {}
      );
      //console.log(resposta.data[1], "createdddddddddddddddddddddddd");
      console.log("entrou");

      if (!resposta.data[1]) {
        setAguarda(false)
        setMostrar(false)
        setAbrePesquisa(false)
        setInputInstituicaoNome("")
        alert("Este item já se encontra na sua lista de favoritos!!");
      } else {
       inicializaFavorito();
       setAguarda(false)
        setMostrar(false)
        setAbrePesquisa(false)
        setInputInstituicaoNome("")
        alert("Adicionado");
      }
    } catch (error) {
      console.log(error);
    }
}
    
  };
  function isEmpty  (obj)  {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  async function removerFavorito  (id)  {
   
setAguarda(true)
    try {
      const resposta = await axios.delete(
        `${GLOBALS.APP_URL}/favorito/${id}`,
        {}
      );
      /* console.log(resposta, "resposta delete"); */
      console.log("entrou");
    inicializaFavorito();
      setAguarda(false)
      setRemoverDisponivel(false)
      alert("Removido")
      
    } catch (error) {
      console.log(error);
    }
  };
  async function AvisoRemocao  (id)  {
    Alert.alert(
      "Aviso",
      "Tem Certeza?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            setRemoverDisponivel(false)
     
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            removerFavorito(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  async function mostraInstituicao (pesquisa)  {
    setInstituicaoNome(pesquisa)
    setListaCurso([])
    setAutoriza(false)
    
    let objeto = [{ id: 1, nome: "Sem conexão no momento" }];
    /*  console.log(pesquisa) */
    if (pesquisa === "") {
      setMostrar(false)
      setLoading(false)
      setAutoriza(false)
      setListaInstituicao(null)

    } else {
      setMostrar(true)
      setLoading(true)
      

      try {
        const response = await axios.get(
          `${GLOBALS.APP_URL}/instituicao/${pesquisa}`
        );
setListaInstituicao(response.data)
setLoading(false)
setAutoriza(false)
       
        /*  console.log(this.state.listaInstituicao,"jonathan") */
      } catch (error) {
        setListaInstituicao(objeto)
        setLoading(false)
      

        console.log(error);
      }
    }
  };

 function abreMenu  () {
    if (menu) {
      setMenu(false)
      setAltura(255)

    } else {
      setMenu(true)
      setAltura(320)
  
    }
  };
  function clicaAdicionar(){
    setAbrePesquisa(true)
    setmodalVisible(false)
  }
  function clicaRemover(){
    setRemoverDisponivel(true)
    setmodalVisible(false)
  }

  function renderEmptyContainer(){
    return(
      <View style={{alignSelf:"center"}}>
        <Text style={{fontSize:25,color:"#767c8c",textAlign:"center"}}>
          Nada Encontrado
        </Text>
<Image source={require("./NadaEncontrado.png")} />
      </View>
      
    )
  }



    return (
      /* tela Autonomo */
      <SafeAreaView style={{ marginTop: 25 }}>
        <Loader loading={aguarda} />
        {removerDisponivel ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "15%" }}>
              <Icon
                onPress={() => setRemoverDisponivel( )}
                name={"arrow-left"}
                size={35}
                style={{ marginTop: 15, paddingLeft: 10, color: "#A5B2ED" }}
              />
            </View>
            <View style={{ width: "85%" }}>
              <Text
                style={{ textAlign: "center", fontSize: 30, marginTop: 15 }}
              >
                Favoritos
              </Text>
              

              <FlatList
                style={{ maxHeight: 450, marginTop: 30 }}
                data={listaFavoritos}
                renderItem={({ item: rowData, index }) => {
                  return (
                    <View style={{}}>
                      {index > 0 ? (
                        <TouchableOpacity
                          onPress={() => AvisoRemocao(rowData.idFavorito)}
                          style={{
                            height: 70,
                            width: "100%",
                            padding: 10,
                            borderWidth: 1,
                            borderColor: "#E0E0E0",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View style={{ width: "80%" }}>
                            <Text style={{ fontSize: 18 }}>{rowData.nome}</Text>
                          </View>
                          <View style={{ width: "20%" }}>
                            <Icon
                              name="trash-o"
                              size={35}
                              color={"red"}
                              style={{
                                alignSelf: "flex-end",
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  );
                }}
                keyExtractor={(item, index) => item.nome}
              />
            </View>
          </View>
        ) : null}
        {abrePesquisa ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "15%" }}>
              <Icon
                onPress={() => setAbrePesquisa(false )}
                name={"arrow-left"}
                size={35}
                style={{ marginTop: 15, paddingLeft: 10, color: "#A5B2ED" }}
              />
            </View>
            <View style={{ width: "85%" }}>
              <TextInput
                autoFocus={true}
                placeholder={"Instituição"}
                style={{
                  backgroundColor: "#FFFFF",
                  marginTop: 30,
                  width: "100%",
                  marginTop: 15,
                }}
                value={InputInstituicaoNome}
                onChangeText={(text) => (setInputInstituicaoNome(text), mostraInstituicao(text))}
              ></TextInput>
              {loading ? (
                <ActivityIndicator
                  style={{ marginTop: 50, position: "absolute", right: 20 }}
                  animating={true}
                />
              ) : null}
              {mostrar ? (
                <FlatList
                  style={{ maxHeight: 450 }}
                  data={listaInstituicao}
                 
                  renderItem={({ item: rowData }) => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() => adicionaFavorito(rowData.id)}
                          style={{
                            height: 70,
                            width: "100%",
                            padding: 10,
                            borderWidth: 1,
                            borderColor: "#E0E0E0",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor:"#FFF"
                          }}
                        >
                          <View>
                            <Text style={{ fontSize: 18 }}>{rowData.nome}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => item.nome}
                />
              ) : null}
            </View>
          </View>
        ) : null}
        {!abrePesquisa && !removerDisponivel ? (
          <View style={{ flexDirection: "column" }}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View
                onTouchEnd={() => trataModal()}
                style={{
                  backgroundColor: "rgba(0,0,0,0.4)",
                  flex: 1,
                  justifyContent: "flex-end",
                }}
              ></View>

              <View
                style={{
                  backgroundColor: "white",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  padding: 10,
                  alignItems: "center",
                  width: "100%",
                  elevation: 5,
                }}
              >
                <Text style={{ fontSize: 19, color: "#717682" }}>Editar</Text>

                <View style={{ width: "100%", padding: 5 }}>
                  <TouchableHighlight
                    style={{
                      width: "100%",
                      backgroundColor: "#93B8C1",
                      height: 40,
                      paddingBottom: 10,
                      borderRadius: 10,
                    }}
                    onPress={() =>
                      clicaAdicionar()
                    }
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        paddingTop: 5,
                        fontSize: 18,
                      }}
                    >
                      Adicionar
                    </Text>
                  </TouchableHighlight>
                </View>
                {quantidadeFavoritos > 1 ? (
                  <View style={{ width: "100%", padding: 5 }}>
                    <TouchableHighlight
                      style={{
                        width: "100%",
                        backgroundColor: "#F592A0",
                        height: 40,
                        borderRadius: 10,
                      }}
                      onPress={() =>
                        clicaRemover()
                      }
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          paddingTop: 5,
                          fontSize: 18,
                        }}
                      >
                        Remover
                      </Text>
                    </TouchableHighlight>
                  </View>
                ) : null}
              </View>
            </Modal>
            <View
              style={{
                flexDirection: "column",
                minHeight: 55,
                maxHeight: 120,
                justifyContent: "space-around",
                width: "100%",
                backgroundColor: "#626A7F",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#626A7F",
                  height: 55,
                  elevation: 8,

                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ width: "70%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      paddingTop: 5,
                      paddingLeft: 10,
                      color: "white",
                    }}
                  >
                    Olá, {nome}
                  </Text>
                </View>
                <View
                  style={{
                    width: "15%",
                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity>
                    <Icon name="bell" color="white" size={35} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "15%",
                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >{/* 
                  <Text
                    style={{
                      color: "red",
                      fontSize: 55,
                      position: "absolute",
                      zIndex: 1,
                      alignSelf: "center",
                    }}
                  > 
                    .
                  </Text> */}
                  <TouchableOpacity  onPress={() => abreMenu()} >
                    <Icon name="navicon" color="white" size={35} />
                  </TouchableOpacity>
                </View>
              </View>
              {menu ? (
                <Animatable.View
                  animation="fadeInDown"
                  style={{
                    height: 65,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    /* backgroundColor: "green", */
                    /*  marginTop: 20, */
                    position: "relative",
                  }}
                >
                  <View
                    style={{
                      width: "40%",
                      alignItems: "center",

                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "column",

                        alignItems: "center",
                      }}
                      onPress={() =>
                        navigation.navigate("meusInteresses")
                      }
                    >
                      <View style={{ height: "50%", paddingTop: 5 }}>
                        <Icon name="bookmark" color="white" size={30} />
                      </View>

                      <View style={{ height: "50%", paddingTop: 5 }}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 15,
                            color: "white",
                          }}
                        >
                          Meus Interesses
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "40%",
                      alignItems: "center",

                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "column",

                        alignItems: "center",
                      }}
                      onPress={() =>
                      navigation.navigate("meusAnuncios")
                      }
                    >
                      <View style={{ height: "50%", paddingTop: 5 }}>
                        <Icon name="flag" color="white" size={30} />
                      </View>

                      <View style={{ height: "50%", paddingTop: 5 }}>
                        <Text
                          style={{
                            textAlign: "center",
                            fontSize: 15,
                            color: "white",
                          }}
                        >
                          Meus Anúncios
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Animatable.View>
              ) : null}
            </View>

            <View
              style={{
                height: 180,
                justifyContent: "space-around",

                paddingRight: 5,
                paddingLeft: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  borderRadius: 20,
                  borderColor: "#E5E5E5",
                  backgroundColor: "white",
                  height: 150,

                  Width: "100%",
                  borderWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "95%" }}>
                    <Text
                      style={{
                        fontSize: 25,
                        paddingLeft: 10,
                        color: "#626A7F",
                      }}
                    >
                      Favoritos
                    </Text>
                  </View>
                  <View style={{ width: "5%", justifyContent: "flex-end" }}>
                    <TouchableOpacity
                      style={{ width: "100%" }}
                      onPress={() => trataModal()}
                    >
                      <Icon
                        name="ellipsis-v"
                        size={25}
                        color="#626A7F"
                        style={{ paddingTop: 8 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <FlatList
                  horizontal
                  style={{
                    marginLeft: 10,
                    paddingTop: 20,
                    marginRight: 10,
                  }}
                  showsHorizontalScrollIndicator={false}
                  data={listaFavoritos}
                  refreshing={false}
                  renderItem={({ item: rowData, index }) => {
                    return (
                      <View style={{ paddingRight: 10 }}>
                        <TouchableOpacity
                          onPress={() =>
                            trataFavoritos(index, rowData.nome, rowData.id)
                          }
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 9,
                            borderWidth: 1,

                            borderColor: "#E0E0E0",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            backgroundColor: "#A1BAD8",
                          }}
                        >
                          <View style={{ width: "100%" }}>
                            <Text
                              style={{
                                fontSize: 19,
                                color: "white",
                                paddingLeft: 5,
                                paddingTop: 5,
                                textAlign: "center",
                              }}
                            >
                              {rowData.quantidade}
                            </Text>

                            <Text
                              style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                textAlign: "center",
                                color: "white",
                                lineHeight: 20,
                                paddingTop: 5,
                              }}
                              numberOfLines={2}
                            >
                              {rowData.nome}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => item.nome}
                />
                {/* <ScrollView
                orientation={"horizontal"}
                style={{ flexDirection: "row", paddingTop: 20 }}
              >
                <View style={{}}>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 9,
                      marginLeft: 10,
                      backgroundColor: "#A1BAD8",
                      elevation: 5,
                    }}
                    onPress={() => this.getAnuncio(1)}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        paddingTop: 10,
                        color: "white",
                      }}
                    >
                      {this.state.quantidade}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "center",
                        paddingTop: 10,
                        color: "white",
                      }}
                    >
                      {this.state.instituicaoNome}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView> */}
              </View>
            </View>
            <View style={{ height: 20 }}>
              <Text style={{ marginLeft: 5, color: "#626A7F" }}>
                Resultados Encontrados em {InstituicaoNome}
              </Text>
            </View>
            <View
              style={{
                height: calculaAltura(),
                justifyContent: "space-around",
                paddingRight: 5,
                paddingLeft: 5,
                paddingBottom: 80,
              }}
            >
              <FlatList
                style={{ marginTop: 5 }}
                data={listaAnuncios}
                refreshing={false}
                ListEmptyComponent={!firstLoading?renderEmptyContainer():null}
                onRefresh={() => atualizaListaEspecifica()}
                renderItem={({ item: rowData }) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("anuncioDetalhes", {
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
                keyExtractor={(item, index) => String(item.id)}
              />
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    );
  
}


export default TelaHome

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  entrada: {
    height: 50,

    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "#E2E2E2",
  },
  estiloPressionado: {},
  estiloNaoPressionado: {},
});
