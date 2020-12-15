import React,{createContext,useState} from "react"
import {
 
  AsyncStorage
  } from 'react-native';
//import { render } from "react-dom";
import GLOBALS from "../../GLOBALS";
import io from "socket.io-client";

const socket = io(`${GLOBALS.APP_URL}`,{autoConnect:false} )

const SocketContext = createContext({socket});


export const SocketProvider =({children})=>{
  
    
  
    

        return (<SocketContext.Provider value={{socket}}>
            {children}
            </SocketContext.Provider>);
   

}

export default SocketContext