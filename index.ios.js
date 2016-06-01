'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  AppRegistry,
  AlertIOS,
  Navigator,
  NavigatorIOS,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  TextInput,
} = ReactNative;

import Camera from 'react-native-camera';
import Countdown from "./Countdown";

var {AudioRecorder, AudioUtils} = require('react-native-audio');
const timer = require('react-native-timer');

class MSP extends React.Component{
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'splashpage', index: 0}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

  navigatorRenderScene(route, navigator) {
    var _navigator = navigator;
    switch (route.id) {
      case 'splashpage':
        return (<SplashPage navigator={navigator} title="Splash Page"/>);
      case 'audiorecord':
        return (<AudioRecord navigator={navigator} title="Audio Record"/>);
      case 'takepictures':
        return (<TakePictures navigator={navigator} title="Take Pictures"/>);
    }
  }
}

class SplashPage extends React.Component{
  navSecond(){
    this.props.navigator.push({
      id: 'audiorecord'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/see28.jpg')} style={styles.backgroundImage} >
          <View style={styles.halfcolumncontainer}>
            <View style={styles.halfcolumn}>
              <Text></Text>
            </View>
            <View style={styles.halfcolumn, styles.whitebackground}>
              <View style={styles.wrapText}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate veli
                </Text>
              </View>
              <TextInput
                style={styles.phonenumber}
                keyboardType="numeric"
                />
              <TouchableHighlight onPress={this.navSecond.bind(this)}>
                <Text>Continue</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Image>

      </View>
    );
  }
}

class AudioRecord extends React.Component{
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
    //stop the audio
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

    //todo: we should move them to takePictures
    this.props.navigator.push({
      id: 'takepictures'
    })
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

class TakePictures extends React.Component{
  navSecond(){
    this.props.navigator.push({
      id: 'third'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type="front"
          orientation="auto"
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePictureTimer(){
    for (var i = 0; i < 5; i++) {
      var pictureTimer = setTimeout(this.takePicture(this.camera) , 1000)
      this.takePicture();
    }
  }

  takePicture() {
    this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
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
    flexDirection:'row'
    //backgroundColor: '#C9C9C9',
  },
  backgroundImage:{
    flex:1,
    resizeMode:'stretch'
  },
  whitebackground:{
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  halfcolumncontainer:{
    flexDirection:'row'
  },
  wrapText:{
    flexDirection:'column',
    width:200
  },
  halfcolumn:{
    width:200,
    flexWrap:'wrap',
    flexDirection:'row'
  },
  phonenumberContainer:{
    //flex:1,
    backgroundColor:'#CCCCCC',
    width:500,
    padding:25,
    margin:25
  },
  phonenumber: {
    width:200,
    height:50,
    borderColor: '#000000',
    borderWidth: 1,
    margin:25,
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
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
