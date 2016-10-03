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

            <View style={styles.columnRight, styles.whitebackground}>
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
                  placeholder="Enter Phone Number and Press Return"
                  placeholderTextColor="#666666"
                  onChangeText={phoneNumber => this.setState({phoneNumber})}
                  onSubmitEditing={this.navSecond.bind(this)}
                  />

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

//<TouchableHighlight onPress={this.navSecond.bind(this)} style={styles.recordButtonContainer}>
//  <Text style={styles.recordButton}>Start Recording</Text>
//</TouchableHighlight>

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row'
    //backgroundColor: '#C9C9C9',
  },
  mainFont:{
    fontSize:30,
    textAlign:'center'
  },
  whitebackground:{
    backgroundColor: 'rgba(255,255,255,0.9)',
    height:740,
    margin:10,
    padding:10,
    marginTop:20
  },
  halfcolumncontainer:{
    //flexDirection:'row',
    alignItems: 'flex-end'
  },
  wrapText:{
    flexDirection:'column',
    width:600
  },
  columnRight:{
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row'
  },
  phonenumberContainer:{
    //flex:1,
    backgroundColor:'#CCCCCC',
    width:500,
    padding:25,
    margin:25,
    fontSize:20
  },
  phonenumber: {
    width:600,
    height:70,
    borderColor: '#000000',
    borderWidth: 2,
    marginTop:40,
    marginBottom:40,
    padding:5,
    color:'#666666',
    fontSize:30
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
module.exports = SplashPage;
