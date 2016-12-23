/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
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

  onChoiceSelected(choice) {
    let scoreDelta;

    if (choice.correct) {
      Alert.alert('Hooray!');
      scoreDelta = 1;
    } else {
      Alert.alert('Boourns!');
      scoreDelta = -1;
    }

    this.setState({score: this.state.score + scoreDelta});
  }

  render() {
    let question = QUESTIONS[this.state.questionIndex];

    let scoreText = this.state.score;
    if (this.state.score > 0) {
      scoreText = '+' + scoreText;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {question.text}
        </Text>
        {question.choices.map((choice, index) => (
          <View key={index} style={styles.buttonContainer}>
            <Button
              onPress={() => this.onChoiceSelected(choice)}
              color="white"
              title={choice.text}
            />
          </View>
        ))}
        <Text
          style={[styles.score, this.state.score >= 0 ? styles.colorPositive : styles.colorNegative]}>
          {scoreText}
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
    margin: 10,
    fontSize: 30,
  },
  colorPositive: {
    color: 'green',
  },
  colorNegative: {
    color: 'red',
  }
});

AppRegistry.registerComponent('Puzzle1', () => Puzzle1);
