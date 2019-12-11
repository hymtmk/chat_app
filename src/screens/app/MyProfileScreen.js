import React, { Component } from 'react'
import { Text, View, StyleSheet,StatusBar,ImageBackground,ScrollView } from 'react-native'
import {Icon,MaterialIcon} from '../../components/Shared/Index'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import {moderateScale} from '../../res/style/scalingUnit'

const MyProfileScreen = (props) => {
  
    return (
      
     <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content"/>
       <View style={styles.headerContainer}>
        <View style={styles.firstRow}>
         <MaterialIcon style={styles.icon} onPress={() => {props.navigation.goBack()}} name="arrow-left" size={24} color={colors.primary} />
          <Text style={styles.searchText}>Profile</Text>
        </View>
        <View style={styles.secondRow}>
         <MaterialIcon style={styles.icon} name="pencil" size={24} color={colors.primary} />
        </View>
        </View>
        <ScrollView style={{flex:1}}>
        <View style={[styles.profileImg,{backgroundColor:colors.lightGrey}]}>
        <ImageBackground source={{uri:"http://tiny.cc/whatsapp_profile"}} style={styles.profileImg}>
          <Text style={styles.profileName}>Damon Paley</Text>
          <View style={styles.cameraWrapper}>
            <MaterialIcon style={styles.iconWrapper} iconStyle={styles.icon} name="camera" color={colors.white} />
          </View>
        </ImageBackground>
        </View>
        <View style={styles.optionContainer}>
         <View style={styles.optionWrapper}>
           <View style={styles.optionTitleWrapper}>
            <Text style={styles.title}>About and phone number</Text>
            <MaterialIcon name="chevron-down" size={24} color={colors.primary} />
           </View>
           <Text style={styles.subtitle}>At the Work</Text>
         </View>
         <View style={styles.optionWrapper}>
           <View style={styles.optionTitleWrapper}>
            <Text style={styles.title}>Change Number</Text>
            <MaterialIcon name="chevron-down" size={24} color={colors.primary} />
           </View>
           <Text style={styles.subtitle}>+91 9970039584</Text>
         </View>
         <View style={styles.optionWrapper}>
           <View style={styles.optionTitleWrapper}>
            <Text style={styles.title}>My last seen</Text>
            <MaterialIcon name="chevron-down" size={24} color={colors.primary} />
           </View>
           <Text style={styles.subtitle}>Nobody</Text>
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
      borderBottomWidth : 1,
      borderBottomColor : colors.lightGrey
    },
    searchText : {
        fontSize : fontSizes.medium,
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
       justifyContent : 'flex-end',
    },
    profileName : {
      fontSize : fontSizes.big,
      fontFamily : fonts.SemiBold,
      color : colors.white,
      letterSpacing : .6,
      margin : 10
    },
    cameraWrapper : {
      backgroundColor : colors.white,
      width : SIZE,
      height : SIZE,
      borderRadius : SIZE/2,
      position : 'absolute',
      bottom : -20,
      right : 20,
      justifyContent : 'center',
      alignItems : 'center'
    },
    iconWrapper : {
      backgroundColor : colors.paymentIcon,
      width : ICON_WRAPPER_SIZE ,
      height : ICON_WRAPPER_SIZE,
      borderRadius : ICON_WRAPPER_SIZE/2,
      justifyContent : 'center',
      alignItems : 'center'
    },
    optionContainer : {
      flex : 1,
      paddingTop : 20,
    },
    optionWrapper : {
      marginVertical : 10,
      paddingHorizontal : 16
    },
    optionTitleWrapper : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between'
    },
    title : {
      fontSize : fontSizes.medium,
      color : colors.black,
      fontFamily : fonts.SemiBold,
    },
    subtitle : {
      color : colors.grey,
      fontSize : fontSizes.small,
      fontFamily: fonts.SemiBold
    }
})

export default MyProfileScreen