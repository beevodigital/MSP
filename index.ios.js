'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  AppRegistry,
  AlertIOS,
  Navigator,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} = ReactNative;

import Countdown from "./Countdown";

var {AudioRecorder, AudioUtils} = require('react-native-audio');
const timer = require('react-native-timer');

class MSP extends React.Component{
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'splash', index: 0}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    var _navigator = navigator;
    switch (route.id) {
      case 'splash':
        return (<SplashPage navigator={navigator} title="first"/>);
      case 'second':
        return (<Second navigator={navigator} title="second"/>);
      case 'third':
        return (<Third navigator={navigator} title="third"/>);
    }
  }
}

class SplashPage extends React.Component{
  navSecond(){
    this.props.navigator.push({
      id: 'second'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>Continue</Text>
        </TouchableHighlight>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          keyboardType="numeric"
        />
      </View>
    );
  }
}

class Second extends React.Component{
  constructor(props) {

    super(props);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addTwoSeconds = this.addTwoSeconds.bind(this);
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false,
      countdownStarted: false,
      //uploading: false,
      //showUploadModal: false,
      //uploadProgress: 0,
      //uploadTotal: 0,
      //uploadWritten: 0,
      //uploadStatus: undefined,
      //cancelled: false,
      //images: [],
    }
  }

  componentDidMount() {
    var d = new Date();
    var n = d.getSeconds();
    var audioPath = AudioUtils.DocumentDirectoryPath + '/' + n + 'test.caf';
    AudioRecorder.prepareRecordingAtPath(audioPath);
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log(`Finished recording: ${data.finished}`);
    };
  }

  handleEnd() {
    this.setState({countdownStarted: false});
    this._stop();
  }

  handleClick() {
    this.setState({countdownStarted: true});
  }

  addTwoSeconds () {
    if (this.countdown) {
      this.countdown.addTime(30)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this._renderButton("BEGIN", () => {this._record()}, this.state.recording )}
        {this._renderButton("STOP", () => {this._stop()} )}

        <Text style={styles.progressText}>{this.state.currentTime}s</Text>

        { this.state.countdownStarted
            ? (<Countdown ref={(c) => { this.countdown = c }} onComplete={this.handleEnd}>
                <CountdownOverlay />
              </Countdown>)
            : null }
        <TouchableHighlight onPress={this.handleClick}>
          <Text>Start Countdown</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.addTwoSeconds}>
          <Text>Add 30 Seconds</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    return (<TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={style}>
        {title}
      </Text>
    </TouchableHighlight>);
  }

  _pause() {
    if (this.state.recording)
      AudioRecorder.pauseRecording();
    else if (this.state.playing) {
      AudioRecorder.pausePlaying();
    }
  }

  _stop() {
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({stoppedRecording: true, recording: false});
    } else if (this.state.playing) {
      AudioRecorder.stopPlaying();
      this.setState({playing: false, stoppedPlaying: true});
    }
    this.setState({countdownStarted: false});
  }

  _record() {
    AudioRecorder.startRecording();
    this.setState({recording: true, playing: false});
    this.handleClick();
  }

 _play() {
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    AudioRecorder.playRecording();
    this.setState({playing: true});
  }
};

class CameraPage extends React.Component{
  navSecond(){
    this.props.navigator.push({
      id: 'third'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>Continue</Text>
        </TouchableHighlight>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          keyboardType="numeric"
        />
      </View>
    );
  }
}

class Foo extends React.Component {
  state = {
    showMsg: false
  };

  componentWillUnmount() {
    timer.clearTimeout(this);
  }

  showMsg() {
    this.setState({showMsg: true}, () => timer.setTimeout(
      this, 'hideMsg', () => this.setState({showMsg: false}), 5000
    ));
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight onPress={() => requestAnimationFrame(() => this.showMsg())}>
          <Text>Press Me</Text>
        </TouchableHighlight>

        {this.state.showMsg ? (
          <Text>Hello!!</Text>
        ) : (
          null
        )}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  button: {
    height: 32,
    backgroundColor: '#CCCCCC',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

class CountdownOverlay extends React.Component {
  render() {
    return(
      <View style={{flex: 1}}>
        <Text>{this.props.count}</Text>
      </View>
    )
  }
}


class CountdownTestApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addTwoSeconds = this.addTwoSeconds.bind(this);
    this.state = {
      countdownStarted: false
    };
  }

  handleEnd() {
    this.setState({countdownStarted: false});
  }

  handleClick() {
    this.setState({countdownStarted: true});
  }

  addTwoSeconds () {
    if (this.countdown) {
      this.countdown.addTime(2)
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        { this.state.countdownStarted
            ? (<Countdown ref={(c) => { this.countdown = c }} onComplete={this.handleEnd}>
                <CountdownOverlay />
              </Countdown>)
            : null }
        <TouchableHighlight onPress={this.handleClick}>
          <Text>Start Countdown</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.addTwoSeconds}>
          <Text>Add 2 Seconds</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('MSP', () => MSP);
