import React,{useContext, useEffect} from "react"
import RoutesNaoLogado from "./RoutesNaoLogado"
import RoutesLogadoStack from "./RoutesLogadoStack"
import {View,Text} from "react-native"
import AuthContext from "../Contexts/AuthContext"

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
    return(<View style={{flex:1,backgroundColor:"red"}}>
<Text>
  Jonsah
</Text>
    </View>)
  }

  return logado ? <RoutesLogadoStack/>  : <RoutesNaoLogado/>     
}
export default Index;