
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View,SafeAreaView,ScrollView,Image,TouchableOpacity, AsyncStorage, Modal,
  ActivityIndicator } from 'react-native';
// Child component
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      nome:'',
      nota:''
    }
  }
  componentDidMount = async()=>{
    const usuario = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'))
    const opcao = await AsyncStorage.getItem('@CodeFrila:opcao')
    console.log('Header',usuario)
    
    console.log('oopcao',opcao)
    if(opcao === '0'){

      if(Array.isArray(usuario)){
        console.log('é array')
        const nome = usuario[0].nome_contratante
        this.setState({nome:nome})
        if(usuario[0].avaliacao_contratante == 1 ){
          this.setState({nota:'Não possui nota ainda!'})
        }else{
          const nota = usuario[0].avaliacao_contratante
          this.setState({nota:nota})
        }
      }else{
        console.log('não é array')
        const nome = usuario.nome_contratante
        this.setState({nome:nome})
        if(usuario.avaliacao_contratante == 1 ){
          this.setState({nota:'Não possui nota ainda!'})
        }else{
          const nota = usuario.avaliacao_contratante
          this.setState({nota:nota})
        }
      }
      
      
    } else if(opcao === '1'){
      if(Array.isArray(usuario)){
        const nome = usuario[0].nome_autonomo
        this.setState({nome:nome})
        if(usuario[0].avaliacao_autonomo == 1 ){
          this.setState({nota:'Não possui nota ainda!'})
        }else{
          const nota = usuario[0].avaliacao_autonomo
          this.setState({nota:nota})
        }
      }else{
        const nome = usuario.nome_autonomo
        this.setState({nome:nome})
        if(usuario.avaliacao_autonomo == 1 ){
          this.setState({nota:'Não possui nota ainda!'})
        }else{
          const nota = usuario.avaliacao_autonomo
          this.setState({nota:nota})
        }
      }
      
      
    }
    
  }
  render () {
    return (
      <View style={{height:270, backgroundColor:'#0A2745',alignItems:"center", justifyContent:'center',paddingTop:20}}>
                <Image source={require('../assets/default.jpg')} style={{height:120,width:120,borderRadius:60}} />
                <Text style={{fontSize:20, paddingTop:20, color:'#F6F6F6'}}>
                {this.state.nome}
                </Text>
                
                <TouchableOpacity>
                    <View style={{alignItems:'center', justifyContent:"center"}}>
                    <Text style={{fontSize:10, color:'#F6F6F6'}}>
                    {this.state.nota}
                    </Text>
                    <Icon name='star' color={'#F6F6F6'}/>
                    </View>
                </TouchableOpacity>
            
            </View>
    )
  }
}


/* 

import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View,SafeAreaView,ScrollView,Image,TouchableOpacity, AsyncStorage, Modal,
  ActivityIndicator } from 'react-native';
  
const Header  =  props => {

  ShowUserInformation= async()=>{
    const nome = JSON.parse(await AsyncStorage.getItem('@CodeFrila:usuario'))
    console.log(nome[0].nome_contratante)
    return nome[0].nome_contratante
    }
  const {
    Nome,
    ...attributes
  } = props;
  
  return (
    <View style={{height:270, backgroundColor:'#0A2745',alignItems:"center", justifyContent:'center',paddingTop:60}}>
                <Image source={require('./default.jpg')} style={{height:120,width:120,borderRadius:60}} />
                <Text style={{fontSize:20, paddingTop:20, color:'#F6F6F6'}}>
                { console.log(this.ShowUserInformation())}
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
  )
}



export default Header; */