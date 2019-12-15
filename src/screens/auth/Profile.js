import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  ImageBackground
} from 'react-native'
import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker'
import {colors} from '../../res/style/colors'
import { fontSizes } from '../../res/style/fontSize'
import { fonts } from '../../res/style/fonts'
import { getFileName } from '../../utils/utils'
import { saveUserInfo } from '../../utils/db'
import { ProgressDialog } from 'react-native-simple-dialogs';
import { moderateScale } from '../../res/style/scalingUnit'

import Logo from "../../res/assets/images/logo.png"
import ProfileLogo from "../../res/assets/images/profile.png"
import BackgroundImg from '../../res/assets/images/background.png'

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
const window = Dimensions.get('window')
const Profile = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [isFromFile, setIsFromFile] = useState(false)    
    const [userData, setUserData] = useState({
      id: '', 
      phone: props.navigation.getParam('phoneNumber'),
      name: '',
      avatar: '',
      email: ''
    })
    // local avatar file info
    const [localAvatar, setLocalAvatar] = useState('')
    const [localAvatarFileName, setLocalAvatarFileName] = useState('')
    // server avatar file
    const [avatarRef, setAvatarRef] = useState('')
    const [avatarSource, setAvatarSource] = useState('')
    // Progress Dialog message
    const [message, setMessage] = useState('')

    // save or update database
    onSaveOrUpdate = () => {
      setIsLoading(true)
/*
      if(avatarRef !== ''){
        firebase.storage().ref(avatarRef)
          .delete()
      }
*/    
      console.log("User name: " + userData.name)
      if(userData.name == '')
      {
        // if userName is empty
        alert('Please input your name')
        setIsLoading(false)
      }
      else{
        console.log('avatar:' + avatarSource)
        setUserData({
          id: userData.id,
          phone: userData.phone,
          name: userData.name,                
          avatar: avatarSource,
          email: userData.email}
        )
        firebase.database().ref('UserList')
        .push(userData)
        .then(function(data)
        {
          let jsonData = JSON.stringify(userData)
          console.log("data:" + jsonData)  
          saveUserInfo(jsonData).then(() => {
            console.log('Verification code saved')
            requestAnimationFrame(() => {                
              Keyboard.dismiss()
              props.navigation.navigate("App")
              setIsLoading(false)       
            })      
          })  
        })
        .catch((error) => {
          console.log("error:" + error )
        })
      }        
    }
    
    // called when user select avatar
    selectAvatar = () => {
      ImagePicker.showImagePicker(null, response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker')
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton)
        } else {
          setLocalAvatar(response.path)
          setLocalAvatarFileName(response.fileName)
          
          //upload avatar to server
          setIsLoading(true)
          firebase.storage().ref('/profilePics/' + getFileName(response.fileName))
          .putFile(response.path)
          .then(function(data)
          {
            setAvatarRef(data.ref)
            setAvatarSource(data.downloadURL)
            setIsLoading(false)
          })
          .catch((error) => {
              console.log('Error', error);
              setIsLoading(false)
          })
        }
      })
    }
    const transationProfile = (
      <View style={[styles.containerParent, styles.container]}>
        <TouchableOpacity activeOpacity={.8} onPress={selectAvatar}  style={styles.profileContainer}>
          <View style={[styles.profileImg,{backgroundColor:colors.lightGrey}]}>
           <Image source={
              localAvatar !== ''
              ? { uri: 'file:///' + localAvatar}
              : require ('../../res/assets/images/profile.png')
           } style={styles.profileImg} /> 
          </View>         
        </TouchableOpacity>

        <TextInput
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          placeholder={'Your Name'}
          onChangeText={text => (setUserData({
            id: userData.id,
            phone: userData.phone,
            name: text,                
            avatar: userData.avatar,
            email: userData.email}))}
          value={userData.name}
        />
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={colors.primary}
            style={{ margin: 24 }}
          />
        ) : (
          <View
            style={{
              backgroundColor: colors.primary,
              alignSelf: 'center',
              padding: 8,
              paddingRight: 32,
              paddingLeft: 32,
              borderRadius: 6
            }}
          >
            <TouchableOpacity onPress={this.onSaveOrUpdate}>
              <Text style={[styles.footerButtonText, { fontWeight: '500' }]}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
    return (
      <ScrollView contentContainerStyle={styles.containerScrollView}>        
          <StatusBar backgroundColor={colors.primary}/>
          <ImageBackground style={styles.backImage} source={BackgroundImg} />
          <View style={styles.logoWrapper}>
            <Image style={{width:30, height:30,resizeMode:'contain'}} source={Logo} />
            <Text style={styles.logoText}>WhatsApp</Text>
          </View>
          <View style={styles.containerStyle} >
            <View style={styles.sliderContainerStyle} >
              <View style={styles.slider}></View>
            </View>
          </View>
          { transationProfile }
          <View >
              <ProgressDialog
                  style = {styles.progressDialog}
                  activityIndicatorSize = "large"
                  animationType = "slide"
                  message = { message }
                  visible = { message.length > 0 ? true : false }/>
            </View>
        </ScrollView>

    )
}
export default Profile

const styles = StyleSheet.create({
  containerScrollView : {
    backgroundColor:colors.primary,
    flex:1, 
  },
  containerStyle: {
      alignSelf: 'center',
      width:  window.width,
      height: window.width/7,
      overflow: 'hidden',
      transform: [{ rotate: '180deg'}],
      backgroundColor:"transparent",
  },
  containerParent: {
    backgroundColor:colors.white,
    flex: 1,
  },
  container: {
    justifyContent: 'center'
  },
  sliderContainerStyle: {
    borderRadius: window.width,
    width: window.width * 2,
    height: window.width * 2,
    marginLeft: -((window.width / 2)),
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  slider: {
      height: window.width/7,
      width: window.width,
      position: 'absolute',
      bottom: 0,
      marginLeft: window.width / 2,
      backgroundColor: colors.white,
  },
  backImage : {
    width:SCREEN_WIDTH+20,
    height:moderateScale(300),
    resizeMode:'cover',
    position:"absolute", 
    alignSelf:'center'
  },
  logoWrapper : {
    padding : 50,
    justifyContent : 'center',
    alignItems : 'center',
    flexDirection : 'row'
  },
  logoText : {
      fontFamily : fonts.SemiBold,
      fontSize:fontSizes.big,
      color:colors.white,
      marginLeft : 10,
      marginTop : 4
  },
  wrapper : {
      backgroundColor: colors.white, 
      flex:1,
      paddingHorizontal:20,
      paddingVertical : 20,
      justifyContent:'flex-start',
  },
  loginHeadText : {
      color: colors.black,
      fontSize : fontSizes.medium,
      fontFamily: fonts.SemiBold,
      marginRight: 40
  },
  footerButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '500'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center'
  },
  profileContainer : {
    paddingHorizontal : 10,
    paddingVertical : 10,
    flexDirection : 'row',
    alignItems : 'center',
    alignSelf: 'center',
  },
  profileImg : {
      width : SCREEN_WIDTH/3,
      height : SCREEN_WIDTH/3,
      borderRadius : SCREEN_WIDTH/6
  },
  textInput: {
    width: '70%',
    borderBottomWidth:1,
    borderBottomColor:colors.primary,
    margin: 32,
    padding: 8,
    alignSelf:'center',
    textAlign: 'center',
    fontSize: 18,
  },
  progressDialog: {
    width: SCREEN_WIDTH*9/10,
    flexDirection : 'row',        
    alignItems: 'center'
  },
})
