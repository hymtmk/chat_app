import React from 'react'
import { Image,TouchableOpacity,TextInput, View,ImageBackground,StyleSheet,StatusBar } from 'react-native'
import {Icon,MaterialIcon} from '../../components/Shared/Index'
import {colors} from '../../res/style/colors'

const PhotoPreviewScreen = (props) => {

    onBackPress = () => {
      props.navigation.goBack()
    }

    onSend = () => {
      props.navigation.pop(2)
    }

    const image =props.navigation.getParam('image')
    const profile = props.navigation.getParam('profile') || 'http://tiny.cc/whatsapp_profile'
    
    return (
      <View style={styles.container}>  
       <StatusBar backgroundColor="#000" barStyle="light-content" /> 
       <ImageBackground style={styles.img} source={{uri : image}}>
         <View style={styles.topContainer}>
           <View style={styles.firstCol}>
            <MaterialIcon onPress={onBackPress} name="arrow-left" size={24} color={colors.white} />
            <View style={styles.profileImgWrapper}>
              <Image style={styles.profileImg} source={{uri:profile}}/>
            </View>
           </View>
           <View style={styles.secondCol}>
             <Icon name="crop" style={styles.icon} size={20} color={colors.white} />
             <Icon name="smile" style={styles.icon} size={20} color={colors.white} />
             <Icon name="text" style={styles.icon} size={16} color={colors.white} />
             <Icon name="edit" style={styles.icon} size={20} color={colors.white} />
           </View>
         </View>
          <View style={styles.bottomContainerWrapper}>
           <TouchableOpacity style={styles.selectGalleryWrapper}>
            <MaterialIcon name="chevron-up"  color ={colors.white} size={26}/>
            <Icon name="photos" color={colors.white} size={20} />
           </TouchableOpacity>
           <View style={styles.bottomContainer}>
            <View style={styles.textInputWrapper}>
             <TextInput placeholder="Write Message" placeholderTextColor={colors.white} style={styles.textInput} />
            </View>
            <MaterialIcon name="send" style={styles.sendIconWrapper} onPress={onSend} 
             iconStyle={{marginLeft : 4}} color={colors.white} size={24} />
           </View>
         </View>
       </ImageBackground>
      </View> 
    )
}

const color = '#2200001C'
const IMG_WIDTH = 40
const IMG_CONTAIN = 44

const styles = StyleSheet.create({
    container : {
        flex : 1,   
    },
    img : {
      flex:1,
      justifyContent : 'space-between'
    },
    topContainer : {
      backgroundColor : color,
      zIndex : 10,
      flexDirection : 'row',
      justifyContent : 'space-between',
    },
    firstCol : {
      flexDirection : 'row',
      alignItems : 'center',
      flex : 1,
      paddingHorizontal : 10,
      paddingVertical : 16,
    },
    profileImgWrapper : {
      width : IMG_CONTAIN,
      height : IMG_CONTAIN,
      borderRadius : IMG_CONTAIN /2,
      backgroundColor : colors.white,
      justifyContent : 'center',
      alignItems : 'center',
      marginLeft : 6
    },
    profileImg : {
      width : IMG_WIDTH,
      height : IMG_WIDTH ,
      borderRadius : IMG_WIDTH/2
    },
    secondCol : {
      flexDirection : 'row',
      alignItems : 'center',
      paddingHorizontal : 10,
      justifyContent : 'space-evenly',
      paddingHorizontal : 10,
      paddingVertical : 16,
    },
    icon : {
      marginHorizontal: 10
    },
    textInput : {
      paddingHorizontal : 10,
      fontSize : 16,
      color : colors.white
    },
    textInputWrapper : {
      flex : 1
    },
    sendIconWrapper : {
      width : 50,
      height : 50,
      borderRadius : 50 /2,
      backgroundColor : colors.primary,
      justifyContent : 'center',
      alignItems : 'center',
      marginHorizontal : 6
    },
  
    selectGalleryWrapper : {
      alignSelf : 'center',
      alignItems : 'center',
      paddingVertical : 10
    },
    bottomContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
      padding : 10,
      backgroundColor : color
    }
})

export default PhotoPreviewScreen