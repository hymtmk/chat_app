import React, { useState } from 'react'
import { Text, View,StyleSheet,StatusBar,Image,TouchableOpacity,ScrollView } from 'react-native'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import {Icon,MaterialIcon} from '../../components/Shared/Index'

const Setting = (props) => {

    const onProfile = () =>{
        props.navigation.navigate('MyProfileScreen')
    }

    onLogout = () => {
        props.navigation.navigate("Auth")
    }

    return (
      <View style={styles.container}>
       <StatusBar  backgroundColor={colors.white} barStyle="dark-content"  />
       <View style={styles.headerContainer}>
        <View style={styles.firstRow}>
         <MaterialIcon style={styles.icon} onPress={() => {props.navigation.goBack()}} name="arrow-left" size={24} color={colors.primary} />
          <Text style={styles.searchText}>Setting</Text>
        </View>
        <View style={styles.secondRow}>
         <MaterialIcon style={styles.icon} name="dots-horizontal-circle" size={24} color={colors.primary} />
        </View>
        </View>
        <TouchableOpacity activeOpacity={.8} onPress={onProfile}  style={styles.profileContainer}>
          <View style={[styles.profileImg,{backgroundColor:colors.lightGrey}]}>
           <Image source={{uri : 'http://tiny.cc/whatsapp_profile'}} style={styles.profileImg} />
          </View>
          <View style={styles.profileDetailsWrapper}>
           <Text style={styles.profileName}>Damon Paley</Text>
           <Text style={styles.profileStatus}>At Work</Text>
          </View>
        </TouchableOpacity>
        <ScrollView style={styles.optionContainer}>
          <TouchableOpacity style={styles.optionWrapper}
            onPress = {()=>props.navigation.navigate('EditProfile')}
          >
           <Icon style={styles.optionIcon} name="key" size={20} color={colors.primary} />
           <Text style={styles.optionText}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper}>
           <MaterialIcon style={styles.optionIcon} name="android-messages" size={22} color={colors.primary} />
           <Text style={styles.optionText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper}>
           <MaterialIcon style={styles.optionIcon} name="bell" size={22} color={colors.primary} />
           <Text style={styles.optionText}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper}>
           <Icon style={styles.optionIcon} name="data-usage" size={20} color={colors.primary} />
           <Text style={styles.optionText}>Data Usage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper}>
           <MaterialIcon style={styles.optionIcon} name="account" size={22} color={colors.primary} />
           <Text style={styles.optionText}>Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper}>
           <Icon style={styles.optionIcon} name="payment" size={20} color={colors.primary} />
           <Text style={styles.optionText}>Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper}>
           <Icon style={styles.optionIcon} name="group" size={18} color={colors.primary} />
           <Text style={styles.optionText}>Invite Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper}>
           <MaterialIcon style={styles.optionIcon} name="help-circle" size={22} color={colors.primary} />
           <Text style={styles.optionText}>About and Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionWrapper} onPress={onLogout}>
           <MaterialIcon style={styles.optionIcon} name="logout" size={22} color={colors.primary} />
           <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
}

const IMG_WIDTH = 60

const styles = StyleSheet.create({
    container : {
        flex : 1,
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
    profileContainer : {
        paddingHorizontal : 10,
        paddingVertical : 16,
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : colors.lightGrey
    },
    profileImg : {
        width : IMG_WIDTH,
        height : IMG_WIDTH,
        borderRadius : IMG_WIDTH/2
    },
    profileDetailsWrapper : {
        marginLeft : 20
    },
    profileName : {
        fontSize : fontSizes.medium,
        fontFamily : fonts.SemiBold,
        color : colors.black
    },
    profileStatus : {
        fontSize : fontSizes.medium,
        fontFamily : fonts.Medium,
        color : colors.black
    },
    optionIcon : {
        marginLeft : 10
    },
    optionContainer : {
        backgroundColor : colors.white,
        paddingVertical : 20, 
        flex:1
    },
    optionWrapper : {
        flexDirection : 'row',
        padding : 10,
        marginVertical : 3,
        alignItems : 'center',  
    },
    optionText : {
        fontSize : fontSizes.medium,
        fontFamily : fonts.Medium,
        color : colors.black,
        marginLeft : 20,  
    }
})

export default Setting