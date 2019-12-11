import React from 'react'
import { Text, View,Image } from 'react-native'
import {styles} from '../../res/style/CommonStyle/ChatStyle'
import {colors} from '../../res/style/colors'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const GroupChat = ({uri,userName,message,time='2:00pm'}) => {
  
    return(
      <View style={styles.chatContainer}>
          <View style={[styles.img,styles.imgWrapper]}>
           <Image style={styles.img} source={{uri}}/>
          </View>
          <View style={styles.chatUserDetailsWrapper}>
            <Text style={styles.chatUserName}>{userName}</Text>
            <View style={styles.chatWrapper}>
             <MaterialIcon name="check-all" color={colors.primary} size={18} />
             <Text style={styles.chatText}>{message}</Text>
            </View>
          </View>
          <View style={styles.secondRow}>
           <Text style={styles.chatUserNameTime}>{time}</Text>
          </View>
       
      </View> 
    )
  }

export default GroupChat