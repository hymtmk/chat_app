import React, { useState } from 'react'
import { Text, View, StyleSheet,StatusBar,Image } from 'react-native'
import {Icon,MaterialIcon,} from '../../components/Shared/Index'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import {moderateScale} from '../../res/style/scalingUnit'

const Calling = (props) => {
  
   const [isMute,setMute] = useState(false)
   const [highVolume,setHighVolume] = useState(true)

    const onMute = () =>{
      setMute(!isMute)
    }

    const onVolume = () => {
      setHighVolume(!highVolume)
    }

    const endCall = () => {
      props.navigation.pop(1)
    }

    
    const uri = props.navigation.getParam('uri') 
    const userName = props.navigation.getParam('name')

    return (
      
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View style={[styles.profileImg,{backgroundColor:colors.lightGrey}]}>
         <Image source={{uri}} style={styles.profileImg}/>
        </View>
        <View style={styles.profileNameContainer}>
          <Text style={styles.profileName}>{userName}</Text>  
          <View style={styles.brandingWrapper}>
           <MaterialIcon name="whatsapp" size={18} color={colors.grey} />
           <Text style={styles.whatsappText}>Whatsapp Calling</Text>
          </View>
        </View>   
        <View style={styles.actionIconContainer}>
           <MaterialIcon style={styles.actionIconWrapper} name={isMute ? "microphone-off" : "microphone"} onPress={onMute} size={26} color={colors.primary}/>
           <MaterialIcon style={styles.actionIconWrapper} name={highVolume ? "volume-high" : "volume-off"} onPress={onVolume} size={26} color={colors.primary}/>
           <MaterialIcon style={styles.actionIconWrapper} name="video" size={26} color={colors.primary}/>
           <Icon style={styles.actionIconWrapper} name="call-send" size={18} color={colors.primary}/>
        </View>
        <View style={styles.endCallContainer}>
          <MaterialIcon name="phone-hangup" size={26} color={colors.white} onPress={endCall} style={styles.endCallWrapper}/>
        </View>
      </View>
    )
}

const SIZE = 50
const END_CALL_SIZE = 55

const styles = StyleSheet.create({
    container : {
      flex :1 ,
      backgroundColor : colors.white,
      
    },
    profileImg : {
       width : '100%',
       height : moderateScale(400),
    }, 
    profileName : {
      fontSize : fontSizes.big,
      color : colors.black,
      fontFamily : fonts.SemiBold,
      textAlign : 'center'
    },
    profileNameContainer : {
      padding : 10,
      justifyContent : 'center',
      alignItems : 'center'
    },
    brandingWrapper : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'center',
      marginHorizontal : 10,
    },
    whatsappText : {
      fontSize : fontSizes.small,
      color : colors.grey,
      fontFamily : fonts.SemiBold,
      marginLeft : 4,
      marginTop : 4,
      
    },
    actionIconContainer : {
      padding : 10,
      marginVertical : 10,
      justifyContent : 'space-around',
      flexDirection : 'row'
    },
    actionIconWrapper : {
      width : SIZE,
      height : SIZE,
      borderRadius : SIZE/2,
      borderWidth : .8,
      borderColor : colors.primary,
      justifyContent : 'center',
      alignItems : 'center'
    },
    endCallContainer : {
      padding : 10,
      justifyContent : 'center',
      alignItems : 'center',
      marginVertical : 10
    },
    endCallWrapper : {
      width : END_CALL_SIZE,
      height : END_CALL_SIZE,
      borderRadius : END_CALL_SIZE/2,
      backgroundColor : '#FF3824',
      justifyContent : 'center',
      alignItems : 'center'
    },    
})

export default Calling