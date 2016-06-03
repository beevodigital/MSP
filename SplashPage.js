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
