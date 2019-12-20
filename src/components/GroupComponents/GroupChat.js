import React from 'react'
import { Text, View,Image, TouchableOpacity } from 'react-native'
import {styles} from '../../res/style/CommonStyle/ChatStyle'
import {colors} from '../../res/style/colors'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import TimeAgo from 'javascript-time-ago' 
// The desired locales.
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)

const GroupChat = ({uri,chatid, myid, groupName,lastMessage,lastTime, navigation}) => {
    const timeAgo = new TimeAgo('en-US')    
    const onGroupChat = () =>{
      navigation.navigate('GroupChatScreen',{
        chatid,
        myid,
        uri,
        groupName,
      })
    }
    return(
      <TouchableOpacity style={styles.chatContainer} onPress={onGroupChat}>
          <View style={[styles.img,styles.imgWrapper]}>
           <Image style={styles.img} source={uri != '' ? {uri: uri} : require ('../../res/assets/images/profile.png') }/>
          </View>
          <View style={styles.chatUserDetailsWrapper}>
            <Text style={styles.chatUserName}>{groupName}</Text>
            <View style={styles.chatWrapper}>
             <MaterialIcon name="check-all" color={colors.primary} size={18} />
             <Text style={styles.chatText}>{lastMessage}</Text>
            </View>
          </View>
          <View style={styles.secondRow}>
           <Text style={styles.chatUserNameTime}>{timeAgo.format(lastTime)}</Text>
          </View>
       
      </TouchableOpacity> 
    )
  }

export default GroupChat