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
var CountdownOverlay = require('./CountdownOverlay');

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
        <View style={styles.pictureBanner}>

        </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          type="front"
          orientation={Camera.constants.Orientation.landscapeRight}
          aspect={Camera.constants.Aspect.fit}
          phoneNumber={this.props.phoneNumber}
          captureTarget={Camera.constants.CaptureTarget.disk}>

          <View style={styles.takingPicturesCTA}>
            <Text style={styles.takingPicureText}>Get Ready!</Text>
            { this.state.countdownStarted
                ? (<Countdown ref={(c) => { this.countdown = c }} onComplete={this.handleEnd} count={3}>
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

  navAway(){
    console.log('nav away');
    this.props.navigator.push({
      id: 'thankyoupage'
    })
  }

  takePicture() {

    (function myLoop (thisPass,i) {
       setTimeout(function () {
         console.log('taking picture');
         thisPass.camera.capture()
             .then((data) => console.log(data))
             .catch(err => console.error(err));

          if(i < 2)
          {
            console.log('under 2');
            thisPass.navAway();
          }
                  //  your code here
          if (--i) myLoop(thisPass,i);      //  decrement i and call myLoop again if i > 0
       }, 1000)
    })(this,5);


      }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection:'row'
    //backgroundColor: '#C9C9C9',
  },
  pictureBanner:{
    backgroundColor:'#3f85fc',
    height:150
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
  },
  takingPicturesCTA:{
    //borderColor:'#009900',
    //borderWidth:6,
    width:260,
    height:260,
    //borderRadius: 260/2,
    paddingTop:85,
    marginBottom:50
  },
  takingPicureText:{
    textAlign:'center',
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:40,
    //backgroundColor:'#FFF000',
    marginLeft:15,
    marginRight:15
    //width:50
  },
  takingPictureCountdownText:{
    textAlign:'center',
    color:'#ffffff',
    fontWeight:'bold',
    fontSize:30,
    //backgroundColor:'#FFF000',
    marginLeft:15,
    marginRight:15
    //width:50
  },


});

module.exports = TakePictures;
