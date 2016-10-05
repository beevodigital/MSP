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
    var audioPath = AudioUtils.DocumentDirectoryPath + '/' + this.props.phoneNumber + '-' + (new Date).getTime() +'-audio.caf';
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
      <View style={styles.container}>
        <View style={styles.recordingContainer}>
          <View style={styles.recordingIcon}/>
          <Text style={styles.recordingText}>
            RECORDING
          </Text>
        </View>
        <View>
          <Image source={require('./img/recordWaves.png')}  style={styles.recordWaves}/>
        </View>

        <View style={styles.recordingCTA}>
          <View style={styles.recordingStop}>
            {this._renderButton("Press To Stop", () => {this._stop()},styles.stopText )}
          </View>

          <View>
          { this.state.countdownStarted
              ? (<Countdown ref={(c) => { this.countdown = c }} onComplete={this.handleEnd} count={300}>
                  <CountdownOverlay countdownText={styles.recordText}/>
                </Countdown>)
              : null }
          </View>
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
    //flex: 1,
    flex: 1,
    //flexDirection:'row',
    backgroundColor: '#3f85fc',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  recordingContainer:{
    //height:50,
    //marginTop:50
  },
  recordWaves:{
    width:1091,
    height:482
  },
  recordingIcon:{
      borderColor:'#ff0000',
      borderWidth:2,
      borderRadius:180/2,
      width:20,
      height:20,
      backgroundColor:'#ff0000',
      justifyContent:'center',
      padding:5,
      marginTop:25
  },
  recordingText:{
    //borderColor:'#FF0000',
    color:'#ffffff',
    //borderWidth:6,
    fontSize:30,
    fontWeight:'bold',
    marginTop:20,
    //marginBottom:100
    //paddingTop:15,
    //paddingBottom:15,
    //paddingRight:50,
    //paddingLeft:50

  },
  recordingCTA:{
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width:1020
  },
  recordingStop:{
    width:480
    //borderColor:'#009900',
    //borderWidth:6,
    //width:260,
    //height:260,
    //borderRadius: 260/2,
    //paddingTop:90,
    //marginTop:150
  },
  stopText:{
    //textAlign:'left',
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:25
  },

  audioContainer:{
    //backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop:200
  },




  recordText:{
    //textAlign:'center',
    color:'#ffffff',
    fontWeight:'bold',
    //marginTop:150,
    fontSize:25,
    //backgroundColor:'#FFF000',
    //marginLeft:15,
    //marginRight:15
    //width:50
  },
  recordTextContainer:{
    //width:50
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
