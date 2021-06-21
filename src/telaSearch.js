import React, { Component ,useState,useEffect} from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Alert,
  TextInput,TouchableWithoutFeedbackBase,ActivityIndicator
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Container, Header, Left, Right, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import Loader from "./Loader";
import axios from "axios";

const telaSearch =()=> {
const [aguarda,setAguarda] = useState(false)
  

 
  
    return (
 
      <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow:1,
        flexDirection:"column",justifyContent:"space-between"}}
        style={{
              backgroundColor: "#FBFAFB", marginTop: 25
              }}
        enableOnAndroid={true}
        extraHeight={130}
        extraScrollHeight={130}
        
    
      >
         
        
<View >
<Loader loading={aguarda} />
        
        <Animatable.View animation="lightSpeedIn" style={{ backgroundColor: "#626A7F", height: 55,padding:10,flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        
        <View style={{width:"10%",backgroundColor:"white",height:45,borderTopLeftRadius:12,borderBottomLeftRadius:12}}>
        <TouchableOpacity style={{alignItems:"center",height:"100%",width:"100%"}}>
        <Icon name={"search"} size={35} color={"#999999"} style={{alignItems:"center"}} />
        </TouchableOpacity>

         </View>
         <TextInput style={{backgroundColor:"white",height:45,width:"80%",padding:10}}>
         </TextInput>
         <View style={{width:"10%",alignSelf:"center",backgroundColor:"white",height:45,alignItems:"center",borderBottomRightRadius:12,borderTopRightRadius:12}}>
         <TouchableOpacity style={{alignItems:"center",height:"100%",width:"100%"}}>
         <Icon name={"filter"} size={35} color={"#999999"}  style={{alignContent:"center"}} />
        </TouchableOpacity>
         
         </View>
            
          
        </Animatable.View >
        <Animatable.View>
          <Picker>
            <Picker.Item   color={"#676767"}
                    
                      label={"Anúncios"}
                      value={1}/>
            <Picker.Item color={"#676767"}
                    
                    label={"Usuário"}
                    value={2}/>
          </Picker>

          <View>
            <Text>
              Faixa de Preço:
            </Text>
            <TouchableOpacity style={{backgroundColor:"#626a7f",width:50,height:50,borderRadius:12,justifyContent:"center"}}>
              <Text style={{fontSize:25,color:"white",textAlign:"center"}}>
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"#626a7f",width:50,height:50,borderRadius:12,justifyContent:"center"}}>
              <Text style={{fontSize:25,color:"white",textAlign:"center"}}>
                10
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        
        </View>
      </KeyboardAwareScrollView>
   
    );
  }

export default telaSearch;
const estilo = StyleSheet.create({
  principal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 15,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 0.1,
    margin: 10
  },
  Titulo: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    paddingTop: 160
  },
  entrada: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "white"
  },
  titulo: {
    color: "#477fad",

    fontSize: 25,
    paddingBottom: 40
  },
  botao: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 7,
    width: "40%",
    backgroundColor: "#0072AE",
    height: 40,
    alignSelf:"center"
  },
  botaoTexto: {
    textAlign: "center",
    fontSize: 20,
    color: "white"
  },
  esqsenha: {
    paddingTop: 20,
    alignItems: "center"
  },
  scroll: {
  
  }
});
