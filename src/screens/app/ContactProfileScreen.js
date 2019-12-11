import React, { useState } from 'react'
import { Text, View, StyleSheet,StatusBar,ImageBackground,ScrollView,Image,TouchableOpacity,Switch } from 'react-native'
import {Icon,MaterialIcon} from '../../components/Shared/Index'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import {moderateScale} from '../../res/style/scalingUnit'

const galleryData = [
  
  {
    firstImg : 'http://tiny.cc/galleryphoto3',
    secondImg : 'http://tiny.cc/galleryphoto4'
  },
  {
    firstImg : 'http://tiny.cc/galleryphoto5',
    secondImg : 'http://tiny.cc/galleryphoto6'
  },
  {
    firstImg : 'http://tiny.cc/galleryphoto7',
    secondImg : 'http://tiny.cc/galleryphoto8'
  },
  {
    firstImg : 'http://tiny.cc/galleryphoto9',
    secondImg : 'http://tiny.cc/galleryphoto10'
  },
  {
    firstImg : 'http://tiny.cc/galleryphoto1',
    secondImg : 'http://tiny.cc/galleryphoto2'
  },
]

const ContactProfileScreen = ({navigation}) => {
  
    const [id, setID] = useState(navigation.getParam('id'))
    const [uri, setUri] = useState(navigation.getParam('uri'))
    const [username, setUsername] = useState(navigation.getParam('username'))
    const [status, setStatus] = useState(navigation.getParam('status'))

    const [switchValue,setSwitchValue] = useState(false)

    const onSwitch = (value) => {
      setSwitchValue(value)
    }

    onCall = () => {
      navigation.navigate('Calling',{
        uri,
        name : username
      })
    }

    const onCamera = () => {
      navigation.navigate('CameraScreen',{
        uri
      })
    }

    return (
      
     <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20}}>
      <View style={[styles.profileImg,{backgroundColor:colors.lightGrey}]}>
       <ImageBackground source={{uri}} style={styles.profileImg}>
       <View style={styles.headerContainer}>
        <View style={styles.firstRow}>
         <MaterialIcon style={styles.customIcon} onPress={() => {navigation.goBack()}} name="arrow-left" size={24} color={colors.white} />
        </View>
        <View style={styles.secondRow}>
         <MaterialIcon style={styles.customIcon} name="dots-horizontal-circle" size={24} color={colors.white} />
        </View>
        </View>
        <View style={styles.profileDetailsWrapper}>
         <Text style={styles.profileName}>{username}</Text>
         {status ? <Text style={styles.lastSeen}>Online</Text> : <Text style={styles.lastSeen}>Last seen today at 04:15 PM</Text>}
        </View>
        <View style={styles.actionIconWrapper}>
        <View style={styles.iconContainer}>
          <MaterialIcon style={styles.iconWrapper} onPress={onCall} name="phone" color={colors.white} />
        </View>
        <View style={styles.iconContainer}>
         <MaterialIcon style={styles.iconWrapper} name="video" color={colors.white} />
        </View>
        <View style={styles.iconContainer}>
         <MaterialIcon style={styles.iconWrapper} onPress={onCamera}  name="camera" color={colors.white} />
        </View>
        </View>
        </ImageBackground>
        </View>
        <View style={styles.optionContainer}>
         <View style={styles.mediaTitleContainer}>
          <Text style={styles.mediaTitle}>Media</Text>
          <View style={styles.mediaCounterWrapper}>
            <Text style={styles.mediaCount}>10</Text>
            <MaterialIcon name="chevron-right" style={{padding:0}} size={20} color={colors.primary}/>
          </View>
         </View>
         <View style={styles.galleryWrapper}>
          <ScrollView horizontal={true} contentContainerStyle={{paddingRight:10}} showsHorizontalScrollIndicator={false}>
            
            {
             galleryData.map((item,i) =>  
              (
               <View key={i} style={styles.galleryContainer}>
                <View style={[styles.img,{backgroundColor:colors.lightGrey}]}>
                 <Image source={{uri:item.firstImg}} style={styles.img}/>
                </View>
                <View style={[styles.img,{backgroundColor:colors.lightGrey,marginTop : 10}]}>
                 <Image source={{uri:item.secondImg}} style={styles.img}/>
                </View>
              </View>
             ))
            }
           
          </ScrollView>
         </View>
         <View style={styles.otherOptionContainer}>
         <TouchableOpacity style={styles.otherOptionWrapper}>
            <Text style={styles.optionTitle}>About and Phone Number</Text>
            <Switch onValueChange={onSwitch} value={switchValue} thumbColor={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherOptionWrapper}>
            <Text style={styles.optionTitle}>Custom Notification</Text>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
    )
}

const SIZE = 50
const ICON_WRAPPER_SIZE = 45

const styles = StyleSheet.create({
    container : {
      flex :1 ,
      backgroundColor : colors.white
    },
    headerContainer : {
      flexDirection : 'row',
      alignItems : 'center',
      padding : 14,
      justifyContent : 'space-between',
      
    },
    searchText : {
        fontSize : 16,
        color : colors.black,
        fontFamily : fonts.Medium,
        marginLeft : 20
    },
    firstRow : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        flex : 1   
    },
    secondRow : {
        paddingHorizontal : 6,
        alignItems : 'center'
    },
    profileImg : {
       width : '100%',
       height : moderateScale(350),
       justifyContent : 'space-between',
    },
    profileName : {
      fontSize : fontSizes.big,
      fontFamily : fonts.SemiBold,
      color : colors.white,
      letterSpacing : .6,
    },
    actionIconWrapper : {
      position : 'absolute',
      bottom : -20,
      right : 0,
      flexDirection : 'row',
      paddingHorizontal : 10,
      justifyContent : 'space-evenly'
    },
    iconContainer : {
      backgroundColor : colors.white,
      width : SIZE,
      height : SIZE,
      borderRadius : SIZE/2,
      justifyContent : 'center',
      alignItems : 'center',
      marginHorizontal : 10
    },
    iconWrapper : {
      backgroundColor : colors.paymentIcon,
      width : ICON_WRAPPER_SIZE ,
      height : ICON_WRAPPER_SIZE,
      borderRadius : ICON_WRAPPER_SIZE/2,
      justifyContent : 'center',
      alignItems : 'center'
    },
    profileDetailsWrapper : {
      paddingHorizontal : 10,
      paddingBottom : 40
    },
    lastSeen : {
      fontSize : fontSizes.small,
      color : colors.white,
      fontFamily : fonts.SemiBold,
    },
    optionContainer : {
      flex : 1,
      marginTop : 20
    },
    mediaTitleContainer : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      padding : 10,
      alignItems : 'center'
    },
    mediaTitle: {
      fontSize : fontSizes.medium,
      fontFamily : fonts.Medium,
      color : colors.primary
    },
    mediaCounterWrapper :{
      flexDirection : 'row',
      paddingHorizontal : 10
    },
    mediaCount : {
      fontSize : fontSizes.small,
      fontFamily : fonts.Medium,
      color: colors.black,
      alignItems : 'center'
    },
    galleryContainer : {
      paddingLeft : 10
    },
    img : {
      width : moderateScale(95),
      height : moderateScale(95),
    },
    otherOptionContainer : {
      paddingTop : 20,
    },
    otherOptionWrapper : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      alignItems : 'center',
      paddingHorizontal : 10,
      paddingVertical : 6
    },
    optionTitle : {
      fontSize : fontSizes.medium,
      fontFamily : fonts.SemiBold,
      color : colors.black
    },
        
})

export default ContactProfileScreen