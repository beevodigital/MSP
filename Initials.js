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

class Initials extends React.Component{
  constructor(props) {
    super(props)
  }

  navSecond(){
    this.props.navigator.push({
        id: 'audiorecord'
      })

  }

  render() {
    return (
      <TouchableHighlight style={styles.container}>
        <View style={styles.containerWidth}>
          <View >
            <Image source={require('./img/blueArrow.png')}  style={styles.splashIcons}/>
          </View>
          <View style={styles.initialsContainer}>
            <Image source={require('./img/InitialsX.png')}  style={styles.InitalsX}/>
            <TextInput
              ref={component => this._phoneNumber = component}
              style={styles.phonenumber}
              placeholder=""
              placeholderTextColor="#ffffff"
              onChangeText={phoneNumber => this.setState({phoneNumber})}
              />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.clearSignature}>
              <Text style={styles.clearSignatureText}>Clear Signature</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.agree}>
              <Text style={styles.agreeText}>I Agree</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

//<TouchableHighlight onPress={this.navSecond.bind(this)} style={styles.recordButtonContainer}>
//  <Text style={styles.recordButton}>Start Recording</Text>
//</TouchableHighlight>

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:25,
    backgroundColor:'#3f85fc'
    //flexDirection:'row'
    //backgroundColor: '#C9C9C9',
  },
  initialsContainer:{
    borderBottomColor:'#ffffff',
    borderBottomWidth:4,
    marginTop:200,
    flexDirection:'row'
  },
  InitalsX:{
    width:30,
    height:30,
    marginTop:20,
    marginRight:20
  },
  phonenumber: {
    width:600,
    height:70,
    fontFamily:'Chalkduster',
    //borderColor: '#000000',
    //borderWidth: 2,
    //marginTop:40,
    //marginBottom:40,
    //padding:5,
    color:'#ffffff',
    fontSize:60
  },
  buttonContainer:{
    marginTop:50,
    flexDirection:'row'
  },
  clearSignature:{
    width:400,
    height:60,
    borderColor:'#ffffff',
    borderWidth:5
  },
  clearSignatureText:{
    fontSize:30,
    color:'#ffffff',
    textAlign:'center'
  },
  agree:{
    width:400,
    height:60,
    backgroundColor:'#ffffff',
    marginLeft:20
  },
  agreeText:{
    fontSize:30,
    color:'#ffffff',
    textAlign:'center',
    color:'#3f85fc'
  },
  flexRow:{
    flexDirection:'row'
  },
  containerWidth:{
    width:800
  },
  splashIcons:{
    width:164,
    height:167
  },
  legalText:{
    fontSize:12,
    color:'#3f85fc'
  },

  phoneNumberError:{
    borderColor:'#FF0000',
    borderWidth:3
  },
  image: {
    width: 100,
    height: 100,
  },
  backgroundImage:{
    flex:1,
    resizeMode:'stretch'
  },

});
module.exports = Initials;
