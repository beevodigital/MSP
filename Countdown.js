var React = require('react')
const ReactNative = require('react-native');

var Countdown = React.createClass({
  interval: undefined,

  getInitialState: function () {
    return {
      count: this.props.count
    }
  },

  addTime: function (seconds) {
    this.stopCountdown()
    this.setState({ count: this.state.count + seconds })
    this.startCountdown()
  },

  startCountdown: function () {
    this.interval = setInterval(function () {
      let count = this.state.count - 1
      if (count === 0) {
        this.stopCountdown()
        this.props.onComplete()
      } else {
        this.setState({count})
      }
    }.bind(this), 1000)
  },

  stopCountdown: function () {
    clearInterval(this.interval)
  },

  componentDidMount: function () {
    this.startCountdown()
  },

  componentWillUnmount: function () {
    clearInterval(this.interval)
  },

  formatSeconds:function(){
    var minutes = "";
    var seconds = this.state.count % 60;

    if((parseInt( this.state.count / 60 ) % 60) > 0)
    {
      minutes = parseInt( this.state.count / 60 ) % 60 + ":";
    }

    if(this.state.count % 60 < 10)
    {
      seconds = "0" + (this.state.count % 60);
    }

    return minutes + seconds;
  },

  render: function () {
    if (!this.props.children) {
      throw new Error("No child supplied to <Countdown>!")
    }
    return React.cloneElement(this.props.children, {
      count: this.formatSeconds()
      //count: (parseInt( this.state.count / 60 ) % 60) + ':' + (this.state.count % 60)
    })
  }
})

Countdown.defaultProps = {
  count: 15,
  onComplete: function () {}
}

Countdown.propTypes = {
  count: React.PropTypes.number,
  onComplete: React.PropTypes.func
}

module.exports = Countdown
