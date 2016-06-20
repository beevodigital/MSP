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

class SplashPage extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      phoneNumber: ''
    }
  }

  navSecond(){
    console.log(this.state.phoneNumber);

    //we need to check if the phone number is valid
    console.log(this.state.phoneNumber.length);
    if(this.state.phoneNumber.length < 10)
    {
      //too short
      console.log('phone number too short');
      this._phoneNumber.setNativeProps({style: styles.phoneNumberError});
    }
    else {
      this.props.navigator.push({
        id: 'audiorecord',
        passProps: {
              phoneNumber: this.state.phoneNumber
          }
      })
    }
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
                  ref={component => this._phoneNumber = component}
                  style={styles.phonenumber}
                  keyboardType="numeric"
                  placeholder="Phone Number"
                  onChangeText={phoneNumber => this.setState({phoneNumber})}
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

var styles = StyleSheet.create({
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
  phoneNumberError:{
    borderColor:'#FF0000',
    borderWidth:2
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
  }
});

module.exports = SplashPage;
