import 'react-native-gesture-handler';
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import telaInicial from "./src/telaInicial";
import telaCadastro from "./src/telaCadastro";
import anuncioDetalhes from "./src/AnuncioDetalhes";
import telaHome from "./src/TelaHome";
import Icon from "react-native-vector-icons/FontAwesome";
import telaEditar from "./src/telaEditar";
import telaHistorico from "./src/telaHistorico";
import { createRootNavigator } from "./src/routes";
import splash from "./src/splashScreen";
import routes from "./src/routes";
import Header from "./src/Header";
import telaSearch from "./src/telaSearch";
import telaAdicionar from "./src/telaAdicionar";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AnuncioDetalhes from "./src/AnuncioDetalhes";
import MeusInteresses from "./src/MeusInteresses";
import MeusAnuncios from "./src/MeusAnuncios";
// import ChatComEscolhido from "./src/chatComEscolhido";
import io from "socket.io-client";
import GLOBALS from "./GLOBALS";

import Index from "./src/Routes/Index"
import {AuthProvider} from "./src/Contexts/AuthContext"
import {SocketProvider} from "./src/Contexts/SocketContext"

 function  App () {
 //npx sequelize migration:create --name=create-confirmados
  //expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

 //id,texto,fk_confirmado_id,fk_emissor_id,fk_receptor_id
    return(
    <NavigationContainer>
      <AuthProvider>
        <SocketProvider>
          <Index/>
        </SocketProvider>
        
      </AuthProvider>
    </NavigationContainer>
    
    ) 
  
}
export default App
/* ShowUserInformation = async () => {
  const nome = JSON.parse(await AsyncStorage.getItem("@CodeFrila:usuario"));
  return nome[0].nome_contratante;
};

logOut = async () => {
  await AsyncStorage.removeItem("@CodeFrila:token");
  await AsyncStorage.removeItem("@CodeFrila:usuario");
}; */

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 270,
        backgroundColor: "#0A2745",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
      }}
    >
      <Header />

      <TouchableOpacity>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 10, color: "#F6F6F6" }}>
            Nota do Usuário
          </Text>
          <Icon name="star" color={"#F6F6F6"} />
        </View>
      </TouchableOpacity>
    </View>
    <ScrollView style={{ backgroundColor: "#F6F6F6" }}>
      <DrawerItems {...props} />
    </ScrollView>
    <View
      style={{
        height: 60,
        backgroundColor: "#F76064",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          props.navigation.navigate("auth");
          logOut();
        }}
      >
        <Icon name="sign-out" style={{ fontSize: 20, color: "#F6F6F6" }} />
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
/* const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let colorName;
let iconName;
            if (route.name === 'Inicio') {
              iconName= "home"
             
            } else if (route.name === 'Perfil') {
              iconName="user"
            }
            else if (route.name === 'Buscar') {
              iconName="search"
            }
            else if (route.name === 'Adicionar') {
              iconName="plus-square"
            }else if (route.name === 'Histórico') {
              iconName="history"
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#A1BAD8',
          inactiveTintColor: 'gray',
        }}

      >
        <Tab.Screen name="Inicio" component={telaHome} />
        
        <Tab.Screen name="Buscar" component={telaSearch} />
        <Tab.Screen name="Adicionar" component={telaAdicionar} />
        <Tab.Screen name="Histórico" component={telaHistorico} />
        <Tab.Screen name="Perfil" component={telaEditar} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
      } */

const TabNavigator = createBottomTabNavigator(
  {
    // <<== this is the object routeConfigs
    home: {
      screen: telaHome,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="home" size={25} color={focused ? "white" : "gray"} />
        ),
      },
    },
    search: {
      screen: telaSearch,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="search" size={25} color={focused ? "white" : "gray"} />
        ),
      },
    },

    add: {
      screen: telaAdicionar,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon
            name="plus-square"
            size={25}
            color={focused ? "white" : "gray"}
          />
        ),
      },
    },

    history: {
      screen: telaHistorico,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="history" size={25} color={focused ? "white" : "gray"} />
        ),
      },
    },

    profile: {
      screen: telaEditar,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="user" size={25} color={focused ? "white" : "gray"} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#A1BAD8",
      inactiveBackgroundColor: "#EFEFEF",
      activeTintColor: "#ffffff",
      inactiveTintColor: "red",
      showIcon: true,
      showLabel: false,
    },
  }
);


