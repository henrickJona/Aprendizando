import React,{useContext, useEffect} from "react"
import RoutesNaoLogado from "./RoutesNaoLogado"
import RoutesLogadoStack from "./RoutesLogadoStack"
import {View,Text} from "react-native"
import AuthContext from "../Contexts/AuthContext"
import {Image} from 'react-native';

const Index = ()=>{
  const {logado}= useContext(AuthContext);
  const {testaLogin}= useContext(AuthContext);
  const {carregando}=useContext(AuthContext)
  useEffect(()=>{
    function teste(){
      console.log(logado)
      
      
    }

    testaLogin()
    teste()
  },[])

  if(carregando){
    console.log("carregando")
    return(<View style={{flex:1,backgroundColor:"#FFF"}}>
<Image
                style={{ width: "100%", height: "100%" }}
                source={require("../../assets/firstScreen.png")}
                resizeMode="contain"
              />
    </View>)
  }

  return logado ? <RoutesLogadoStack/>  : <RoutesNaoLogado/>     
}
export default Index;