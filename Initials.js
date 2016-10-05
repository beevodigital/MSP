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

    this.state = {
      initials: ''
    }
  }

  clearSignature(){
    console.log('clearSignature');
    this._initials.setNativeProps({text: ""});
    this.state.initials = "";
  }

  navSecond(){
    if(this.state.initials.length < 2)
    {
      //too short
      console.log('initials too short');
      this._initialsContainer.setNativeProps({style: styles.initialsError});
    }
    else {
      this.props.navigator.push({
        id: 'audiorecord',
        passProps: {
              initials: this.state.initials
          }
      })
    }

  }

  render() {
    return (
      <TouchableHighlight style={styles.container}>
        <View style={styles.containerWidth}>
          <View >
            <Image source={require('./img/blueArrow.png')}  style={styles.splashIcons}/>
          </View>
          <View style={styles.initialsContainer} ref={component => this._initialsContainer = component}>
            <Image source={require('./img/InitialsX.png')}  style={styles.InitalsX}/>
            <TextInput
              ref={component => this._initials = component}
              style={styles.phonenumber}
              placeholder=""
              placeholderTextColor="#ffffff"
              onChangeText={initials => this.setState({initials})}
              />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.clearSignature} onPress={this.clearSignature.bind(this)}>
              <Text style={styles.clearSignatureText}>Clear Signature</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.agree} onPress={this.navSecond.bind(this)}>
              <Text style={styles.agreeText}>I Agree</Text>
            </TouchableHighlight>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

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
  initialsError:{
    borderBottomColor:'#ff0000',
    borderBottomWidth:4
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
    fontFamily:'SavoyeLetPlain',
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
    width:460,
    height:60,
    borderColor:'#ffffff',
    borderWidth:5,
    paddingTop:5
  },
  clearSignatureText:{
    fontSize:30,
    color:'#ffffff',
    textAlign:'center'
  },
  agree:{
    width:460,
    height:60,
    backgroundColor:'#ffffff',
    marginLeft:50,
    paddingTop:9
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
    width:975
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
