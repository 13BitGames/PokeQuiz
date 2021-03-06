import React, { Component } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

const shuffleArray = require('./utilities/ShuffleArray');
const ProgressBar = require('./utilities/ProgressBar');
const QUESTIONS = require('./data/questions.json');

export default class PokeQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: 'intro',
    };
  }

  startQuiz() {
    // Shuffle question order
    let questions = shuffleArray(QUESTIONS);
    // Shuffle choices order for each question
    for (var i = 0; i < questions.length; i++) {
      questions[i].choices = shuffleArray(questions[i].choices);
    }

    this.setState({
      score: 0,
      questionIndex: 0,
      questions: questions,
      progress: 0,
      screen: 'quiz',
    });
  }

  onChoiceSelected(choice) {
    if (choice.correct) {
      this.onCorrectChoiceSelected();
    } else {
      this.onWrongChoiceSelected();
    }
  }

  onCorrectChoiceSelected() {
    let newQuestionIndex = this.state.questionIndex + 1;

    if (newQuestionIndex > (QUESTIONS.length - 1)) {
      this.setState({
        screen: 'gameover'
      });
    } else {
      this.setState({
        questionIndex: newQuestionIndex,
        progress: newQuestionIndex / QUESTIONS.length,
        score: this.state.score + 1,
      });
    }
  }

  onWrongChoiceSelected() {
    this.setState({
      score: this.state.score - 1,
    });
    Alert.alert('Boourns!');
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
        <Text style={styles.largeHeader}>PokéQuiz!</Text>
        <View style={[styles.buttonContainer, styles.largeButtonContainer]}>
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
    let question = this.state.questions[this.state.questionIndex];

    let scoreText = this.state.score;
    if (this.state.score > 0) {
      scoreText = '+' + scoreText;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
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
        <ProgressBar
          fillStyle={{}}
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 10, width: 300}}
          progress={this.state.progress}
        />
      </View>
    );
  }

  renderGameOverScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.largeHeader}>Game Over</Text>
        <Text>Final score:</Text>
        <Text
          style={[styles.score, this.state.score >= 0 ? styles.colorPositive : styles.colorNegative]}>
          {this.state.score}
        </Text>
        <View style={[styles.buttonContainer, styles.largeButtonContainer]}>
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
  largeHeader: {
    fontSize: 40,
    textAlign: 'center',
    margin: 35,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  largeButtonContainer: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    margin: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#1a8ebf',
  },
  score: {
    textAlign: 'center',
    margin: 20,
    fontSize: 40,
  },
  colorPositive: {
    color: 'green',
  },
  colorNegative: {
    color: 'red',
  }
});
