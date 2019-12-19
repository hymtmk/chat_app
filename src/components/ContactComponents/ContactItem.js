import React from 'react'
import { Text, View ,Image, TouchableOpacity} from 'react-native'
import {styles} from '../../res/style/CommonStyle/ChatStyle'
import {OnlineOffline} from '../Shared/Index'
import MaterialIcon from '../Shared/MaterialIcon'
import {colors} from '../../res/style/colors'
import posed from 'react-native-pose'
import firebase from 'react-native-firebase'

const Item = posed.View({
  enter: { 
    x: 0, opacity: 1,delay:400,
    transition : {
      type : 'spring',
      useNativeDriver : true
    }

   },
  exit: { x: 300, opacity: 0 }
})

// id: phoneNumber
// userName: user name
// uri: avatar uri
// isOnline: online state
const ContactItem = ({myid, userid, uri,userName,status="At Work",selected,showCallIcon,navigation, onSelect}) => {
  
    if (status.length > 20) {
      status = status.slice(0, 20)+'...'  
    }

    onCall = () => {
      navigation.navigate('Calling',{
        uri,
        name : userName
      })
    }
    
    onUserChat = () =>{
      onSelect(userid)
    }
    return(
        <TouchableOpacity onPress={ onUserChat} activeOpacity={.8} style={styles.chatContainer}>
          <View style={[styles.img,styles.imgWrapper]}>
            <Image style={styles.img} source={{uri}}/>
          </View>
          {selected && <MaterialIcon size={22} color="#25D366" name="check-circle"/>}
          <View style={styles.chatUserDetailsWrapper}>
            <Text style={styles.chatUserName}>{userName}</Text>
            <Text style={styles.chatText}>{status}</Text>
          </View>
        </TouchableOpacity>

    )
}


export default ContactItem