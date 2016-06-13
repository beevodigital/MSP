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
      case 'thankyoupage':
        return (<ThankYouPage navigator={navigator} title="Thank You"/>);
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
                <Text style={styles.mainFont}>
                  Welcome to arts@msp's storyBooth, part of the see18 (multimedia|story|performance) installation.{"\n"}{"\n"}
                </Text>
                <Text style={styles.mainFont}>
                  This space provides you the opportunity to record a 5 minute recollection of travel
                </Text>
                <TextInput
                  style={styles.phonenumber}
                  keyboardType="numeric"
                  placeholder="111-222-3333"
                  />
                <TouchableHighlight onPress={this.navSecond.bind(this)} style={styles.recordButtonContainer}>
                  <Text style={styles.recordButton}>Start Recording</Text>
                </TouchableHighlight>
                <Text style={styles.mainFont}>
                  By leaving your story, arts@msp will retain the rights to curate your images and stories in future exhibits and for promotional purposes
                </Text>
              </View>

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
    console.log(audioPath);
    AudioRecorder.prepareRecordingAtPath(audioPath);
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log(`Finished recording: ${data.finished}`);
    };

    //start recording onLoad
    //turning this off for testing
    this._record();
  }

  handleEnd() {
    this.setState({countdownStarted: false});
    //stop the audio
    console.log('testing');
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
      <View style={styles.container, styles.recordingContainer}>
        <View style={styles.recordingCTA}>

          {this._renderButton("STOP", () => {this._stop()},styles.stopText )}

          { this.state.countdownStarted
              ? (<Countdown ref={(c) => { this.countdown = c }} onComplete={this.handleEnd} count={300}>
                  <CountdownOverlay countdownText={styles.recordText}/>
                </Countdown>)
              : null }
        </View>
      </View>
    );
  }

/*

{this._renderButton("BEGIN", () => {this._record()}, this.state.recording )}

<TouchableHighlight onPress={this.handleClick}>
  <Text>Start Countdown</Text>
</TouchableHighlight>
<TouchableHighlight onPress={this.addTwoSeconds}>
  <Text>Add 30 Seconds</Text>
</TouchableHighlight>

{this._renderButton(this.state.currentTime, () => {this._stop()} )}

*/

_renderButton(title, onPress, stylePass) {
    var style = styles.recordText;

    return (<TouchableHighlight onPress={onPress}>
      <Text style={style, stylePass}>
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

class CountdownOverlay extends React.Component {
  render() {
    return(
      <View>
        <Text style={this.props.countdownText}>{this.props.count}</Text>
      </View>
    )
  }
}

class TakePictures extends React.Component{
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
      this.handleClick();
  }

  navSecond(){
    this.props.navigator.push({
      id: 'third'
    })
  }

  handleEnd() {
    this.setState({countdownStarted: false});
    //stop the audio
    console.log('testing');
    this.takePicture();
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
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type="front"
          orientation={Camera.constants.Orientation.auto}
          aspect={Camera.constants.Aspect.fit}
          captureTarget={Camera.constants.CaptureTarget.disk}>

          <View style={styles.takingPicturesCTA}>
            <Text style={styles.takingPicureText}>Get Ready! Smile!</Text>
            { this.state.countdownStarted
                ? (<Countdown ref={(c) => { this.countdown = c }} onComplete={this.handleEnd} count={15}>
                    <CountdownOverlay countdownText={styles.takingPictureCountdownText}/>
                  </Countdown>)
                : null }
          </View>
        </Camera>
      </View>
    );
  }
//<Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
  takePictureTimer(){
    for (var i = 0; i < 5; i++) {
      var pictureTimer = setTimeout(this.takePicture(this.camera) , 1000)
      this.takePicture();
    }
  }

  takePicture() {
    console.log('taking picture');
    this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));
    this.camera.capture()
        .then((data) => console.log(data))
        .catch(err => console.error(err));

    this.props.navigator.push({
      id: 'splashpage'
    })

      }

}

class ThankYouPage extends React.Component{
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
                <Text style={styles.mainFont}>
                  THANKS!{"\n"}{"\n"}
                </Text>
                <Text style={styles.mainFont}>
                  THANKS
                </Text>


                <Text style={styles.mainFont}>
                  By leaving your story, arts@msp will retain the rights to curate your images and stories in future exhibits and for promotional purposes
                </Text>
              </View>

            </View>
          </View>
        </Image>

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
  //audioRecord styles
  recordingContainer:{
    backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:50
  },
  recordingCTA:{
    borderColor:'#FF0000',
    borderWidth:4,
    width:200,
    height:200,
    borderRadius: 200/2,
    paddingTop:75
  },
  recordText:{
    textAlign:'center',
    color:'#FF0000',
    fontWeight:'bold',
    //backgroundColor:'#FFF000',
    marginLeft:15,
    marginRight:15
    //width:50
  },
  recordTextContainer:{
    //width:50
  },
  stopText:{
    textAlign:'center',
    color:'#FF0000',
    fontWeight:'bold',
    fontSize:40
  },

  //end of record styles

  //take picture styles
  takingPicturesCTA:{
    borderColor:'#00ff00',
    borderWidth:4,
    width:200,
    height:200,
    borderRadius: 200/2,
    paddingTop:75
  },
  takingPicureText:{
    textAlign:'center',
    color:'#00ff00',
    fontWeight:'bold',
    //backgroundColor:'#FFF000',
    marginLeft:15,
    marginRight:15
    //width:50
  },
  takingPictureCountdownText:{
    textAlign:'center',
    color:'#00ff00',
    fontWeight:'bold',
    //backgroundColor:'#FFF000',
    marginLeft:15,
    marginRight:15
    //width:50
  },

  //end of take picture styles`

  container: {
    flex: 1,
    flexDirection:'row'
    //backgroundColor: '#C9C9C9',
  },
  makeWhite:{
    backgroundColor:'#FFFFFF'
  },
  mainFont:{
    fontSize:10,
    textAlign:'center'
  },
  backgroundImage:{
    flex:1,
    resizeMode:'stretch'
  },
  whitebackground:{
    backgroundColor: 'rgba(255,255,255,0.9)',
    height:300,
    margin:10,
    padding:10
  },
  halfcolumncontainer:{
    flexDirection:'row'
  },
  wrapText:{
    flexDirection:'column',
    width:200
  },
  halfcolumn:{
    flex:1,
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
    height:25,
    borderColor: '#000000',
    borderWidth: 1,
    marginTop:20,
    marginBottom:20,
    padding:5
  },
  recordButtonContainer:{
    borderColor:'#FF0000',
    borderWidth:2,
    marginBottom:20
  },
  recordButton:{
    textAlign:'center',
    color:'#FF0000',
    padding:5
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
