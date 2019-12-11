import React, { useState } from 'react'
import { Text, View,StyleSheet,StatusBar,TextInput,Image,TouchableOpacity,ScrollView } from 'react-native'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import {Icon,MaterialIcon} from '../../components/Shared/Index'
import { placeholder } from '@babel/types'

const EditProfile = (props) => {
    const [cca2,setCca2] = useState('KH') // you can set ur country here
    const [callingCode,setCallingCode] = useState('855') 
    const [name,setName] = useState('Cambodia')
    const [phoneNumber,setPhoneNumber] = useState('')    

    const onProfile = () =>{
        props.navigation.navigate('MyProfileScreen')
    }
    onLogout = () => {
        props.navigation.navigate("Auth")
    }    

    onTextChange = (phoneNumber) => {
        setPhoneNumber(phoneNumber)
    }   

    return (
      <View style={styles.container}>
       <StatusBar  backgroundColor={colors.white} barStyle="dark-content"  />
       <View style={styles.headerContainer}>
        <View style={styles.firstRow}>
         <MaterialIcon style={styles.icon} onPress={() => {props.navigation.goBack()}} name="arrow-left" size={24} color={colors.primary} />
          <Text style={styles.searchText}>Edit Profile</Text>
        </View>
        <View style={styles.secondRow}>

          <TouchableOpacity onPress={() =>{}} >
          <MaterialIcon style={styles.icon} name="check" size={24} color={colors.primary} />          
          </TouchableOpacity>         
        </View>      
        
        
        </View>
        <TouchableOpacity activeOpacity={.8} onPress={onProfile}  style={styles.profileContainer}>
          <View style={[styles.profileImg,{backgroundColor:colors.lightGrey}]}>
           <Image source={{uri : 'http://tiny.cc/whatsapp_profile'}} style={styles.profileImg} /> 
          </View>         
        </TouchableOpacity>
        <View style={{ marginTop : 5}}>
        

        </View>
        <View style={{ marginTop : 1}}>
            <Text                
                style = {{  width: '90%', borderBottomWidth:1,
                            borderBottomColor:colors.primary, alignSelf:'center'}} >+8551234567890</Text>
            <TextInput 
                placeholder="Username"
                style = {{  width: '90%', borderBottomWidth:1,
                            borderBottomColor:colors.primary, alignSelf:'center'}} />
            <TextInput 
                placeholder="Bio"
                multiline = {true}
                style = {{  width: '90%', borderBottomWidth:1,
                            borderBottomColor:colors.primary, alignSelf:'center'}} />      
           
        </View>         
      </View>
    )
}

const IMG_WIDTH = 80

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
        paddingVertical : 10,
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
        marginLeft : 10,
        
    },
    profileName : {
        marginVertical:5,
        padding:0,
        paddingBottom : 2,
        paddingHorizontal : 4,
        fontSize : fontSizes.medium,
        fontFamily : fonts.SemiBold,
        color : colors.black
    },
    profileStatus : {
        fontSize : fontSizes.medium,
        fontFamily : fonts.Medium,
        color : colors.black
    },
    subHead : {
        color : colors.grey,
        fontSize : fontSizes.small,
        fontFamily: fonts.Medium,
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
    countryWrapper : {
        flexDirection : 'row',
        borderBottomWidth : 1.2,
        borderBottomColor : colors.primary,
        alignItems : 'center',
        justifyContent : 'space-between',
        marginTop : 8
    },
    countryFlagWrapper : {
        flexDirection : 'row'
    },
    countryName : {
        marginLeft : 12,
        fontSize : fontSizes.medium,
        fontFamily: fonts.Medium,
        color: colors.black,
    },
    mobileNumberWrapper : {
        flex:1,
        justifyContent:'flex-start'
    },
    phoneNumberWrapper : {
        flexDirection : 'row',
        marginHorizontal:20
    },
    textInput : {
        marginVertical:5,
        padding:0,
        paddingBottom : 2,
        paddingHorizontal : 4,
        borderBottomWidth : 1.2,
        borderColor : colors.primary,
        fontSize : 16,
        fontFamily: fonts.Medium,
        color : colors.black
    },
    optionText : {
        fontSize : fontSizes.medium,
        fontFamily : fonts.Medium,
        color : colors.black,
        marginLeft : 20,  
    }
})

export default EditProfile