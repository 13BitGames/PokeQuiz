/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';


const QUESTIONS = [
  {
    text: "What does Pikachu evolve into?",
    choices: [
      {text: "Bulbasaur"},
      {text: "Raichu", correct: true},
      {text: "Charizard"},
    ],
  },
  {
    text: "What does Charmander evolve into?",
    choices: [
      {text: "Bulbasaur"},
      {text: "Raichu"},
      {text: "Charmeleon", correct: true},
    ],
  }
];


export default class Puzzle1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      questionIndex: 0,
    };
  }

  render() {
    let question = QUESTIONS[this.state.questionIndex];

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {question.text}
        </Text>
        {question.choices.map((choice, index) => (
          <View key={index} style={styles.buttonContainer}>
            <Button
              color="white"
              title={choice.text}
            />
          </View>
        ))}
        <Text style={styles.score}>
          {this.state.score}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer: {
    margin: 5,
    backgroundColor: 'blue',
  },
  score: {
    textAlign: 'center',
    color: 'black',
    margin: 10,
    fontSize: 30,
  },
});

AppRegistry.registerComponent('Puzzle1', () => Puzzle1);
