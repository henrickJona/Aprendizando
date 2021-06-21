import React, { Component,useState ,useEffect,useContext} from "react";
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
  TouchableWithoutFeedbackBase,
  ActivityIndicator,
} from "react-native";
import {Picker as SelectPicker} from '@react-native-picker/picker';
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import Loader from "./Loader";
import axios from "axios";
import AuthContext from "./Contexts/AuthContext"
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage';
import io from "socket.io-client";
/* import socket from "../Socket"; */
 const telaCadastro =({navigation,route})=> {
   const {idd} = route.params
   const {testaLogin} = useContext(AuthContext)
const[telefone,setTelefone] =useState("")
const[id,setId] =useState("")
const[selecionado,setSelecionado] =useState("")
const[listaInstituicao,setListaInstituicao] =useState([])
const[mostrar,setMostrar] =useState(false)
const[instituicaoNome,setInstituicaoNome] =useState("")
const[testaScroll,setTestaScroll] =useState(true)
const[abrePesquisa,setAbrePesquisa] =useState(false)
const[loading,setLoading] =useState(false)
const[cursoNome,setCursoNome] =useState("")
const[listaCurso,setListaCurso] =useState([])
const[cursoId,setCursoId] =useState(-1)
const[cursoFkId,setCursoFkId] =useState(-1)
const[autoriza,setAutoriza] =useState(false)
const[aguarda,setAguarda] =useState(false)
 
  /* componentDidMount() {
    
    this.setState({ id: this.props.navigation.state.params.idd }, () => {
      console.log(id);
    });
  } */
  function validaFone (fone) {
    if (
      cursoNome != "" &&
      instituicaoNome != "" &&
      telefone != ""
    ) {
      let regex = new RegExp(/^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/);
      if (regex.test(fone)) {
        return 1;
      } else {
        return 2;
      }
    } else {
      return 3;
    }
  };

  async function getCursoId () {
    listaCurso.map((x, i) => {
      if (i === cursoId - 1) {
        setCursoId(x.id)
      }
    });
  };

 async function send (){
    setAguarda(true)

    if (validaFone(telefone) === 1) {
      try {
        const resp = await api.post(`/contratante/`, {
          nome_contratante: idd.nome,
          sobre_nome_contratante: idd.sobrenome,
          telefone_contratante: telefone,
          email_contratante: idd.email,
          fk_instituicao_id: cursoFkId,
          fk_curso_id: cursoId,
          foto_perfil_contratante: idd.foto,
        });

        const { contratante, token } = resp.data;
        try {
          const resposta = await api.post(
            `/instituicao/${cursoFkId}/contratante/${contratante.id}/favorito`,
            {}
          );
          console.log(resposta.data);
          await AsyncStorage.multiSet([
            ["@CodeFrila:token", token],
            ["@CodeFrila:usuario", JSON.stringify(contratante)],
          ]);
    /*  socket.emit(
            "room",
            `usuario/${contratante.email_contratante}/instituicao/${cursoFkId}`
          ); */
          console.log("entrou");
          setAguarda(false)
          testaLogin()
          //navigation.navigate("app")
          
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (validaFone(telefone) === 2) {
      alert("Insira um Número Válido!!");
    } else if (validaFone(telefone) === 3) {
      alert("Preencha todos os campos!!");
    }
  };
  function isEmpty (obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  async function mostraCurso () {
    setListaCurso([])

    let objeto = [{ id: 1, nome: "Sem conexão no momento" }];
    /*  console.log(pesquisa) */

    setMostrar(true)

    try {
      const response = await api.get(
        `/instituicao/${cursoFkId}/curso`
      );

      if (isEmpty(response.data)) {
        setListaCurso(objeto)
        console.log("aqui")
      } else {
        console.log("é pra ser aqui")
        setListaCurso(response.data)
        setAutoriza(true)
      }
    } catch (error) {
      setListaCurso(objeto)
      
      console.log(error);
    }
  };

  async function mostraInstituicao (pesquisa)  {
    setInstituicaoNome(pesquisa)
    setListaCurso([])
    setAutoriza(false)
    
    let objeto = [{ id: 1, nome: "Sem conexão no momento" }];
    /*  console.log(pesquisa) */
    if (pesquisa === "") {
      setMostrar(false)
      setLoading(false)
      setAutoriza(false)
      setListaInstituicao(null)

    } else {
      setMostrar(true)
      setLoading(true)
      

      try {
        const response = await api.get(
          `/instituicao/${pesquisa}`
        );
setListaInstituicao(response.data)
setLoading(false)
setAutoriza(false)
       
        /*  console.log(listaInstituicao,"jonathan") */
      } catch (error) {
        setListaInstituicao(objeto)
        setLoading(false)
      

        console.log(error);
      }
    }
  };
  useEffect(()=>{
    mostraCurso()
  },[cursoFkId])

  function selecionaInstituicao (instituicao,id) {
    setInstituicaoNome(instituicao)
    setAbrePesquisa(false)
    console.log(id)
    setCursoFkId(id)
    
    
  };
  function abre (){
    if (abrePesquisa) {
      setAbrePesquisa(false)
    } else {
      setAbrePesquisa(true)
    }
  };
  function lista ()  {
    if (listaCurso === null) {
      
      setAutoriza(false)
      setCursoNome(null)
  
    } else {
      return listaCurso.map((x, i) => {
        return <SelectPicker.Item label={x.nome} key={i} value={x.nome} />;
      });
    }
  };

function mudaCursoNomeECursoId(value, index){
  
  setCursoNome(value)
  setCursoId(index)
}
    return (
      <View>
        {!abrePesquisa ? (
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flexGrow: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            style={{
              backgroundColor: "#FBFAFB",
            }}
            enableOnAndroid={true}
            extraHeight={130}
            extraScrollHeight={130}
          >
            <View>
              <Loader loading={aguarda} />

              <View style={{ backgroundColor: "#FBFAFB", height: 180 }}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={require("../assets/register.png")}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  backgroundColor: "#FBFAFB",
                  height: "70%",
                  padding: 10,

                  shadowColor: "#F0EFF0",
                  shadowRadius: 10,
                  shadowOpacity: 1,
                }}
              >
                <View
                  style={{
                    padding: 10,
                    borderRadius: 12,
                    backgroundColor: "#FDFCFD",
                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "#626A7F",
                      fontSize: 25,
                      textAlign: "center",
                    }}
                  >
                    Quase lá
                  </Text>
                  <TextInput
                    style={estilo.entrada}
                    label="Telefone"
                    render={(props) => (
                      <TextInputMask
                        style={{ paddingTop: 40, paddingLeft: 15 }}
                        type={"cel-phone"}
                        options={{
                          maskType: "BRL",
                          withDDD: true,
                          dddMask: "(99) ",
                        }}
                        value={telefone}
                        onChangeText={(telefone) => setTelefone(telefone)}
                      />
                    )}
                  />

                  <TouchableHighlight onPress={()=>abre()}>
                    <TextInput
                      editable={false}
                      placeholder={"Instituição"}
                      style={{ backgroundColor: "#FFFFF" }}
                      value={instituicaoNome}
                    ></TextInput>
                  </TouchableHighlight>

                  <SelectPicker
                    enabled={autoriza}
                    selectedValue={cursoNome}
                    onValueChange={(value, index) =>
                      mudaCursoNomeECursoId(value,index)
                      
                    }
                    style={{ height: 70 }}
                  >
                    <SelectPicker.Item
                      color={"#676767"}
                      key={"unselectable"}
                      label={"Selecione Um Curso"}
                      value={0}
                    />
                    {autoriza ? lista() : null}
                  </SelectPicker>

                  <TouchableOpacity style={estilo.botao} onPress={()=>send()}>
                    <Text style={estilo.botaoTexto}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        ) : null}
        {abrePesquisa ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "15%" }}>
              <Icon
                onPress={()=>abre()}
                name={"arrow-left"}
                size={35}
                style={{ marginTop: 45, paddingLeft: 10, color: "#A5B2ED" }}
              />
            </View>
            <View style={{ width: "85%" }}>
              <TextInput
                autoFocus={true}
                placeholder={"Instituição"}
                style={{
                  backgroundColor: "#FFFFF",
                  marginTop: 30,
                  width: "100%",
                }}
                value={instituicaoNome}
                onChangeText={(text) => mostraInstituicao(text)}
              ></TextInput>
              {loading ? (
                <ActivityIndicator
                  style={{ marginTop: 50, position: "absolute", right: 20 }}
                  animating={true}
                />
              ) : null}
              {mostrar ? (
                <FlatList
                  style={{ maxHeight: 450 }}
                  data={listaInstituicao}
                  renderItem={({ item: rowData }) => {
                    return (
                      <View style={{}}>
                        <TouchableOpacity
                          onPress={() =>
                           selecionaInstituicao(rowData.nome, rowData.id)
                          }
                          style={{
                            height: 70,
                            width: "100%",
                            padding: 10,
                            borderWidth: 1,
                            borderColor: "#E0E0E0",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text style={{ fontSize: 18 }}>{rowData.nome}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => item.nome}
                />
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  
}
export default telaCadastro;
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
    margin: 10,
  },
  Titulo: {
    textAlign: "center",
    fontSize: 50,
    color: "white",
    paddingTop: 160,
  },
  entrada: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "white",
  },
  titulo: {
    color: "#477fad",

    fontSize: 25,
    paddingBottom: 40,
  },
  botao: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 7,
    width: "40%",
    backgroundColor: "#0072AE",
    height: 40,
    alignSelf: "center",
  },
  botaoTexto: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  esqsenha: {
    paddingTop: 20,
    alignItems: "center",
  },
  scroll: {},
});