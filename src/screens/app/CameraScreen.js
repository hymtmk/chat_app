import React, {useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View,StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {Icon,MaterialIcon,} from '../../components/Shared/Index'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import {moderateScale} from '../../res/style/scalingUnit'

const BIG_CIRCLE = moderateScale(85)
const SMALL_CIRCLE = moderateScale(75)

const CameraScreen = (props) => {

    const [cameraType,setCameraType] = useState('back')
    const [flashMode,setFlashMode] = useState(0)
  

    onCameraReverse = () => {
      if (cameraType === 'back') {
        setCameraType('front')
      } else {
        setCameraType('back')
      }
    }

    onFlashMode = () => {
      if (flashMode === 0) {
        setFlashMode(1)
      } else {
        setFlashMode(0)
      }
    }

    const uri = props.navigation.getParam('uri')

  
    takePicture = async() => {
      if (camera) {
        const options = { quality: 0.5, base64: true,fixOrientation: true };
        const data = await camera.takePictureAsync(options);
      
         props.navigation.navigate("PhotoPreviewScreen", {
          image: data.uri,
          profile : uri
        })
      }
    };
 
    return (
      <View style={styles.container}>
        { !props.showStatusBar && (
            <StatusBar showHideTransition="slide" backgroundColor="#000" animated={true} barStyle="dark-content" />
        )}
        <RNCamera
          ref={ref => {
            camera =ref
          }}
          style={styles.preview}
          type={cameraType}
          flashMode={flashMode}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={styles.cameraControll}>
          <MaterialIcon onPress={onFlashMode}  style={{padding:10}} name={ flashMode === 1 ? "flash" : "flash-off"} size={26} color={colors.white}/>
          <View style={styles.cameraClickContainer}>
          <TouchableOpacity style={styles.selectGalleryWrapper}>
           <MaterialIcon name="chevron-up"  color ={colors.white} size={26}/>
           <Icon name="photos" color={colors.white} size={20} />
          </TouchableOpacity>
          <TouchableOpacity  activeOpacity={.8} onPress={takePicture} style={styles.capture}>
           <View style={styles.circle}/>
          </TouchableOpacity>
          <Text style={styles.message}>Hold for video, tab for photo</Text>
          </View>
          <Icon name="camera-reverse" size={20} onPress={onCameraReverse} color={colors.white}/>
        </View>
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 5,
    margin: 20,
    width : BIG_CIRCLE,
    height : BIG_CIRCLE,
    borderRadius : BIG_CIRCLE/2,
    justifyContent : 'center',
    alignItems : 'center'
  },
  circle : {
    width : SMALL_CIRCLE,
    height : SMALL_CIRCLE,
    borderRadius : SMALL_CIRCLE/2,
    backgroundColor : '#FE3924'
  },
  cameraControll : {
      position : 'absolute',
      bottom : 40,
      flexDirection : 'row',
      flex : 1,
      width : '100%',
      justifyContent : 'space-evenly',
      alignItems : 'center'
  },
  cameraClickContainer : {
    alignItems : 'center',

  },
  message : {
      color : colors.white,
      fontSize : fontSizes.medium,
      fontFamily : fonts.Medium
  },
  selectGalleryWrapper : {
    alignItems : 'center'
  }
});

export default CameraScreen