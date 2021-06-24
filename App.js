import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, StatusBar } from 'react-native';

export default function App() {

  //OS FAMOSOS USE STATES! É UM "ARRAY" ONDE O PRIMEIRO É A VARIAVEL EM SI E O SEGUNDO É UMA FUNÇÃO QUE ALTERA SEU VALOR
  const [result, setResult] = useState('...');
  const [altura, setAltura] = useState();
  const [peso, setPeso] = useState();
  const [diagnostico, setDiagnostico] = useState('');

  const chamaErro = (tipo_erro) => {
    switch(tipo_erro){
      case 'nan':
        Alert.alert(
          'Opa!',
          'Insira somente números.\nLembre-se que a altura não pode ser zero!',
          [],
          {cancelable: true}  
        );
        break;
      default:
        break; 
    }
  }
  
  const validaCampos = (altura, peso) => {
    if(isNaN(altura) || isNaN(peso) || altura === '' || peso === ''){
      chamaErro('nan');
    } else{
      calculaIMC(altura, peso);
    }
  }

  const calculaIMC = (altura, peso) => {
    let imc = (peso/(altura*altura)).toFixed(2);
    setResult(imc);

    if(imc <= 16.9 ){
      setDiagnostico('Muito abaixo do peso');
    } else if (imc > 16.9 && imc <= 18.4 ){
      setDiagnostico('Abaixo do Peso');
    } else if (imc > 18.4 && imc <= 24.9 ){
      setDiagnostico('Peso normal!');
    } else if (imc > 24.9 && imc <= 29.9 ){
      setDiagnostico('Acima do peso');
    } else if (imc > 29.9 && imc <= 34.9 ){
      setDiagnostico('Obesidade Grau I');
    } else if (imc > 34.9 && imc <= 40 ){
      setDiagnostico('Obesidade Grau II');
    } else if (imc > 40 ){
      setDiagnostico('Obesidade Grau III');
    } else {
      setDiagnostico('');
    }
  }
  

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <Text style={styles.title}>- CALCULADORA DE IMC -</Text>
      <Text style={styles.sub_title} >Informe a sua altura (exemplo: 1.75)</Text>
      <TextInput  style={styles.text_input} keyboardType='numeric' onChangeText={(valor) => setAltura(valor)} />
      <Text style={styles.sub_title} >Insira seu peso (exemplo: 80)</Text>
      <TextInput  style={styles.text_input} keyboardType='numeric'onChangeText={(valor) => setPeso(valor) }/>
      <Button title='Calcular' onPress={() => validaCampos(altura, peso)} />
      <Text style={styles.result2}>Seu IMC é: <Text style={styles.result}>{result}</Text></Text>
      <Text style={styles.result}>{diagnostico}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  sub_title: {
    marginVertical: 10,
    fontSize:15
  },
  text_input: {
    width: '75%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    paddingHorizontal:15,
    marginBottom: 10
  },
 result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  result2: {
    fontSize: 16,
    marginTop: 10
  },
  result3:{
    fontSize: 16,
    marginTop: 10
  }
});
