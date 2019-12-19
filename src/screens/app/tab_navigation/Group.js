import React, {useRef, useState, useEffect} from 'react'
import { Text, View,StyleSheet,ScrollView,FlatList, TouchableOpacity } from 'react-native'
import {colors} from '../../../res/style/colors'
import {fontSizes} from '../../../res/style/fontSize'
import {fonts} from '../../../res/style/fonts'
import { groupDetails } from "./../../../res/data/data"
import { loadUserData } from '../../../utils/db.js'
import GroupChat from '../../../components/GroupComponents/GroupChat'
import MaterialIcon from '../../../components/Shared/MaterialIcon'
import {withNavigation} from 'react-navigation'
import firebase from 'react-native-firebase'
const Group = (props) => {
    const { navigation } = props;
    const isLoaded = useRef(false);
    // phone number from Dashboard
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isDataLoad,setIsDataLoad] = useState(false)
    const [groupChatData, setGroupChatData] = useState([])

    let  [,setState] = useState();

    useEffect(() => {
      fetchGroupChatList()            
      return () => {
        isLoaded.current = true;
      }
    },[])
    
    // load group chat message list
    loadGroupMessageData = async(item, userkey) => {
      return new Promise(async resolve => {
        // last message id
        const lastMsg = await firebase.database()
          .ref('GroupMessageList')
          .child(item.key)
          .child(item.child('lastMsg').val())
          .once('value')
        item.forEach(async subItem => {
          if (subItem.val() === true && subItem.key !== userkey) {
            const user = await firebase.database()
              .ref('UserList')
              .child(subItem.key)
              .once('value')
            const data = {
              key: item.key,
              groupName: item.val().name,
              lastTime: item.val().lastTime,
              lastMessage: lastMsg.val() ? lastMsg.val().text : '',
              messageType: lastMsg.val() ? lastMsg.val().messageType : '',
              ...user.val()
            }
            resolve(data)  
          }
        })
      })
    }

    fetchGroupChatList = async() =>{
      let jsonData = await loadUserData()
      let userData = ''
      if(jsonData)
        userData = JSON.parse(jsonData)
      let userId = userData.phone
      setPhoneNumber(userId)
      setIsDataLoad(false)
      await firebase.database()
      .ref('GroupList')
      .orderByChild(userId)
      .equalTo(true)
      .on('value', snapshot => {
        let conversations = []
        let promises = []
        snapshot.forEach(item => {
          // displays only if there is chat history
          if(item.val().lastTime != undefined){
            promises.push(loadGroupMessageData(item, userId))
          }
        })

        Promise.all(promises).then(data => {
          data.forEach(item => conversations.push(item))
          conversations.sort((a, b) => {
            return b.lastTime - a.lastTime
          })          
          if (!isLoaded.current) {            
            setGroupChatData(conversations)
            conversations.forEach(item=>{
              console.log('Group :' + item.lastMessage)
            })
            setIsDataLoad(true)  
            setState({})
          }
        })
      })
    }
    onNewGroup = () => {
      requestAnimationFrame(() => {
          props.navigation.navigate('NewGroup',{
          showCallIcon : false,
          phoneNumber: phoneNumber
        })
      })
    }    
    return (
      <View style={styles.container}>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.createGroupWrapper}>
           <Text style={styles.createGroupText}>Create New Group</Text>
           <View style={styles.createGroupActionContainer}>
            <TouchableOpacity onPress = {onNewGroup} style={styles.firstRow}>
             <View style={styles.groupIconWrapper}>
              <MaterialIcon name="account-group" size={24} color={colors.white}/>
             </View>
             <Text style={styles.newGroupText}>New Group</Text>
            </TouchableOpacity>
           </View>
          </View>
          <View>
           <Text style={[styles.createGroupText,{paddingHorizontal:14}]}>Your Groups</Text>
           {
            <FlatList
             data={groupChatData}
             keyExtractor={(item) => item.key.toString()}
             renderItem={({ item }) => (
              <GroupChat 
                uri={item.avatar} 
                chatid={item.key}
                myid = {phoneNumber} 
                groupName={item.groupName} 
                lastMessage={item.lastMessage}
                lastTime={item.lastTime} 
                messageType={item.messageType}
                navigation={navigation}  />
            )}/>
           }
        
          </View>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor : colors.white
  },
  createGroupWrapper : {
    padding : 10,
    paddingHorizontal:14
  },
  createGroupText : {
    color : colors.primary,
    fontSize : fontSizes.small,
    fontFamily : fonts.Medium
  },
  createGroupActionContainer : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingVertical : 10
  },
  groupIconWrapper : {
    backgroundColor : colors.primary,
    width : 50,
    height : 50,
    borderRadius : 50/2,
    justifyContent : 'center',
    alignItems : 'center'
  },
  newGroupText : {
    fontSize : fontSizes.small,
    color : colors.black,
    fontFamily : fonts.SemiBold,
    marginLeft : 20
  },
  firstRow : {
    flexDirection : 'row',
    alignItems : 'center'
  },
  secondRow : {
    flexDirection : 'row',
    padding : 10,
  },
  icon : {
    marginLeft : 10
  },
})

export default withNavigation(Group)