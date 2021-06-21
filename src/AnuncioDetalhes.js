import React, { Component, useState, useEffect } from "react";
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
} from "react-native";
import { Container, Header, Left, Right, Radio } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import Loader from "./Loader";
import axios from "axios";
import { round } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import Moment from "moment";

const AnuncioDetalhes = ({ route }) => {
  /*
  static navigationOpotions = {
    headerStyle: {
      backgroundColor: "#626A7F",
    },

    title: "Detalhes",
    headerTintColor: "#fff",
  };*/
  const { anuncio } = route.params;
  const [menu1, setMenu1] = useState(true);
  const [menu2, setMenu2] = useState(false);

  const [tituloo, setTituloo] = useState(anuncio.titulo);
  const [descricao, setDescricao] = useState(anuncio.descricao);
  const [valor, setValor] = useState("");
  const [anexo, setAnexo] = useState("");
  const [aguarda, setAguarda] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const [mostrarBotao, setMostrarBotao] = useState(false);
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("teste");
  const [sobrenome, setSobrenome] = useState("");
  const [investimento, setInvestimento] = useState(anuncio.investimento);
  const [data, setData] = useState("");
  //const [nota,setNota] = useState("")
  //const {titulo}=  route.params
  useEffect(() => {
    setInvestimento(anuncio.investimento);
    setData(Moment(anuncio.createdAt).format("DD/MM/YYYY"));

    getUser();
    ehInteressado();
  }, []);
  /*componentDidMount = async () => {
    console.log("fdfdfd")
    console.log(routes.params.anuncio,"id do anuncio")
    console.log(this.props.navigation.state.params.anuncio);
    this.setState({
      titulo: this.props.navigation.state.params.anuncio.titulo,
      descricao: this.props.navigation.state.params.anuncio.descricao,
      investimento: this.props.navigation.state.params.anuncio.investimento,
      data: Moment(this.props.navigation.state.params.anuncio.createdAt).format(
        "DD/MM/YYYY"
      ),
    });
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    this.getUser();
    this.ehInteressado();
  };*/

  async function getUser() {
    setAguarda(true);
    console.log(anuncio, "eeeeeeeeeeeeessssssssss");
    try {
      const response = await axios.get(
        `${process.env.APP_URL}/contratante/${anuncio.fk_contratante_id}`
      );
      console.log(response.data);
      setNome(response.data.nome_contratante);
      setSobrenome(response.data.sobre_nome_contratante);
      setFoto(response.data.foto_perfil_contratante);
      //setNota(response.data.avaliacao_contratante)
      /*this.setState({
        nome: response.data.nome_contratante,
        sobrenome: response.data.sobre_nome_contratante,
        foto: response.data.foto_perfil_contratante,
        nota: response.data.avaliacao_contratante,
      });*/
      setAguarda(false);
    } catch (error) {
      console.log(error);
    }
  }
  adicionaInteressado = async () => {
    setAguarda(true);
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    console.log(
      usuario.id,
      "aquiiiiiiiiiiii",
      route.params.anuncio.id,
      "auiii"
    );
    try {
      const response = await axios.post(
        `${process.env.APP_URL}/contratante/${usuario.id}/anuncio/${anuncio.id}/interessado`
      );
      alert("você foi adicionado a lista de interessados deste anuncio!!");
      console.log(response.data);
      setAguarda(false);
      setAdicionado(true);
    } catch (error) {
      console.log(error);
    }
  };
  async function ehInteressado() {
    setAguarda(true);
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    try {
      const response = await axios.get(
        `${process.env.APP_URL}/contratante/${usuario.id}/anuncio/${anuncio.id}/interessado`
      );

      console.log(response.data, "ve aqui");
      setAguarda(false);
      setAdicionado(true);
      setMostrarBotao(true);
    } catch (error) {
      if (error.response.status == 400) {
        setAguarda(false);
        setAdicionado(false);
        setMostrarBotao(true);
      } else {
        setAguarda(false);
        setAdicionado(true);
        setMostrarBotao(false);
      }
    }
  }
  async function removerInteresse() {
    setAguarda(true);
    const usuario = JSON.parse(
      await AsyncStorage.getItem("@CodeFrila:usuario")
    );
    try {
      const response = await axios.delete(
        `${process.env.APP_URL}/contratante/${usuario.id}/anuncio/${anuncio.id}/interessado`
      );
      alert("você foi removido da lista de interessados deste anuncio!!");
      console.log(response.data, "jjjjjjjjjjjjjjjjjjjjjjjjjjjj");
      setAguarda(false);
      setAdicionado(false);
    } catch (error) {
      console.log(error);
      setAguarda(false);
      setAdicionado(true);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        flexDirection: "column",
      }}
      style={{
        backgroundColor: "#FBFAFB",
      }}
      enableOnAndroid={true}
      extraHeight={130}
      extraScrollHeight={130}
    >
      <Loader loading={aguarda} />

      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          backgroundColor: "#FFF",
          borderWidth: 1,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderColor: "#E5E5E5",

          justifyContent: "space-between",
          minHeight: 120,
        }}
      >
        <View style={{ width: "35%", paddingTop: 10 }}>
          <Image
            source={{ uri: foto }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 70,
              alignSelf: "center",
            }}
          />
        </View>
        <View style={{ width: "60%", paddingTop: 45 }}>
          <Text style={{ fontSize: 23, color: "#626A7F" }}>
            {nome} {sobrenome}
          </Text>
          <Text style={{ fontSize: 23, color: "#626A7F" }}>{/* {nota} */}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          marginLeft: 10,
          marginRight: 10,

          backgroundColor: "#FFF",
          borderWidth: 1,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          borderColor: "#E5E5E5",

          justifyContent: "space-around",
          minHeight: 150,
        }}
      >
        <View style={{ minHeight: 70, padding: 20 }}>
          <Text style={{ fontSize: 20, color: "#626A7F" }}>Titulo</Text>
          <Text style={{ fontSize: 18, color: "#717682" }}>{tituloo}</Text>
        </View>
        <View style={{ minHeight: 70, padding: 20 }}>
          <Text style={{ fontSize: 20, color: "#626A7F" }}>Descrição</Text>
          <Text style={{ fontSize: 18, color: "#717682" }}>{descricao}</Text>
        </View>
        <View style={{ minHeight: 70, padding: 20 }}>
          <Text style={{ fontSize: 20, color: "#626A7F" }}>Investimento</Text>
          <Text style={{ fontSize: 18, color: "#717682" }}>
            R${investimento}
          </Text>
        </View>
        <View style={{ minHeight: 10, padding: 9, alignSelf: "flex-end" }}>
          <Text style={{ fontSize: 13, color: "#717682" }}>
            Adiciondado em {data}
          </Text>
        </View>
      </View>

      {mostrarBotao ? (
        <View
          style={{
            width: "100%",
            marginTop: 10,
          }}
        >
          {!adicionado ? (
            <TouchableOpacity
              style={estilo.botao}
              onPress={() => adicionaInteressado()}
            >
              <Text style={estilo.botaoTexto}>Adicionar</Text>
            </TouchableOpacity>
          ) : null}
          {adicionado ? (
            <TouchableOpacity
              style={estilo.botaoVeremlho}
              onPress={() => removerInteresse()}
            >
              <Text style={estilo.botaoTexto}>Cancelar Interesse</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </KeyboardAwareScrollView>
  );
};
export default AnuncioDetalhes;
const estilo = StyleSheet.create({
  principal: {
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
    color: "#F6F6F6",
    paddingTop: 160,
  },
  entrada: {
    height: 50,

    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "#E2E2E2",
  },
  s: {
    height: 95,

    marginBottom: 10,
    borderRadius: 2,
    paddingVertical: 5,
    width: "100%",
    backgroundColor: "#E2E2E2",
  },
  titulo: {
    color: "#F6F6F6",
    width: "80%",
    fontSize: 25,
    paddingTop: 35,
    textAlign: "center",
    paddingLeft: "15%",
  },
  botao: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 5,
    width: "50%",
    backgroundColor: "#466494",
    height: 40,
    alignSelf: "center",
  },
  botaoVeremlho: {
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 5,
    width: "50%",
    backgroundColor: "red",
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
  scroll: {
    flex: 1,

    backgroundColor: "#F6F6F6",
  },
});
