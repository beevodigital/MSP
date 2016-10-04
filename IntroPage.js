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

class IntroPage extends React.Component{
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
    if(this.state.phoneNumber.length < 0)
    {
      //too short
      console.log('phone number too short');
      this._phoneNumber.setNativeProps({style: styles.phoneNumberError});
    }
    else {
      this.props.navigator.push({
        id: 'finalinstructionspage',
        passProps: {
              phoneNumber: this.state.phoneNumber
          }
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>

            <View >
              <Image source={require('./img/IntroIcons.png')}  style={styles.mainIcons}/>
            </View>
            <View>
              <Text style={styles.boldHeadline}>
                Welcome
              </Text>
              <Text style={styles.lightHeadline}>
                Bienvenido
              </Text>
            </View>
            <View>
              <Text style={styles.subHead}>to the Arts@MSP Story Booth!</Text>
            </View>
            <View style={styles.flexRow}>
              <Image source={require('./img/takeOffIcon.png')}  style={styles.takeOffIcon}/>
              <Text style={styles.CTAtext}>
                Tell us where you're headed
              </Text>
            </View>
            <View style={styles.flexRow}>
              <Image source={require('./img/landingIcon.png')}  style={styles.landingIcon}/>
              <Text style={styles.CTAtext}>
                What's waiting for you when you land?
              </Text>
            </View>

        </View>

        <View style={styles.rightColumn}>
          <View style={styles.wrapText}>
            <Image source={require('./img/enterPhoneArrow.png')} style={styles.enterPhoneArrow}/>
            <Text style={styles.enterPhoneText}>
              Enter Your Phone Number + Tap Return
            </Text>
            <View style={styles.phonenumberContainer}>
              <Image source={require('./img/phoneIcon.png')} style={styles.phoneIcon}/>
              <TextInput
                ref={component => this._phoneNumber = component}
                style={styles.phonenumber}
                keyboardType="numeric"
                placeholder="XXX-XXX-XXXX"
                placeholderTextColor="#ffffff"
                onChangeText={phoneNumber => this.setState({phoneNumber})}
                onSubmitEditing={this.navSecond.bind(this)}
                />
              </View>
            </View>

        </View>


      </View>
    );
  }
}

//<TouchableHighlight onPress={this.navSecond.bind(this)} style={styles.recordButtonContainer}>
//  <Text style={styles.recordButton}>Start Recording</Text>
//</TouchableHighlight>

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor:'#3f85fc',
    padding:25
    //backgroundColor: '#C9C9C9',
  },
  flexRow:{
    flexDirection:'row'
  },
  leftColumn:{
    //flexDirection:'row',
    //alignItems: 'flex-end',
    width:600
  },
  mainIcons:{
    width:411,
    height:182
  },
  boldHeadline:{
    fontSize:120,
    fontWeight:'bold',
    color:'#ffffff'
  },
  lightHeadline:{
    fontSize:120,
    color:'#ffffff'
  },
  subHead:{
    fontSize:40,
    color:'#ffffff'
  },
  takeOffIcon:{
    width:53,
    height:53
  },
  landingIcon:{
    width:53,
    height:53
  },
  CTAtext:{
    color:'#ffffff',
    paddingTop:15,
    fontSize:20
  },
  rightColumn:{
    width:350
  },
  whitebackground:{
    backgroundColor: '#ffffff',
    height:740,
    //margin:10,
    //padding:10,
    //marginTop:20
  },
  enterPhoneArrow:{
    width:120,
    height:120,
    marginTop:100,
    marginLeft:25,
    marginBottom:10
  },
  enterPhoneText:{
    fontSize:30,
    color:'#3f85fc',
    marginLeft:25,
    fontWeight:'bold'
  },
  mainFont:{
    fontSize:30,
    textAlign:'center'
  },


  wrapText:{
    backgroundColor: 'rgba(255,255,255,0.9)'
    //flexDirection:'column',
    //width:600
  },

  phonenumberContainer:{
    //flex:1,
    backgroundColor:'#3f85fc',
    flexDirection:'row',
    //width:500,
    padding:5,
    margin:25,
  },
  phoneIcon:{
    width:15,
    height:33
  },
  phonenumber: {
    width:150,
    height:20,
    fontWeight:'bold',
    marginTop:5,
    marginLeft:20,
    fontSize:20,

    //borderColor: '#000000',
    //borderWidth: 2,
    //marginTop:40,
    //marginBottom:40,
    //padding:5,
    color:'#ffffff',
    //fontSize:30
  },
  phoneNumberError:{
    borderColor:'#FF0000',
    borderWidth:3
  },
  image: {
    //width: 100,
    height: 100,
  },
  backgroundImage:{
    //flex:1,
    //resizeMode:'stretch'
  },

});
module.exports = IntroPage;
