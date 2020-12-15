/*  import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { StyleSheet, Text, View,SafeAreaView,ScrollView,Image,TouchableOpacity, AsyncStorage } from 'react-native';
import { createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import telaInicial from './telaInicial';
import telaCadastro from './telaCadastro';
import telaMapa from './telaMapa';
import Icon from 'react-native-vector-icons/FontAwesome';
import telaEditar from './telaEditar';
import telaHistorico from './telaHistorico';
import {createSwitchNavigator} from 'react-navigation';
import { createAppContainer } from 'react-navigation';
ShowUserInformation = async ()=>{
 
  const token = await AsyncStorage.getItem('@CodeFrila:token')
  const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'))
  const opcao = await AsyncStorage.getItem('@CodeFrila:opcao');
  const nome = usuario[0].nome_contratante
  if(token  && opcao.localeCompare('1')){
    console.log(nome)
    return nome
  }else if(token && usuario && opcao.localeCompare('0')){
    return usuario[0].nome_autonomo
  }

}




 const routes = props => {
   const {
    loading,
    ...attributes
  } = props; 
   state={
    teste:''
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={{height:270, backgroundColor:'#0A2745',alignItems:"center", justifyContent:'center',paddingTop:60}}>
      <Image source={require('./default.jpg')} style={{height:120,width:120,borderRadius:60}} />
      <Text style={{fontSize:20, paddingTop:20, color:'#F6F6F6'}}>
       {()=>shw)}
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
      <TouchableOpacity style={{width:'100%',height:'100%',  alignItems:'center', justifyContent:"center"}}onPress={()=>{props.navigation.navigate('auth');logOut()} }>
        <Icon name='sign-out' style={{fontSize:20, color:'#F6F6F6'}}/>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  )
}

export default routes  */















/* export const LogOut = async()=>{
    await AsyncStorage.removeItem('@CodeFrila:token')
    await AsyncStorage.removeItem('@CodeFrila:usuario')
    this.props.navigation.navigate('SignedOut')
    
  }
export const CustomDrawerComponent = (props)=>(
    <SafeAreaView style={{flex:1}}>
      <View style={{height:270, backgroundColor:'#0A2745',alignItems:"center", justifyContent:'center',paddingTop:60}}>
        <Image source={require('./default.jpg')} style={{height:120,width:120,borderRadius:60}} />
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
        <TouchableOpacity style={{width:'100%',height:'100%',  alignItems:'center', justifyContent:"center"}} onPress={LogOut}>
          <Icon name='sign-out' style={{fontSize:20, color:'#F6F6F6'}}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
export const DrawerNavigator = createDrawerNavigator(
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
export const Logado = createStackNavigator({
    PrimeiraTela: { 
    screen: DrawerNavigator,
    navigationOptions:{
      headerShown:false
    },
    
  },
    
    
  });
 export const NaoLogado = createStackNavigator({
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

   export const  createRootNavigator = (logado = false) => {
    return createAppContainer(createStackNavigator({
        SignedIn: { screen: Logado },
        SignedOut: { screen: NaoLogado }
        
      },
      {
        
        initialRouteName: logado ? "SignedIn" : "SignedOut",
        navigationOptions: {
          gesturesEnabled: false,
          headerShown:false
        }
      }))
  };
   */
 
  /* const MainNavigation = createSwitchNavigator({
    HomeDrawer: this.state.logado ? Logado : NaoLogado,
    
  }) */
   