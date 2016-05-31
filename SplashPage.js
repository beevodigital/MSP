const React = require('react');
const ReactNative = require('react-native');

class SplashPage extends React.Component{
  navSecond(){
    this.props.navigator.push({
      id: 'second'
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>This is the splash page</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
