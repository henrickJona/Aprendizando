import React, { Component } from "react";
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
  AsyncStorage,
  Picker,
  TouchableWithoutFeedbackBase,
  ActivityIndicator,
} from "react-native";
import { Container, Header, Left, Right, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import Loader from "./Loader";
import axios from "axios";
import GLOBALS from "../GLOBALS";
import io from "socket.io-client";
//import socket from "../teste"
/* import socket from "../Socket"; */
class telaAdicionar extends React.Component {
  static navigationOpotions = {};
  state = {
    titulo: "",
    id: "",
    descricao: "",

    investimento: "",

    aguarda: false,
  };
    componentDidMount() {
    /* this.socket = io(`${GLOBALS.APP_URL}`, { forceNode: true }); */
    
  }

  trataInvestimento = async () => {
    let money = this.state.investimento;
    let aux = money.replace("R$", "");
    console.log(aux);
    this.setState({ investimento: aux }, () => {
      return;
    });
  };

  send = async () => {
    console.log("jonathan");
    let money = this.state.investimento;
    let aux = money.replace("R$", "");
    console.log(aux);
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    console.log(usuario.id);
    let investimento = parseFloat(aux);
    if (
      this.state.titulo == "" ||
      this.state.descricao == "" ||
      this.state.investimento == ""
    ) {
      alert("Insira todos os campos!!");
    } else if (parseFloat(aux) < 5) {
      alert("Insira um valor minimo de R$ 5!!");
    } else {
      this.setState({
        aguarda: true,
      });
      try {
        const resp = await axios.post(
          `${GLOBALS.APP_URL}/instituicao/${usuario.fk_instituicao_id}/contratante/${usuario.id}/anuncio`,
          {
            titulo: this.state.titulo,
            descricao: this.state.descricao,
            investimento: investimento,
          }
        );
        /* const data = { titulo: this.state.titulo, id_instituicao: usuario.fk_instituicao_id} */
        console.log("passouuuuuuuu");
        const data = usuario.fk_instituicao_id;
        //socket.emit("gf", data);
        console.log("passouuuuuuuuzzzzz");

        this.setState(
          {
            aguarda: false,
            titulo: "",
            descricao: "",
            investimento: "",
          },
          () => {
            alert("Anuncio Aicionado!!");
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  isEmpty = (obj) => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  render() {
    return (
      <View>
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
          extraHeight={-290}
          extraScrollHeight={-290}
        >
          <View>
            <Loader loading={this.state.aguarda} />

            <View style={{ backgroundColor: "#FBFAFB", height: 180 }}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={require("./add.png")}
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
                  Cadastrar Anúncio
                </Text>
                <TextInput
                  maxLength={50}
                  style={estilo.entrada}
                  label="Título"
                  placeholder={"máximo 50 caracteres"}
                  value={this.state.titulo}
                  onChangeText={(titulo) => this.setState({ titulo })}
                  theme={{ colors: { primary: "#3F51B5" } }}
                />
                <TextInput
                  style={
                    (estilo.entrada, { height: 100, backgroundColor: "#FFF" })
                  }
                  multiline={true}
                  label="Descrição"
                  value={this.state.descricao}
                  onChangeText={(descricao) => this.setState({ descricao })}
                  theme={{ colors: { primary: "#3F51B5" } }}
                />

                <TextInput
                  style={estilo.entrada}
                  label="Investimento"
                  placeholder={"minimo R$ 5"}
                  render={(props) => (
                    <TextInputMask
                    placeholder={"Valor Minimo R$ 5"}
                      style={{ paddingTop: 40, paddingLeft: 15 }}
                      type={"money"}
                      value={this.state.investimento}
                      onChangeText={(investimento) =>
                        this.setState({ investimento })
                      }
                    />
                  )}
                  theme={{ colors: { primary: "#3F51B5" } }}
                />

                <TouchableOpacity
                  style={estilo.botao}
                  /* onPress={() => this.send()} */
                  onPress={()=> this.send()
                  }
                >
                  <Text style={estilo.botaoTexto}>Adicionar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
export default telaAdicionar;
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
