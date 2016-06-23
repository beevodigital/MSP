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
var CountdownOverlay = require('./CountdownOverlay');

class ThankYouPage extends React.Component{
  constructor(props) {

    super(props);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({countdownStarted: true});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/see28.jpg')} style={styles.backgroundImage} >
          <View style={styles.halfcolumncontainer}>
            <View style={styles.halfcolumn}>
            { this.state.countdownStarted
                ? (<Countdown style="display:none" ref={(c) => { this.countdown = c }} onComplete={this.handleEnd} count={5}>
                    <CountdownOverlay countdownText={styles.takingPictureCountdownText}/>
                  </Countdown>)
                : null }
            </View>
            <View style={styles.halfcolumn, styles.whitebackground}>
              <View style={styles.wrapText}>
                <Text style={styles.mainFont}>
                  Thank you for recording your story!{"\n"}{"\n"}
                </Text>
                <Text style={styles.mainFont}>
                  arts@msp will be forwarding your images in the coming week and will notify you if and when your story and image are curated for the program.  If you would like to leave another story, the main page will return in 30 seconds. Travel safely!{"\n"}{"\n"}
                </Text>


                <Text style={styles.mainFont}>
                  By leaving your story, arts@msp will retain the rights to curate your images and stories in future exhibits and for promotional purposes{"\n"}{"\n"}
                </Text>
              </View>

            </View>


          </View>
        </Image>

      </View>
    );
  }

  //handle timer events
  handleEnd() {
    this.setState({countdownStarted: false});
    this.props.navigator.push({
      id: 'splashpage'
    })
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
    fontSize:20,
    textAlign:'center'
  },
  backgroundImage:{
    flex:1,
    resizeMode:'stretch'
  },
  whitebackground:{
    backgroundColor: 'rgba(255,255,255,0.9)',
    height:750,
    margin:10,
    padding:10
  },
  halfcolumncontainer:{
    flexDirection:'row'
  },
  wrapText:{
    flexDirection:'column',
    width:400
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

module.exports = ThankYouPage;
