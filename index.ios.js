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


const QUESTIONS = require('./data/questions.json');

export default class Puzzle1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'intro',
      score: 0,
      questionIndex: 0,
    };
  }

  startQuiz() {
    this.setState({
      score: 0,
      questionIndex: 0,
      screen: 'quiz',
    });
  }

  onChoiceSelected(choice) {
    let scoreDelta;
    let questionIndex = this.state.questionIndex;

    if (choice.correct) {
      scoreDelta = 1;
      questionIndex += 1;
    } else {
      Alert.alert('Boourns!');
      scoreDelta = -1;
    }

    this.setState({
      score: this.state.score + scoreDelta
    });

    if (questionIndex > (QUESTIONS.length - 1)) {
      this.setState({
        screen: 'gameover'
      });
    } else {
      this.setState({
        questionIndex: questionIndex,
      });
    }
  }

  render() {
    if (this.state.screen === 'intro') {
      return this.renderIntroScreen();
    } else if (this.state.screen === 'quiz') {
      return this.renderQuizScreen();
    } else {
      return this.renderGameOverScreen();
    }
  }

  renderIntroScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PokeQuiz!</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.startQuiz()}
            color="white"
            title="Start!"
          />
        </View>
      </View>
    );
  }

  renderQuizScreen() {
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

  renderGameOverScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Game Over</Text>
        <Text>Final score:</Text>
        <Text
          style={[styles.score, this.state.score >= 0 ? styles.colorPositive : styles.colorNegative]}>
          {this.state.score}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.startQuiz()}
            color="white"
            title="Play Again!"
          />
        </View>
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
