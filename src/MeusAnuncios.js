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
import * as Animatable from "react-native-animatable";
import TimeAgo from "react-native-timeago";
import GLOBALS from "../GLOBALS"

const { width, height } = Dimensions.get("window");
const MeusAnuncios =({navigation})=> {
 const [firstLoading,setFirstLoading] = useState(true)
  const [menu1,setMenu1] = useState(true) 
  const [menu2,setMenu2] = useState(false) 
  const [titulo,setTitulo] = useState("") 
  const [descricao,setDescricao] = useState("") 
  const [valor,setValor] = useState("") 
  const [anexo,setAnexo] = useState("") 
  const [listaAnuncios,setListaAnuncios] = useState([])
  const [listaInteressados,setListaInteressados] = useState([])
  const [numeroInteressados,setNumeroInteressados] = useState([])
  const [altura,setAltura] = useState(160)
  const [aguarda,setAguarda] = useState(false) 
  const [abreInteressados,setAbreInteressados] = useState(false) 
  const  [anuncioId,setAnuncioId] = useState("")
  //const [confirmadoLista,setConfirmadoLista] = useState([])
  const [anuncioConfirmadoLista,setAnuncioConfirmadoLista] = useState([])
useEffect(()=>{
  
  getAnuncios()
  

  
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
 async function getAnuncios   ()  {
    let anuncios = [];
    let numeroInteressado = [];
    setAguarda(true)
    try {
      const usuario = JSON.parse(
        await AsyncStorage.getItem("@CodeFrila:usuario")
      );
      const response = await axios.get(
        `${GLOBALS.APP_URL}/contratante/${usuario.id}/anuncio`
      );

      for (let i = 0; i < response.data.anuncios.length; i++) {
        anuncios[i] = response.data.anuncios[i];
      }
      console.log(anuncios[0].id, "joanta");
      for (let i = 0; i < response.data.anuncios.length; i++) {
        const resp = await axios.get(
          `${GLOBALS.APP_URL}/anuncio/${anuncios[i].id}/interessado`
        );

        numeroInteressado[i] = resp.data.interessados.length;
      }

      /* for (let i = 0; i < anuncios.length; i++) {
        console.log(numeroInteressado[i], "hjyfj");
      } */

      /*  console.log(response.data); */
      setNumeroInteressados(numeroInteressado)
        setListaAnuncios(response.data.anuncios)
      setAguarda(false)
      getAnunciosConfirmados()
      setFirstLoading(false)
    } catch (error) {
      console.log(error);
      setAguarda(false)
    }
  };

  async function getAnunciosConfirmados   ()  {
    let aprendiz = [];
   let anuncio =[]
   let dataMesclada ={}
   let ministrante = []
    setAguarda(true)
    try {
      const usuario = JSON.parse(
        await AsyncStorage.getItem("@CodeFrila:usuario")
      );
      const response = await axios.get(
        `${GLOBALS.APP_URL}/aprendiz/${usuario.id}`
      );

      for (let i = 0; i < response.data.aprendiz.length; i++) {
        aprendiz[i] = response.data.aprendiz[i];
      }
      console.log(aprendiz[0].id, "joanta");
      for (let i = 0; i < response.data.aprendiz.length; i++) {
        const resp = await axios.get(
          `${GLOBALS.APP_URL}/ministrante/${aprendiz[i].fk_ministrante_id}`
        );

        ministrante[i] = resp.data;
      }
      for (let i = 0; i < response.data.aprendiz.length; i++) {
        const resp = await axios.get(
          `${GLOBALS.APP_URL}/anuncio/${aprendiz[i].fk_anuncio_id}`
        );
dataMesclada={
  id:response.data.aprendiz[i].id,
  titulo:resp.data.titulo,
  ministrante:ministrante[i].nome_contratante+" "+ministrante[i].sobre_nome_contratante,
  ministranteFoto:ministrante[i].foto_perfil_contratante,
  createdAt:aprendiz[i].createdAt

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


  function calculaAltura  ()  {
    return height - altura;
  };

  async function abreInteressadosFunction (id)  {
    setAnuncioId(id)
    let interessados = [];
    setAguarda(true)
    setAbreInteressados(true)
    setAltura(310)
    
    try {
      const response = await axios.get(
        `${GLOBALS.APP_URL}/anuncio/${id}/interessado`
      );
      for (let i = 0; i < response.data.interessados.length; i++) {
        const resp = await axios.get(
          `${GLOBALS.APP_URL}/contratante/${response.data.interessados[i].fk_contratante_id}`
        );
        interessados[i] = resp.data;
      }
      /* for (let i = 0; i < response.data.interessados.length; i++) {
        console.log(interessados[i], "hjyfj");
      } */
setListaInteressados(interessados)
setAguarda(false)
   
    } catch (error) {
      console.log(error);
      setAguarda(false)
    }

    /* setState({ aguarda: true, abreInteressados: true });
    try {
      const response = await axios.get(
        `http://192.168.1.102:3333/anuncio/${id}/interessado`
      );

      console.log(response.data, "jona");
      setState(
        { listaInteressados: response.data.interessados, aguarda: false },
        () => {
          console.log(listaInteressados);
        }
      );
    } catch (error) {
      console.log(error);
      setState({ aguarda: false });
    } */
  };
  async function adicionaConfirmado(id){
    try{
      const usuario = JSON.parse(
        await AsyncStorage.getItem("@CodeFrila:usuario")
      );
const response = await axios.post(`${GLOBALS.APP_URL}/anuncio/${anuncioId}/ministrante/${id}/aprendiz/${usuario.id}/confirmado`)
const respon = await axios.put(`${GLOBALS.APP_URL}/anuncio/${anuncioId}`)
//aqui notificar quem foi escolhido e quem não foi
deletaTodosInteressadosNoAnuncioInativo()
console.log(response)
console.log(respon)
getAnunciosConfirmados()
getAnuncios()
setMenu1(false)
setAbreInteressados(false)
setMenu2(true)
    }catch(error){
console.log(error)
    }
  }

  /* async function getConfirmadorAprendiz(){
    try{
    
        const usuario = JSON.parse(
          await AsyncStorage.getItem("@CodeFrila:usuario")
        );
const response = await axios.get(`${GLOBALS.APP_URL}/aprendiz/${usuario.id}`)
setConfirmadoLista(response.data.aprendiz)
//console.log(response)

    }catch(error){
console.log(error)
    }
  } */
  async function deletaTodosInteressadosNoAnuncioInativo(){
    try{
    
      
const response = await axios.delete(`${GLOBALS.APP_URL}/anuncio/${anuncioId}/interessado`)
console.log(response)

    }catch(error){
console.log(error)
    }
  }

  async function AvisoEscolha  (id)  {
    Alert.alert(
      "Aviso",
      "Escolha com atenção, vc só poderá escolher um interessado, ao confirmar seu anúncio se tornará inativo, confirmar?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            
     
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            adicionaConfirmado(id)
          },
        },
      ],
      { cancelable: false }
    );
  };

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
      <View style={estilo.scroll}>
        <Loader loading={aguarda} />
        {abreInteressados ? (
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                flexDirection: "row",
              justifyContent:"center",
                height: 70,
              }}
            >
              
              <View style={{ width: "80%" }}>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 30,
                      marginTop: 13,
                      color: "#626A7F",
                    }}
                  >
                    Detalhes
                  </Text>
                </View>
              </View>
              <View style={{ width: "20%",justifyContent:"center"}}>
                <TouchableOpacity onPress={() =>{setAbreInteressados(false),setAltura(160)}
                    //setState({ abreInteressados: false, altura: 160 })
                  }
                  style={{}}
                  >
              
               <Icon
                  
                  name={"close"}
                  size={35}
                  style={{
               
              

                    color: "#A5B2ED",
                   alignSelf:"center"
                  }}
                />
        
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: 160,
                padding: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 12,
                  borderWidth: 1,
                  height: "100%",
                  borderColor: "#E0E0E0",
                }}
              >
                <Text style={{ fontSize: 22, color: "#626A7F", padding: 5 }}>
                  Opções
                </Text>
                <TouchableOpacity style={{ padding: 10, width: 80 }}>
                  <Icon
                    name="trash-o"
                    size={35}
                    color={"red"}
                    style={{ alignSelf: "center" }}
                  />

                  <Text style={{ fontSize: 14, color: "#626A7F" }}>
                    Remover Anúncio
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                height: calculaAltura(),
                padding: 10,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFF",
                  borderRadius: 12,
                  borderWidth: 1,
                  height: "100%",
                  borderColor: "#E0E0E0",
                }}
              >
                <Text style={{ fontSize: 22, color: "#626A7F", padding: 5 }}>
                  Interessados
                </Text>
                <FlatList
                ListEmptyComponent={!aguarda?renderEmptyContainer():null}
                  style={{ padding: 10, height: "100%" }}
                  data={listaInteressados}
                  renderItem={({ item: rowData }) => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                            onPress={() => AvisoEscolha(rowData.id)} 
                          style={{
                            height: 90,
                            width: "100%",

                            borderWidth: 1,
                            borderColor: "#E0E0E0",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",

                              backgroundColor: "#FFF",
                              borderWidth: 1,

                              borderColor: "#E5E5E5",
                              paddingTop: 15,
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{ width: "20%" }}>
                              <Image
                                source={{
                                  uri: rowData.foto_perfil_contratante,
                                }}
                                style={{
                                  height: 60,
                                  width: 60,
                                  borderRadius: 70,
                                  alignSelf: "center",
                                }}
                              />
                            </View>
                            <View style={{ width: "60%" }}>
                              <Text style={{ fontSize: 19, color: "#626A7F" }}>
                                {rowData.nome_contratante}{" "}
                                {rowData.sobre_nome_contratante}
                              </Text>
                              <Text style={{ fontSize: 19, color: "#626A7F" }}>
                                {rowData.avaliacao_contratante}
                                <Icon name="star" />
                              </Text>
                            </View>
                            <View style={{ width: "20%" }}>
                              <Icon
                                name="thumbs-o-up"
                                size={25}
                                color="#626A7F"
                                style={{ alignSelf: "center" }}
                              />
                              <Text style={{ fontSize: 15, color: "#626A7F" }}>
                                Escolher
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => item.nome_contratante}
                />
              </View>
            </View>
          </View>
        ) : null}
        {!abreInteressados ? (
          <View>
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
                onPress={botaoInteressados}
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
                    name="flag"
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
                    Meus Anúncios
                  </Text>
                ) : null}
                {!menu2 ? (
                  <Icon
                    name="flag"
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
                    Meus Anúncios
                  </Text>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={botaoEditar}
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
                 refreshing={false}
                 ListEmptyComponent={!firstLoading?renderEmptyContainer():null}
                 onRefresh={() => getAnuncios()}
                 renderItem={({ item: rowData, index }) => {
                   return (
                     <TouchableOpacity
                       onPress={() => navigation.navigate("chatMinistrante",{
                        ministranteNome: rowData.ministrante,
                        ministranteFotoPerfil: rowData.ministranteFoto,
                        idConfirmado:rowData.id
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
                           Escolhido: {rowData.ministrante}
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
                 keyExtractor={(item, index) => String(item.id)}
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
                    data={listaAnuncios}
                    refreshing={false}
                    onRefresh={() => getAnuncios()}
                    renderItem={({ item: rowData, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => abreInteressadosFunction(rowData.id)}
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
                            <View style={{ flexDirection: "row" }}>
                              <View style={{ width: "50%" }}>
                                <Text
                                  style={{
                                    paddingLeft: 5,
                                    paddingTop: 5,
                                    color: "#9a9ca1",
                                  }}
                                >
                                  N° de Interessados:<Text> </Text>
                                  {numeroInteressados[index]}
                                </Text>
                              </View>
                              <View style={{ width: "50%" }}>
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
                    keyExtractor={(item, index) => String(item.id)}
                  />
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  
}
export default MeusAnuncios;
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
