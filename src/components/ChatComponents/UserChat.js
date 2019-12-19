import React,{useState,useEffect} from 'react'
import ReactTimeAgo from 'react-time-ago'
import { Text, View ,Image,TouchableOpacity,StyleSheet} from 'react-native'
import {OnlineOffline,SwipeList} from '../Shared/Index'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from '../../res/style/CommonStyle/ChatStyle'
import {chatDetails} from '../../res/data/data'
import {colors} from '../../res/style/colors'
import posed from 'react-native-pose'

import TimeAgo from 'javascript-time-ago' 
// The desired locales.
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)

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

const UserChat = ({chatid, uri, myid, userName, lastMessage, messageType, lastTime, isOnline, navigation, onDelete,}) => {
  
//    const [messageTime, setMessageTime] = useState("")
//    const [lastMessage, setLastMessage] = useState("")
//    const [type, setType] = useState("")
    const timeAgo = new TimeAgo('en-US')      
    const onUserChat = () =>{
      navigation.navigate('ChatScreen',{
        chatid,
        myid,
        uri,
        userName,
        isOnline
      })
    }
  
    useEffect(()=>{
      
    })
  
    return(
        <TouchableOpacity onLongPress={onDelete} onPress={onUserChat} activeOpacity={.8} style={styles.chatContainer}>
          <View style={[styles.img,styles.imgWrapper]}>
           <Image style={styles.img} source={{uri}}/>
          </View>
          <OnlineOffline isOnline={isOnline}/>
          <View style={styles.chatUserDetailsWrapper}>
            <Text style={styles.chatUserName}>{userName}</Text>
            <View style={styles.chatWrapper}>
             { 
                messageType === "SEND" && (<MaterialIcon name="check-all" color={colors.primary} size={18} />)
             }
             <Text style={[styles.chatText,messageType !== 'SEND' && {marginLeft:0}]}>{lastMessage}</Text>
             </View>
          </View>

          <View style={styles.secondRow}>           
            <Text style={styles.chatUserNameTime}>{timeAgo.format(lastTime)}</Text>
          </View>
        </TouchableOpacity>
    )
}


export default UserChat