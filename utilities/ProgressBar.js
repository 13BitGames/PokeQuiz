// https://github.com/papertrailio/react-native-progress-bar/blob/dfd9749279113df4e15fb22436cd182a5739a9b8/ProgressBar.js
import React, {
    Component
} from 'react';

import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
} from 'react-native';

var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5
  }
});

class ProgressBar extends Component {

  defaultProps = {
    style: styles,
    easing: Easing.inOut(Easing.ease),
    easingDuration: 500
  }

  state = {
    progress: new Animated.Value(this.props.initialProgress || 0)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update();
    }
  }

  render() {

    var fillWidth = this.state.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0 * this.props.style.width, 1 * this.props.style.width],
    });

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, { width: fillWidth }]}/>
      </View>
    );
  }

  update() {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress
    }).start();
  }
}

module.exports = ProgressBar;
