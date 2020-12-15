
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View,SafeAreaView,ScrollView,Image,TouchableOpacity, AsyncStorage, Modal,
  ActivityIndicator,Picker } from 'react-native';
import api from '../services/api'
export default class PickerCategorias extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      categorias:[],
      selecionado:''
    }
  }
  componentDidMount = async()=>{
    
        try{
          const response = await api.get(`http://172.16.53.97:3333/categoria`)
          console.log(response.data)
          
          
          this.setState({
              categorias:'Selecione Uma Categoria',
              selecionado: this.state.categorias,
            categorias: response.data
          })
          
        }catch(error){
          console.log(error)
        }
      
    
  }
  categoriaslista = () =>{
    return( this.state.categorias.map( (x,i) => { 
        console.log(x,i)
          return( <Picker.Item label={x.titulo_categoria} key={i} value={x}  />)
        } ));
}
  render () {
   
    return (
        <View>
            
            <Picker
                selectedValue={this.state.selecionado}
                onValueChange={ (item) => ( this.setState({selecionado:item}) ) } >
                <Picker.Item key={'unselectable'} label={'Selecione Uma Categoria'} value={0} />
                { this.categoriaslista() }

            </Picker>
        </View>
    );
  }
}


