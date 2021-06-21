import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ScrollView, TouchableOpacity, Dimensions, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Image, Alert } from 'react-native';
import {Container,Header,Left,Right,Radio } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {TextInput} from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import Loader from './Loader'
import axios from 'axios';
import { round } from 'react-native-reanimated';
class telaHistorico extends React.Component {
    static navigationOptions = {
        title: 'histórico',
        drawerLabel: 'Histórico',
        drawerIcon: (
          <Icon name='history' size={25} color={'#1F2A33'} />
        ),
       
    };
  state = {
    telefone: '',
    id :''
  };
  
  validaFone = (fone) =>{
    let regex = new RegExp(/^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/);
    if(regex.test(fone)){
      return true;
    }else{
      return false;
    }
  }




  render(){
    return (
        
      <KeyboardAwareScrollView style={estilo.scroll}
      enableOnAndroid={true} extraHeight={130} extraScrollHeight={130}>
        <View style={{ backgroundColor:'#F6F6F6'}}>
        
        
<View style={{ flexDirection:'row' , backgroundColor:'#0A2745', height:90, alignContent:'space-around'}}>
        <Icon onPress={() => this.props.navigation.openDrawer()} name="bars" size={40} color="#F6F6F6" style={{paddingLeft:20,paddingTop:35, width:'15%'}} />
        <Text h1 bold style={estilo.titulo}>Histórico</Text>
                    
        
        </View>
        </View>
        <View style={estilo.principal}>
        
          
          <TextInput style={estilo.entrada}
            label='Telefone'
            
            render={props =>
              <TextInputMask  style={{paddingTop:40,paddingLeft:15}}
              
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                value={this.state.telefone}
                onChangeText={telefone => this.setState({ telefone })}
              />}
              
           />
          
          
          
          <TouchableOpacity style={estilo.botao} onPress={this.send}>
            <Text style={estilo.botaoTexto}>Continuar</Text>
          </TouchableOpacity>
          
        </View>
      </KeyboardAwareScrollView>
    );
  }
  
}
export default telaHistorico
const estilo = StyleSheet.create({
principal:{
  flex: 1,
  flexDirection: 'column',
  justifyContent:'center',
  alignItems: 'center',
  padding: 10,
  backgroundColor:"#F0F0F0",
  borderRadius:15,
  padding:10,borderTopLeftRadius:20,borderTopRightRadius:20, borderWidth:.1,margin:10
},
Titulo:{textAlign:"center",fontSize:50, color:'#F6F6F6',paddingTop:160, },
entrada:{
  
  borderBottomWidth: 0,
  marginBottom: 10,
  borderRadius: 2,
  paddingVertical: 5,
  width: '100%',
  backgroundColor:'white'
  
},
titulo:{
  color:'#F6F6F6',
  width:"80%",
  fontSize:25,
  paddingTop:40,
  textAlign:"center"


},
botao:{
  borderBottomWidth: 0,
  marginBottom: 10,
  borderRadius: 10,
  paddingVertical: 10,
  width: '50%',
  backgroundColor:'#0186AF',
  height:40,
  
},
botaoTexto:{
  textAlign:'center',
  fontSize:20,
  color:'white'
  
},
esqsenha:{
  paddingTop:20,
  alignItems:'center'
},
scroll:{
  flex:1,
  
  backgroundColor:'#F6F6F6'
}

});
