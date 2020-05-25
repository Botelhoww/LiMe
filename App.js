import React, { useState, useEffect, Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet, Keyboard, Alert, AsyncStorage } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { CheckBox } from "native-base"

import Chequi from './Chequi'

export default function App() {

  const [preco, setPreco] = useState(["00,00"]);

  function onInputChange(setState, value) {
    setState(value);
  };

  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');

  async function addItem() {

    const search = task.filter(task => task === newTask)

    if (newTask === '') {
      Alert.alert('Atenção', 'Item Inválido!')
      return;
    }

    if (search != 0) {
      Alert.alert('Atenção', "Item Repetido!");
      return;
    }

    setTask([...task, newTask])
    setNewTask('')

    // Keyboard.dismiss();
  }

  async function removeItem(item) {

    Alert.alert(
      "Confirmar Exclusão",
      item,
      [
        {
          text: 'Cancelar',
          onPress: () => {
            return;
          },
          style: 'cancelar'
        },
        {
          text: 'Confirmar',
          onPress: () => setTask(task.filter(tasks => tasks != item))
        }
      ]
    )
  }

  useEffect(() => {
    async function carregaDados() {
      const task = await AsyncStorage.getItem("item")

      if (task) {
        setTask(JSON.parse(task))
      }

    }
    carregaDados();
  }, [])

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("item", JSON.stringify(task))
    }
    salvaDados();
  }, [task])

  return (
    <View style={styles.container}>
      <View style={styles.Form}>
        <Text style={styles.precoTotal}>R$ {preco}</Text>
      </View>

      <Text style={styles.Texto}>Liste a compra da vez!</Text>

      <View style={styles.Form}>
        <TextInput style={styles.input}
          placeholder="Digite o item..."
          placeholderTextColor="#fff"
          onChangeText={text => setNewTask(text)}
          value={newTask}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => addItem()}>
          <FontAwesome5 style={styles.iconBtn} name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.Body}>
        <FlatList
          data={task}
          keyExtractor={item => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.Lista}>
              <Text style={styles.ItensLista}>{item}</Text>

              <Chequi></Chequi>

              <TextInput style={styles.InputPreco}
                placeholder="Preço..."
                placeholderTextColor="#fff"
                keyboardType="numbers-and-punctuation"
                onChangeText={value => onInputChange(setPreco, value)}
              />

              <TouchableOpacity
                onPress={() => removeItem(item)}
                style={{ paddingTop: 15, paddingRight: 20 }}
              >
                <FontAwesome5 name="trash" size={24} color="#f62c45"></FontAwesome5>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  InputPreco: {
    flex: 1,
    position: 'absolute',
    marginLeft: 300,
    alignSelf: "center"
  },
  precoTotal: {
    fontSize: 30,
    color: 'white',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#c8c8c8',
    marginLeft: '65%',
    backgroundColor: '#355C6D'
  },
  ItensLista: {
    fontSize: 25,
    marginTop: 17,
    paddingLeft: 10,
  },
  Lista: {
    backgroundColor: '#c8c8c8',
    height: 65,
    margin: 4,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#c5d5d2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBtn: {
    textAlign: "center"
  },
  Texto: {
    fontSize: 25,
    color: '#fff',
    paddingLeft: 15,
    paddingTop: 20,
  },
  Body: {
    flex: 1
  },
  container: {
    paddingTop: 45,
    backgroundColor: '#355C7D',
    flex: 1
  },
  input: {
    paddingLeft: 10,
    margin: 15,
    height: 50,
    borderColor: '#F67280',
    borderWidth: 1.3,
    fontSize: 20,
    borderRadius: 10,
    width: 265
  },
  submitButton: {
    backgroundColor: '#F67280',
    padding: 10,
    margin: 15,
    height: 45,
    borderRadius: 10,
    width: 100,
    alignSelf: "center",
  },
  Form: {
    padding: 0,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
  },
})

console.disableYellowBox = true