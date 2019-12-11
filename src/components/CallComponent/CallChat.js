import React from 'react'
import { Text, View,Image, StyleSheet,TouchableOpacity} from 'react-native'
import {colors} from '../../res/style/colors'
import {fonts} from '../../res/style/fonts'
import {fontSizes} from '../../res/style/fontSize'
import MaterialIcon from '../Shared/MaterialIcon'

const CallChat = ({uri,userName,time,type,typeCall,navigation}) => {
    const typeOfCall = typeCall === "Call" ? "phone" : "video"

    onCall = () => {
        navigation.navigate('Calling',{
            uri,
            name : userName
        })
    }
    
    onVideo = () => {}

    return(
      <TouchableOpacity activeOpacity={.8} onPress={typeCall==='Call' ? onCall:onVideo} style={styles.chatContainer}>
        <View style={[styles.img,{backgroundColor:colors.lightGrey}]}>
          <Image style={styles.img} source={{uri}} />
        </View>
        <View style={styles.chatUserWrapper}>
         <View style={styles.chatUserDetailsWrapper}>
          <Text style={styles.chatUserName}>{userName}</Text>
          <View style={styles.chatWrapper}>
           <MaterialIcon name="call-missed" color={type==="missed" ? colors.red : colors.primary } style={type==="missed" ? styles.miseddCallIcon : styles.outgoingCall} size={18} />
           <MaterialIcon name="clock-outline" size={12} style={{padding:0,marginLeft:4}} color={colors.darkGrey} />
           <Text style={styles.chatText}>{time}</Text>
          </View>
         </View>
         <View style={styles.secondRow}>
          <MaterialIcon name={typeOfCall} style={styles.icon} size={24} color={colors.primary}/>
         </View>
        </View>
      </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    chatContainer : {
        flexDirection : 'row',
        paddingVertical : 10,
        borderBottomWidth : .4,
        borderBottomColor : colors.grey,
        paddingLeft:10
    },
    chatUserWrapper :{
        padding : 5,
        paddingHorizontal:14,
        flex : 1,
        alignItems : 'center',
        flexDirection:'row',
        justifyContent : 'space-between',
    },
    chatUserDetailsWrapper : {
        justifyContent : 'center',
    },
    chatUserName : {
        color : colors.black, 
        fontSize : fontSizes.medium,
        fontFamily : fonts.SemiBold
    },
    chatUserNameTime : {
        fontSize : fontSizes.verySmall,
        fontFamily : fonts.Medium
    },
    chatWrapper : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    chatText : {
        fontSize : fontSizes.verySmall,
        fontFamily : fonts.Medium,
        color : colors.darkGrey,
        marginLeft : 4
    },
    miseddCallIcon : {
        transform:[{rotateX:'180deg'}],
    },
    outgoingCall : {
        transform:[{rotateY:'180deg'}]
    },
    img : {
        width : 60,
        height:60,
        borderRadius:60/2,
    },
        
})


export default CallChat