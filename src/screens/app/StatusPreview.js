import React, { useState,useEffect } from 'react'
import { Text, View,StyleSheet,TouchableOpacity,StatusBar,ImageBackground,Image ,Animated} from 'react-native'
import {MaterialIcon} from '../../components/Shared/Index'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'

const StatusPreview = (props) => {

  const [animation,setAnimation] =  useState(new Animated.Value(0))

  onBackPress = () => {
    props.navigation.pop(1)
  }

  //progress bar animation you can edit duration
  setProgress = () => {
      animation.setValue(0)
      Animated.timing(animation,{
          toValue : 1,
          duration : 6000,
      }).start(({finished}) => {
            if(finished){
                props.navigation.pop(1)
            }
      })
    }

    useEffect(() => {
        setProgress() //work like componentDidMount
    }, [])
  
    const progressStyleInterpolate = animation.interpolate({
        inputRange : [0,1],
        outputRange : ['0%','100%'], //change width of view 
        extrapolate : 'clamp'
    })

    const progressStyle = {
        width : progressStyleInterpolate,
        bottom : 0
    }
    
    const uri = props.navigation.getParam('uri')
    const name = props.navigation.getParam('name')
    
    return (
       
      <ImageBackground source={{uri:'http://tiny.cc/galleryphoto7'}} style={styles.container}>
        <StatusBar backgroundColor="#000" barStyle="light-content"/>
        <View style={{paddingHorizontal:10,paddingTop:10}}>
         <View style={styles.progressBarContainer}>
          <Animated.View style={[styles.progressBar,progressStyle]}/>
         </View>
        </View>
        <View style={{flex:1,justifyContent : 'space-between'}}>
        <View style={styles.topContainer}>
         <View style={styles.firstCol}>
            <MaterialIcon style={{padding : 6}} onPress={onBackPress} name="arrow-left" size={24} color={colors.white} />
            <View style={styles.profileImgWrapper}>
             <Image style={styles.profileImg} source={{uri}}/>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.time}>yesterday,8:00pm</Text>
            </View>
         </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.statusWrapper}>
           <Text style={styles.statusText}>I am very happy ;)</Text>
          </View>
          <TouchableOpacity style={styles.selectGalleryWrapper}>
           <MaterialIcon name="chevron-up"  color ={colors.white} size={26}/>
           <Text style={styles.replyText}>REPLY</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>
    )
}

const color = '#2200001C'
const IMG_WIDTH = 40
const IMG_CONTAIN = 44

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.black,
    },
    progressBarContainer  :{
        width : '100%',
        height : 2,
        backgroundColor : colors.lightGrey,
        borderRadius : 10,
    },
    progressBar : {
        position : 'absolute',
        top : 0,
        height : 2,
        left : 0,
        backgroundColor : colors.primary,
        borderRadius : 10
    },
    topContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between', 
    },
    firstCol : {
        flexDirection : 'row',
        alignItems : 'center',
        flex : 1,
        padding : 10
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
    profileDetails : {
        marginLeft : 14
    },
    name :{
        fontSize : fontSizes.medium,
        fontFamily : fonts.SemiBold,
        color : colors.white
    },
    time :  {
        fontSize : fontSizes.verySmall,
        fontFamily : fonts.Regular,
        color : colors.white
    },
    statusWrapper : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : color,
        padding : 10
    },
    statusText : {
        fontSize : fontSizes.medium,
        fontFamily : fonts.SemiBold,
        color : colors.white,
        textAlign : 'center',
    },
    selectGalleryWrapper : {
        alignSelf : 'center',
        alignItems : 'center',
        paddingVertical : 10
    },
    replyText : {
        fontSize : fontSizes.medium,
        color : colors.white,
        fontFamily : fonts.SemiBold
    },
    bottomContainer : {
        paddingVertical : 10
    }
})

export default StatusPreview