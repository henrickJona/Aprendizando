import React from "react"
import AnuncioDetalhes from "../AnuncioDetalhes";
import MeusInteresses from "../MeusInteresses";
import MeusAnuncios from "../MeusAnuncios";
import chatMinistrante from "../chatMinistrante"
import chatAprendiz from "../chatAprendiz"
import RoutesLogadoTab from "./RoutesLogadoTab"
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from "../Perfil"

const Stack = createStackNavigator();

export default RoutesLogadoStack = ()=> {
    return (
   
        <Stack.Navigator >
           
            <Stack.Screen options={{headerShown: false}} name="RoutesLogadoTab" component={RoutesLogadoTab}/>
            <Stack.Screen options={{title:"Detalhes"}} name="anuncioDetalhes" component={AnuncioDetalhes}/>
            <Stack.Screen options={{title:"Meus Interesses"}} name="meusInteresses" component={MeusInteresses}/>
            <Stack.Screen options={{title:"Meus Anuncios"}} name="meusAnuncios" component={MeusAnuncios}/>
            <Stack.Screen options={{headerShown:false}} name="chatMinistrante" component={chatMinistrante}/>
            <Stack.Screen options={{headerShown:false}} name="chatAprendiz" component={chatAprendiz}/>
            <Stack.Screen name="Perfil" component={Perfil}/>
        </Stack.Navigator>

      )
    }

     