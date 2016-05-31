/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  TouchableHighlight,
  DeviceEventEmitter,
  ActivityIndicatorIOS,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Camera from 'react-native-camera';

var {AudioRecorder, AudioUtils} = require('react-native-audio');
var RNUploader = require('NativeModules').RNUploader;

class MSP extends Component {
  constructor(props) {

    super(props);
    this.state = {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false,
      uploading: false,
      showUploadModal: false,
      uploadProgress: 0,
      uploadTotal: 0,
      uploadWritten: 0,
      uploadStatus: undefined,
      cancelled: false,
      images: [],
    }
  }

  componentDidMount() {
    var d = new Date();
    var n = d.getSeconds();
    var audioPath = AudioUtils.DocumentDirectoryPath + '/' + n + 'test.caf';
    AudioRecorder.prepareRecordingAtPath(audioPath);
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log(`Finished recording: ${data.finished}`);
    };

    DeviceEventEmitter.addListener('RNUploaderProgress', (data)=>{
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;
      this.setState( { uploadProgress: progress, uploadTotal: bytesTotal, uploadWritten: bytesWritten } );
    });
  }

  _addImage(){
    const fetchParams = {
        first: 5,
    };

    CameraRoll.getPhotos( fetchParams, (data)=>{
      const assets = data.edges;
      const index = parseInt( Math.random() * ( assets.length ) );
      const randomImage = assets[ index ];

      let images = this.state.images;
      images.push( randomImage.node.image );

      this.setState( { images: images } );
    },
    (err)=>{
      console.log(err);
    });
  }

  _closeUploadModal(){
    this.setState( { showUploadModal: false, uploadProgress: 0, uploadTotal: 0, uploadWritten: 0, images: [], cancelled: false, } );
  }

  _cancelUpload(){
    RNUploader.cancel();
    this.setState( { uploading: false, cancelled: true } );
  }

  _uploadImages(){
    let files = this.state.images.map( (f)=>{
      return {
        name: 'file',
        filename: _generateUUID + '.png',
        filepath: f.uri,
        filetype: 'image/png',
      }
    });

    let opts = {
      url: 'https://posttestserver.com/post.php',
      files: files,
      params: { name: 'test-app' }
    };

    this.setState({ uploading: true, showUploadModal: true, });
    RNUploader.upload( opts, ( err, res )=>{
      if( err ){
          console.log(err);
          return;
      }

      let status = res.status;
      let responseString = res.data;

      console.log('upload complete with status ' + status);
      console.log( responseString );
      this.setState( { uploading: false, uploadStatus: status } );
    });

  }

  uploadProgressModal(){
    let uploadProgress;

    if( this.state.cancelled ){
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload Cancelled
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }else if( !this.state.uploading && this.state.uploadStatus ){
      uploadProgress = (
        <View style={{ margin: 5, alignItems: 'center', }}>
          <Text style={{ marginBottom: 10, }}>
            Upload complete with status: { this.state.uploadStatus }
          </Text>
          <TouchableOpacity style={ styles.button } onPress={ this._closeUploadModal.bind(this) }>
            <Text>{ this.state.uploading ? '' : 'Close' }</Text>
          </TouchableOpacity>
        </View>
      );
    }else if( this.state.uploading ){
      uploadProgress = (
        <View style={{ alignItems: 'center',  }}>
          <Text style={ styles.title }>Uploading { this.state.images.length } Image{ this.state.images.length == 1 ? '' : 's' }</Text>
          <ActivityIndicatorIOS
            animating={this.state.animating}
            style={[styles.centering, {height: 80}]}
            size="large" />
          <Text>{ this.state.uploadProgress.toFixed(0) }%</Text>
          <Text style={{ fontSize: 11, color: 'gray', marginTop: 5, }}>
            { ( this.state.uploadWritten / 1024 ).toFixed(0) }/{ ( this.state.uploadTotal / 1024 ).toFixed(0) } KB
          </Text>
          <TouchableOpacity style={ [styles.button, {marginTop: 5}] } onPress={ this._cancelUpload.bind(this) }>
            <Text>{ 'Cancel' }</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return uploadProgress;
  }

  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    return (<TouchableHighlight style={styles.button} onPress={onPress}>
      <Text style={style}>
        {title}
      </Text>
    </TouchableHighlight>);
  }

  _pause() {
    if (this.state.recording)
      AudioRecorder.pauseRecording();
    else if (this.state.playing) {
      AudioRecorder.pausePlaying();
    }
  }

  _stop() {
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({stoppedRecording: true, recording: false});
    } else if (this.state.playing) {
      AudioRecorder.stopPlaying();
      this.setState({playing: false, stoppedPlaying: true});
    }
  }

  _record() {
    AudioRecorder.startRecording();
    this.setState({recording: true, playing: false});
  }

 _play() {
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    AudioRecorder.playRecording();
    this.setState({playing: true});
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={ styles.title }>
        react-native-uploader example
      </Text>

      <Modal
        animated={false}
        transparent={false}
        visible={ this.state.showUploadModal }>

        <View style={ styles.modal }>
          { this.uploadProgressModal() }
        </View>

      </Modal>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
        <TouchableOpacity style={ styles.button } onPress={ this._addImage.bind( this ) }>
          <Text>Add Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.button } onPress={ this._uploadImages.bind( this ) }>
          <Text>Upload</Text>
        </TouchableOpacity>

      </View>

      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', }}>
        { this.state.images.map( (image)=>{
          return <Image key={ _generateUUID() } source={{ uri: image.uri }} style={ styles.thumbnail } />
        })}
      </View>

        <View style={styles.controls}>
        {this._renderButton("RECORD", () => {this._record()}, this.state.recording )}
          {this._renderButton("STOP", () => {this._stop()} )}
          {this._renderButton("PAUSE", () => {this._pause()} )}
          {this._renderButton("PLAY", () => {this._play()}, this.state.playing )}
          <Text style={styles.progressText}>{this.state.currentTime}s</Text>
        </View>

        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.still}
          captureTarget={Camera.constants.CaptureTarget.disk}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>



    );
  }

  componentDidMount() {
    var d = new Date();
    var n = d.getSeconds();
    var audioPath = AudioUtils.DocumentDirectoryPath + '/' + n + 'test.caf';
    AudioRecorder.prepareRecordingAtPath(audioPath);
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log(`Finished recording: ${data.finished}`);
    };
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

}



function _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MSP', () => MSP);
