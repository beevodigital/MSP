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

class CountdownOverlay extends React.Component {
  render() {
    return(
      <View>
        <Text style={this.props.countdownText}>{this.props.count}</Text>
      </View>
    )
  }
}

module.exports = CountdownOverlay;
