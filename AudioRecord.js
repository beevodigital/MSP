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

import Countdown from "./Countdown";
var {AudioRecorder, AudioUtils} = require('react-native-audio');
var CountdownOverlay = require('./CountdownOverlay');

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
    console.log(this.props.phoneNumber);

    var d = new Date();
    var n = d.getSeconds();
    var audioPath = AudioUtils.DocumentDirectoryPath + '/' + this.props.phoneNumber + '/' + 'audio.caf';
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
      <View style={styles.container, styles.audioContainer}>
        <View style={styles.recordingContainer}>
          <Text style={styles.recordingText}>
            RECORDING
          </Text>
        </View>
        <View style={styles.recordingCTA}>
          {this._renderButton("PRESS TO STOP", () => {this._stop()},styles.stopText )}


        </View>
        <View>
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
      id: 'takepictures',
      passProps: {
            phoneNumber: this.props.phoneNumber
        }
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

var styles = StyleSheet.create({
  //audioRecord styles
  container: {
    flex: 1,
    flexDirection:'row'
    //backgroundColor: '#C9C9C9',
  },
  audioContainer:{
    backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop:200
  },
  recordingText:{
    borderColor:'#FF0000',
    color:'#FF0000',
    borderWidth:6,
    fontSize:60,
    fontWeight:'bold',
    paddingTop:15,
    paddingBottom:15,
    paddingRight:50,
    paddingLeft:50

  },
  recordingContainer:{
    paddingTop:20
  },

  recordingCTA:{
    borderColor:'#009900',
    borderWidth:6,
    width:260,
    height:260,
    borderRadius: 260/2,
    paddingTop:90,
    marginTop:150
  },
  recordText:{
    textAlign:'center',
    color:'#000000',
    fontWeight:'bold',
    marginTop:150,
    fontSize:40,
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
    color:'#009900',
    fontWeight:'bold',
    fontSize:40
  },
  recordingSubHead:{
    textAlign:'center',
    color:'#FF0000',
    fontWeight:'bold',
    //backgroundColor:'#FFF000',
    marginLeft:15,
    marginRight:15
    //width:50
  },
  //end of record styles


});

module.exports = AudioRecord;