const Logado = createStackNavigator({
  primeiraTela: {
    screen: TabNavigator,
    navigationOptions: {
      headerShown: false,
    },
  },
  anuncioDetalhes: {
    screen: AnuncioDetalhes,
    navigationOptions: {
      /*   headerShown: false, */
      headerStyle: {
        backgroundColor: "#626A7F",
      },
      headerTintColor: "white",
      title: "Detalhes",
    },
  },
  meusInteresses: {
    screen: MeusInteresses,
    navigationOptions: {
      /*   headerShown: false, */
      headerStyle: {
        backgroundColor: "#626A7F",
      },
      headerTintColor: "white",
      title: "Meus Interesses",
    },
  },
  meusAnuncios: {
    screen: MeusAnuncios,
    navigationOptions: {
      /*   headerShown: false, */
      headerStyle: {
        backgroundColor: "#626A7F",
      },
      headerTintColor: "white",
      title: "Meus Anúncios",
    },
  },
});

const NaoLogado = createStackNavigator({
  Inicio: {
    screen: telaInicial,
    navigationOptions: {
      headerShown: false,
    },
  },
  ScreenTwo: {
    screen: telaCadastro,
    navigationOptions: {
      headerShown: false,
      headerTintColor: "white",
    },
  },
});

//esse era
/* export default createAppContainer(
  createSwitchNavigator(
    {
      authLoading: App,
      app: Logado,
      auth: NaoLogado,
    },
    {
      initialRouteName: "authLoading",
    }
  )
); */


/* const DrawerNavigator = createDrawerNavigator(
  {
    mapa: telaMapa,
    editar: telaEditar,
    historico: telaHistorico
  },
  {
    contentComponent: CustomDrawerComponent,
    hideStatusBar: false,
    drawerBackgroundColor: "rgba(255,255,255,1)",
    overlayColor: "rgba(52, 52, 52, 0.8)",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#4d6273"
    }
  }
); */







































/* componentWillM = async ()=>{
  console.log('APProdou')
  const token = await AsyncStorage.getItem('@CodeFrila:token');
  const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'));
  if(token && usuario)
    this.setState(logado=true);
  
}
const CustomDrawerComponent = (props)=>(
  <SafeAreaView style={{flex:1}}>
    <View style={{height:270, backgroundColor:'#0A2745',alignItems:"center", justifyContent:'center',paddingTop:60}}>
      <Image source={require('./src/default.jpg')} style={{height:120,width:120,borderRadius:60}} />
      <Text style={{fontSize:20, paddingTop:20, color:'#F6F6F6'}}>
        Nome do Usuário
      </Text>
      
      <TouchableOpacity>
        <View style={{alignItems:'center', justifyContent:"center"}}>
        <Text style={{fontSize:10, color:'#F6F6F6'}}>
          Nota do Usuário
        </Text>
        <Icon name='star' color={'#F6F6F6'}/>
        </View>
      </TouchableOpacity>
      
    </View>
    <ScrollView style={{backgroundColor:'#F6F6F6'}}>
      <DrawerItems {...props}
       
        
      />
    </ScrollView>
    <View style={{height:60, backgroundColor:'#F76064',alignItems:"center", justifyContent:'center'}}>
      <TouchableOpacity style={{width:'100%',height:'100%',  alignItems:'center', justifyContent:"center"}}>
        <Icon name='sign-out' style={{fontSize:20, color:'#F6F6F6'}}/>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
)

export default class App extends React.Component {
  state = {
    signed: false,
    signLoaded: false,
  };

  componentDidMount = async ()=>{
    console.log('APProdou')
    const token = await AsyncStorage.getItem('@CodeFrila:token');
    const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'));
    if(token && usuario)
      this.setState({logado:true});
    
  }

  render() {
   
    
    const Layout = createRootNavigator(this.state.logado);
    
    
    return <Layout />;
  }
} */

/*
const DrawerNavigator = createDrawerNavigator(
  {
    mapa: telaMapa,
    editar: telaEditar,
    historico: telaHistorico,

    
  },
  {
    contentComponent: CustomDrawerComponent,
    hideStatusBar: false,
    drawerBackgroundColor: 'rgba(255,255,255,1)',
    overlayColor: 'rgba(52, 52, 52, 0.8)',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#4d6273',
      
    },
    
    
  },
  
);

const Logado = createStackNavigator({
  PrimeiraTela: { 
  screen: DrawerNavigator,
  navigationOptions:{
    headerShown:false
  },
  
},
  
  
});
const NaoLogado = createStackNavigator({
  Inicio: { 
      screen: telaInicial,
      navigationOptions:{
        headerShown: false
      },
      
  },
  ScreenTwo: { 
    screen: telaCadastro,
    navigationOptions:{
      headerTransparent:true,
        headerTintColor:'white'
    },
    
}
  
  
});



const MainNavigation = createSwitchNavigator({
  HomeDrawer: this.state.logado ? Logado : NaoLogado,
  
})
const appConatainer  = createAppContainer(MainNavigation)
export default appConatainer*/
