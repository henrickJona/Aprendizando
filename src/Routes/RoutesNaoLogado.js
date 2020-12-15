import React from "react"
import telaInicial from "../telaInicial";
import telaCadastro from "../telaCadastro";
import { createStackNavigator } from '@react-navigation/stack';
const NaoLogado = createStackNavigator();

export default  RoutesNaoLogado = () => {
    return (
        <NaoLogado.Navigator screenOptions={{
          headerShown: false
        }}>
            <NaoLogado.Screen name="Inicio" component={telaInicial}/>
            <NaoLogado.Screen name="ScreenTwo" component={telaCadastro}/>
        </NaoLogado.Navigator>
      )
    }
