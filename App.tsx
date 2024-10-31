import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import axios from 'axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [cepInfo, setCepInfo] = useState<any | null>(null);


  const validateCep = async () => {
    try {
      const cepCleaned = cep.replace(/[^\d]/g, ''); 
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepCleaned}`);
      setCepInfo(response.data); 
      Alert.alert('CEP encontrado!', `Cidade: ${response.data.city}, Estado: ${response.data.state}`);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível validar o CEP. Verifique o CEP inserido e tente novamente.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Digite o CEP:</Text>
      <TextInput
        style={styles.input}
        placeholder="00000-000"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
      />
      <Button title="Validar CEP" onPress={validateCep} />
      {cepInfo && (
        <View style={styles.infoContainer}>
          <Text>CEP: {cepInfo.cep}</Text>
          <Text>Endereço: {cepInfo.street}</Text>
          <Text>Cidade: {cepInfo.city}</Text>
          <Text>Estado: {cepInfo.state}</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
