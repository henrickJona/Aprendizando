import React, { Component,useState,useEffect,useRef,useContext,useLayoutEffect } from "react";
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
  Picker,
  TouchableWithoutFeedbackBase,
  ActivityIndicator,
  SafeAreaView,
  TextInput,RefreshControl
} from "react-native";
import { Container, Header, Left, Right, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView,KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
//import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import Loader from "./Loader";
import axios from "axios";
import { GiftedChat } from "react-native-gifted-chat";
import GLOBALS from "../GLOBALS";
import SocketContext from "./Contexts/SocketContext"
const { width, height } = Dimensions.get("window");
const chatAprendiz =({navigation,route})=>{
  const scrollviewRef = useRef()
  const inputRef = useRef()

  const [mensagem,setMensagem] = useState("")
const [listaMensagens, setListaMensagens] = useState([]) 
const [listaMensagensAuxiliar, setListaMensagensAuxiliar] = useState([]) 
const [confirmado,setConfirmado] =useState({})
const [altura,setAltura] = useState(160)
const [usuario,setUsuario] = useState({})
const [regulaAltura,setRegulaALtura] = useState(false)
const [atualizando,setAtualizando] = useState(false)
const [inicializando,setInicializando] = useState(true)
const [page,setPage] = useState(0)
const [loading,setLoading]= useState(false)
const { aprendizNome } = route.params;
  const { aprendizFotoPerfil } = route.params;
  const {idConfirmado} = route.params

  const {socket} = useContext(SocketContext)
useEffect(()=>{
getConfirmado()
fetchMensagens()
getUser()
socket.on("newmsg",data=>{
  fetchMensagens()
})
},[])

async function getUser(){
  const usuario = JSON.parse(
    await AsyncStorage.getItem("@CodeFrila:usuario")
  );
  setUsuario(usuario)

}

async function addRecords (page)  {
  // assuming this.state.dataPosts hold all the records
  //console.log(page,listaMensagens)
  const newRecords = listaMensagensAuxiliar
  for(var i = page * 12, il = i + 12; i < il && i < listaMensagens.length; i++){
    newRecords.push(listaMensagens[i]);
  }

  setListaMensagensAuxiliar(([ ...newRecords]));
}
useLayoutEffect(()=>{
addRecords(page)
},[page])

async function onScrollHandler  () {
  setPage(page+1)
  
}

useLayoutEffect(()=>{
  let lista = listaMensagens
 
  let inverted = lista.reverse()
  console.log("teste")
  setListaMensagens(inverted)
  
},[listaMensagens])

async function  fetchMensagens(){

  try{
    const response = await axios.get(`${GLOBALS.APP_URL}/confirmado/${idConfirmado}/mensagem` )
    setListaMensagens(response.data.mensagems)

    let lista = []
    let j = 0
    lista = response.data.mensagems
    //console.log(lista[0],"antes")

    
    let listaAuxi=[]
    
    if(lista.length > 12){
      
      for (let i = 0; i< 12; i++) {
      listaAuxi[i] = lista[i]
      j++;
    
      }
    
    
      setListaMensagensAuxiliar(listaAuxi)
    
    }else{
      setListaMensagensAuxiliar(lista)
    }
    //console.log(response.data.mensagems,"mensagens",idConfirmado)
        }catch(error){
    console.log(error)
        }
  /* if(recuperando){
   try{
     const response = await axios.get(`${GLOBALS.APP_URL}/confirmado/${idConfirmado}/mensagem` )
     setListaMensagens(response.data.mensagems)
     let lista = []
     let j = 0
     lista = response.data.mensagems
     let listaAuxi=[]
     
     if(lista.length > 11){
       
       for (let i = lista.length-11; i< lista.length; i++) {
       listaAuxi[j] = response.data.mensagems[i]
       j++;
     
       }
     
     
       setListaMensagensAuxiliar(listaAuxi)
     
     }else{
       setListaMensagensAuxiliar(response.data.mensagems)
     }
     //console.log(response.data.mensagems,"mensagens",idConfirmado)
         }catch(error){
     console.log(error)
         }
  }else{
   try{
     const response = await axios.get(`${GLOBALS.APP_URL}/confirmado/${idConfirmado}/mensagem` )
     setListaMensagens(response.data.mensagems)
     let lista = []
     let j = 0
     lista = response.data.mensagems
     let listaAuxi=[]
     console.log()
     
     if(lista.length > 11){
       
       for (let i = lista.length-11; i< lista.length; i++) {
       listaAuxi[j] = response.data.mensagems[i]
       j++;
     
       }
     
     
       setListaMensagensAuxiliar(listaAuxi)
      
     }else{
       setListaMensagensAuxiliar(response.data.mensagems)
     }
    
     //console.log(response.data.mensagems,"mensagens",idConfirmado)
         }catch(error){
     console.log(error)
         }
     
         //scrollviewRef.current.scrollToEnd({animated:false})
  } */
   
 }



async function getConfirmado(){
  
try{
const response = await axios.get(`${GLOBALS.APP_URL}/confirmado/${idConfirmado}` )
setConfirmado(response.data)
//console.log(response.data)
}catch(error){
console.log(error)
}
}


  const [nome,setNome] = useState(aprendizNome)
  const [foto,setFoto] = useState(aprendizFotoPerfil)
  /* state = {
    telefone: "",
    id: "",
    selecionado: "",
    listaInstituicao: [],
    mostrar: false,
    instituicaoNome: "",
    testaScroll: true,
    abrePesquisa: false,
    loading: false,
    cursoNome: "",
    listaCurso: [],
    cursoId: -1,
    cursoFkId: -1,
    autoriza: false,
    aguarda: false,
    altura: 144,
    data: [
      { id: 1, emissor: 2, receptor: 3, texto: "olá, tudo bem?" },
      { id: 1, emissor: 3, receptor: 2, texto: "vi seu anuncio" },
      { id: 1, emissor: 2, receptor: 3, texto: "joanthanan" },
      { id: 1, emissor: 2, receptor: 3, texto: "joanthanan" },
      { id: 1, emissor: 3, receptor: 2, texto: "joanthanan" },
      { id: 1, emissor: 2, receptor: 3, texto: "joanthanan" },
      { id: 1, emissor: 2, receptor: 3, texto: "joanthanan" },
      { id: 1, emissor: 2, receptor: 3, texto: "joanthanan" },
      { id: 1, emissor: 2, receptor: 3, texto: "joanthanan" },
    ],
  }; */
  

 function calculaAltura ()  {
    return height - altura;
  };
 

  
  function isEmpty  (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

 


    

  
   

/*   useEffect (()=>{
    
     console.log(atualizando,"quando mando alterar o tamnaho da lista dentro do effect atualizando")
if(!atualizando && 80*listaMensagensAuxiliar.length>=calculaAltura() &&!inicializando){

    console.log("é aqui",listaMensagensAuxiliar.length,80*listaMensagensAuxiliar.length,calculaAltura())
    scrollviewRef.current.scrollToEnd({animated:false})
    console.log("Yo")
    
}
setAtualizando(false)
   },[listaMensagensAuxiliar]) */

  async function sendMensagem(){
    if(mensagem === ""){

    }else{
      const confirmadoObj = confirmado
      const data = {
        texto:mensagem,
        fk_confirmado_id:confirmadoObj.id,
        fk_emissor_id:confirmadoObj.fk_ministrante_id,
        fk_receptor_id:confirmadoObj.fk_aprendiz_id
      }
      
    
     
     
      try{
        const response = await axios.post(`${GLOBALS.APP_URL}/mensagem`,{
          texto:mensagem,
  fk_confirmado_id:confirmadoObj.id,
  fk_emissor_id:confirmadoObj.fk_ministrante_id,
  fk_receptor_id:confirmadoObj.fk_aprendiz_id
        } )
        setPage(0)
        setMensagem("")
        inputRef.current.clear()
        //console.log(mensagem,"essa é a msg depois")
        //console.log(response.data)
        fetchMensagens()
        setLoading(false)
        socket.emit("msg", data)
       
    }
  catch(error){
    console.log(error)
        }
      }
          
  }
useLayoutEffect(()=>{
if(regulaAltura){
  console.log("tá verdadeiro")
//scrollviewRef.current.scrollToEnd({animated:false})
}
},[regulaAltura])
  function slidesToBottomShow(){
    setRegulaALtura(true)
   
   //scrollviewRef.current.scrollToEnd({animated: false})
  console.log(regulaAltura,"mostrou")
 }

  function slidesToBottomHide(){
    setRegulaALtura(false)
  inputRef.current.blur();
  
    //scrollviewRef.current.scrollToEnd({animated: false})
   console.log(regulaAltura,"escondeu")
 }

useEffect(()=>{
  if(atualizando){
    setInicializando(false)
    console.log("effect atualizando true")
    //console.log(atualizando,"testee")
    let lista = listaMensagens
    let listaAuxi=listaMensagensAuxiliar
   
    let sobra = lista.length -listaAuxi.length
    let j = 0
    if(lista.length >=listaAuxi.length){
      //console.log(lista.length,"teste",listaAuxi.length,sobra)
      if(sobra >=11){

        for (let i = lista.length-listaAuxi.length-11; i< lista.length; i++) {
          listaAuxi[j] = lista[i]
          j++;
        }
        
      
        setListaMensagensAuxiliar(([ ...listaAuxi]));
        //setListaMensagensAuxiliar(listaAuxi)
       
      }else{
       
        setListaMensagensAuxiliar(listaMensagens)
      }

//scrollviewRef.current.scrollToEnd({animated: false})

    //scrollviewRef.current.scrollToIndex({index:0})
  
 }else{
  setListaMensagensAuxiliar(listaMensagens)
 }//console.log(atualizando,"testeeNofinL/////////////////////////////////////////")
 
  }else if(!inicializando){
    scrollviewRef.current.scrollToEnd({animated: false})
  }
},[atualizando])
 async function trataChatList(){
  setAtualizando(true)
  
  /*  if(parametro ===0){
let lista = []
    lista = listaMensagens
    let listaAuxi=[]
    console.log(lista.length,"tamanho",listaMensagens.length)
    if(lista.length > 11){
      console.log("tai")
 for (let i = lista.length-11; i< lista.length; i++) {
   listaAuxi[i] = lista[i]
   
 }
 console.log("entrouuuu")
 setListaMensagensAuxiliar(listaAuxi)
    }else{
      setListaMensagensAuxiliar(listaMensagens)
    }
   }else if(parametro ===1){ */
    
 





  
  /* if(!atualizando && 80*listaMensagensAuxiliar.length>=calculaAltura()){

    console.log("é aqui",listaMensagensAuxiliar.length,80*listaMensagensAuxiliar.length,calculaAltura())
    //scrollviewRef.current.scrollToEnd({animated: false})
    console.log("Yo")
    
} */
}
    return (
      <SafeAreaView style={{ paddingTop: 25, flexDirection:"column",justifyContent:"flex-start",height:"100%" }}>
      



       
      <View style={{flexDirection:"row", alignItems:"center",justifyContent:"center",backgroundColor:"#FFF",elevation:5,height:65}}>
      <View style={{width:"15%",alignItems:"center"}}>
      <TouchableOpacity style={{width:"100%",justifyContent:"center"}} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={25} color="#626A7F" style={{alignSelf:"center"}} />
        </TouchableOpacity>
       </View>
       <View style={{width:"70%",alignItems:"center",paddingTop:5,paddingBottom:5}}>
         <Image style={{width:40,height:40,borderRadius:20}} source={foto?{ uri: foto }:require("../src/default.jpg")}/>
<Text>
 {nome}
</Text>
       </View>
       <View style={{width:"15%",alignItems:"center"}}>
       <TouchableOpacity style={{width:"100%",justifyContent:"center"}}>
        <Icon name="check" size={25} color="#626A7F" style={{alignSelf:"center"}} />
        </TouchableOpacity>
       </View>
      </View>
      <View style={{maxHeight:calculaAltura(),borderWidth:2,borderColor:"red"}}  >
     
   
      <KeyboardAwareFlatList //contentContainerStyle={{paddingBottom:regulaAltura?130:0}}
                    inverted
              
     /* extraHeight={-205} 
     extraScrollHeight={-130}  */

onKeyboardDidHide={()=>slidesToBottomHide()}
                     onKeyboardWillShow={()=> slidesToBottomShow() }
                     getItemLayout={(listaMensagensAuxiliar, index) => (
                      {length: 80, offset: 80 * index, index}
                    )}
                   //initialScrollIndex={80*listaMensagensAuxiliar.length>calculaAltura()?console.log(80*listaMensagensAuxiliar.length,"gatilho esta maior"):console.log(80*listaMensagensAuxiliar.length,"gatilho")}
                   onEndReached={()=>onScrollHandler()}
                   onEndThreshold={()=>0}
                     /* refreshing={false} 
                     onRefresh={()=>trataChatList()} */



                     ref={scrollviewRef}
                     style={{margin:5 }}
                     contentContainerStyle={{paddingTop:regulaAltura?130:0}}
                     data={listaMensagensAuxiliar}

                     //onContentSizeChange={()=>testee()}
                     renderItem={({ item: rowData }) => {
                       return (
                         
                         <View style={{paddingRight:10,paddingBottom:5}}>
                           
                          {rowData.fk_emissor_id === usuario.id ?(
                           <TouchableOpacity
                             onPress={() => console.log(regulaAltura)}
                             style={{
                               height: 70,
                               width: "50%",
                               padding: 10,
                               borderWidth: 1,
                               borderColor: "#E0E0E0",
                               flexDirection: "row",
                               alignSelf:"flex-end",
                               backgroundColor:"#626A7F",
                              borderTopLeftRadius:25,
                              borderTopRightRadius:25,
                              borderBottomLeftRadius:25,
                              
                             }}
                           >
                             <View>
                               <Text style={{ fontSize: 18,color:"white" }}>{rowData.texto}</Text>
                             </View>
                           </TouchableOpacity>
                          ):(<TouchableOpacity
                           //onPress={() => adicionaFavorito(rowData.id)}
                           style={{
                             height: 70,
                             width: "50%",
                             padding: 10,
                             borderWidth: 1,
                             borderColor: "#E0E0E0",
                             flexDirection: "row",
                             borderTopLeftRadius:25,
                             borderTopRightRadius:25,
                             borderBottomRightRadius:25,
                             backgroundColor:"#FFF",
                             alignSelf:"flex-start"
                           }}
                         >
                           <View>
                             <Text style={{ fontSize: 18 }}>{rowData.texto}</Text>
                           </View>
                         </TouchableOpacity>)
   
                          }
                          
                         </View>
                      
                       );
                     }}
                     keyExtractor={(item, index) => index.id}
      
              
              
                        >
     
         
        </KeyboardAwareFlatList >
      </View>

      
      <View style={{flexDirection:"row",alignItems:"center",borderTopWidth:1, borderColor: "#E0E0E0",height:65,position:"absolute",bottom:0}}>
        
        <View style={{width:"85%"}}>
        <TextInput onChangeText={(texto) => setMensagem(texto)} 
        placeholder={"Insira sua Mensagem..."} 
        style={{backgroundColor:"white",height:65,paddingLeft:10}} 
      onFocus={()=>setRegulaALtura(true) }
      //onBlur={()=>slidesToBottomHide()}
      ref={inputRef}
  
       >

</TextInput>
        </View>
        <View style={{width:"15%",alignItems:"center",height:65}}>
        {loading ? (
                <ActivityIndicator
                  style={{  position: "absolute", right: 20,marginTop:20 }}
                  animating={true}
                />
              ) : <TouchableOpacity onPress={()=>sendMensagem()} style={{backgroundColor:"#626A7F",width:"100%",height:"100%",justifyContent:"center"}}>
              <Icon name="send" size={25} color="#FFF" style={{alignSelf:"center"}} />
              </TouchableOpacity>}
        </View>
      </View>

     </SafeAreaView> 
    );
  
}
export default chatAprendiz;
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
    color: "white",
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
    color: "#477fad",

    fontSize: 25,
    paddingBottom: 40,
  },
  botao: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 7,
    width: "40%",
    backgroundColor: "#0072AE",
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
  scroll: {},
});
