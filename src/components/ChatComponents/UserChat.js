import React,{useState,useEffect} from 'react'
import { Text, View ,Image,TouchableOpacity,StyleSheet} from 'react-native'
import {OnlineOffline,SwipeList} from '../Shared/Index'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import {styles} from '../../res/style/CommonStyle/ChatStyle'
import {chatDetails} from '../../res/data/data'
import {colors} from '../../res/style/colors'
import posed from 'react-native-pose'

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

const UserChat = ({id,uri,userName,message,time,isOnline,navigation,chatId,onDelete,}) => {
  
    const [lastMessage, setLastMessage] = useState("")
    const [messageTime, setMessageTime] = useState("")
    const [type, setType] = useState("")
  
    const onUserChat = () =>{
      navigation.navigate('ChatScreen',{
        id,
        uri,
        userName,
        chatId,
        isOnline
      })
    }
  
    useEffect(()=>{
      const chatDetail= chatDetails.filter((chat) => {
        return chat.id === chatId
      })
  
      const messages = chatDetail[0].messages
  
      const last = messages[messages.length - 1]
  
      setLastMessage(last.text)
      setMessageTime(last.time)
      setType(last.type)
    })
  
    return(
      <Item> 
        <TouchableOpacity onLongPress={onDelete} onPress={onUserChat} activeOpacity={.8} style={styles.chatContainer}>
          <View style={[styles.img,styles.imgWrapper]}>
           <Image style={styles.img} source={{uri}}/>
          </View>
          <OnlineOffline isOnline={isOnline}/>
          <View style={styles.chatUserDetailsWrapper}>
            <Text style={styles.chatUserName}>{userName}</Text>
            <View style={styles.chatWrapper}>
             { 
              type === "SEND" && (<MaterialIcon name="check-all" color={colors.primary} size={18} />)
             }
             <Text style={[styles.chatText,type !== 'SEND' && {marginLeft:0}]}>{lastMessage}</Text>
             </View>
          </View>

          <View style={styles.secondRow}>
           <Text style={styles.chatUserNameTime}>{messageTime}</Text>
          </View>
        </TouchableOpacity>
      </Item>
    )
}


export default UserChat