import React from 'react';
import {View, Text,TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FinalizarAprendiz = ()=>{

    return(
        <View style={{flexDirection:'column',backgroundColor:'#FBF9FC',flex:1,justifyContent:'space-around'}}>
            <View style={{flexDirection:'column',backgroundColor:'#fff',justifyContent:'space-around',borderWidth:1,borderColor:'#CFD9E0',height:"60%"}}>

           
            <View style={{backgroundColor:'#71799E',justifyContent:'center',alignItems:'center',width:"90%",alignSelf:'center',borderRadius
        :12}}>
<Icon name='alert-octagon' size={120}color='white' />
            </View>
            <View style={{paddingHorizontal:10,alignItems:'center'}}>
                <Text style={{fontSize:19,textAlign:'left',width:'90%'}}>
Por favor, como forma de segurança, aconselhamos que o pagamento seja feito após a aula, na presença do ministrante.
                </Text>
            </View>
            </View>
            <View style={{flexDirection:"row",justifyContent:'space-around'}}>
            <View style={{flexDirection:'row',width
:"40%"}} >
<TouchableOpacity style={{backgroundColor:'#3F51B5',borderWidth:1,borderColor:'#CFD9E0', width:"100%",borderRadius:9}}>
<View>
    <Icon style={{alignSelf:'center'}} name='cash' size={52} color={'#FFF'} />
</View>
<View>
    <Text style={{fontSize:17,textAlign:'center', color:'#fff'}}>
        Pagar
    </Text>
</View>
    </TouchableOpacity>
</View>
<View style={{flexDirection:'row',width
:"40%"}} >
    <TouchableOpacity style={{backgroundColor:'#fff',borderWidth:1,borderColor:'#CFD9E0', width:"100%",borderRadius:9}}>
    <View>
    <Icon style={{alignSelf:'center'}} name='cancel' size={52} color={'#F3606E'} />
</View>
<View>
    <Text style={{fontSize:17,textAlign:'center'}}>
        Cancelar Aula
    </Text>
</View>
    </TouchableOpacity>
</View>
            </View>
        </View>

)

}
export default FinalizarAprendiz;