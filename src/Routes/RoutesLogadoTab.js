import React from "react"


import TelaHome from "../TelaHome";
import telaEditar from "../telaEditar";
import telaHistorico from "../telaHistorico";
import telaSearch from "../telaSearch";
import telaAdicionar from "../telaAdicionar";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/FontAwesome";


const Tab = createBottomTabNavigator();
export default RoutesLogadoTab = ()=>{
  return (
    <Tab.Navigator tabBarOptions={{showLabel:false}}>
      <Tab.Screen options={{ tabBarIcon:({focused, size=32 }) => (
            <Icon
            name="home"
            size={size}
            color={focused?"#A1BAD8":"gray"}
          />
          ), }} name="Inicio" component={TelaHome} />
       <Tab.Screen options={{ tabBarIcon:({focused, size=32 }) => (
            <Icon
            name="search"
            size={size}
            color={focused?"#A1BAD8":"gray"}
          />
          ), }} name="Buscar" component={telaSearch} />
      <Tab.Screen options={{ tabBarIcon:({focused, size=32 }) => (
            <Icon
            name="plus-square"
            size={size}
            color={focused?"#A1BAD8":"gray"}
          />
          ), }} name="Adicionar" component={telaAdicionar} />
      <Tab.Screen options={{ tabBarIcon:({focused, size=32 }) => (
            <Icon
            name="history"
            size={size}
            color={focused?"#A1BAD8":"gray"}
          />
          ), }} name="Histórico" component={telaHistorico} />
      <Tab.Screen options={{ tabBarIcon:({focused, size=32 }) => (
            <Icon
            name="user"
            size={size}
            color={focused?"#A1BAD8":"gray"}
          />
          ), }} name="Perfil" component={telaEditar} />
    </Tab.Navigator>
  );
}

 