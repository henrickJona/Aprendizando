import React,{createContext,useState} from "react"
import {
 
  AsyncStorage
  } from 'react-native';
import { render } from "react-dom";
interface tipoDeDados{
    logado:boolean;
    testaLogin():void;
    sair():void
    carregando:boolean;
}

const AuthContext = createContext<tipoDeDados>({}as tipoDeDados);


export const AuthProvider =({children})=>{
    const [usuario,setUsuario] = useState({})
    const[carregando,setCarregando]= useState(true)
     async function testaLogin (){
        const usuario = await AsyncStorage.getItem('@CodeFrila:usuario')
        setUsuario(usuario)
        setCarregando(false)
        console.log("passssei pelo login")
        
    }
  
    async function sair (){
        console.log("PASSOU PELO SAIR")
        AsyncStorage.clear().then(()=>{
            setUsuario(null)
        }

        )
        
   
    }

        return (<AuthContext.Provider value={{testaLogin,logado: Boolean(usuario),sair,carregando}}>
            {children}
            </AuthContext.Provider>);
   

}

export default AuthContext