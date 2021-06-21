
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
AsyncStorage,Image,Text
} from 'react-native';




class splashScreen extends React.Component{
  
componentDidMount = async()=>{
    
    const token =  await AsyncStorage.getItem('@CodeFrila:token')
    if(token)
        console.log('token existe');
    console.log(token);
    this.props.navigation.navigate(token? 'app':'auth');
}

    render(){
        return (
           
<View style={{backgroundColor:'#0A2745',height:'100%', flexDirection:'column'}}>
    {console.log('entrei')}
    
{/*     <Image
                            style={{width: '100%',position:"absolute", zIndex:1}}
                            source={require('../assets/fundo.png')}
                            resizeMode='contain'
                            />
                            <Image
                            style={{width: '100%',position:'absolute',zIndex:0}}
                            source={require('./fundo.png')}
                            resizeMode='cover' blurRadius={12}
                            /> */}
    
    
    <Text style={{fontSize:50, color:'white',textAlign:'center',top:'50%'}}>teste</Text>
              
                
</View>

            
        )
    }
  
}
export default splashScreen