import React,{useRef, useState, useEffect} from 'react'
import { Text, View,StyleSheet,ScrollView,StatusBar,TouchableOpacity,Modal,InteractionManager } from 'react-native'
import {colors} from '../../../res/style/colors'
import {fontSizes} from '../../../res/style/fontSize'
import {fonts} from '../../../res/style/fonts'
import {withNavigation} from 'react-navigation'
import { loadUserData } from '../../../utils/db.js'
import ProfileStatus from '../../../components/ChatComponents/ProfileStatus'
import UserChat from '../../../components/ChatComponents/UserChat'
import posed,{Transition} from 'react-native-pose'
import firebase from 'react-native-firebase'

const Overlay = posed.ScrollView({
  enter: { x: 0,staggerChildren: 100,delayChildren: 80, 
    transition : {
      type : 'spring',
      useNativeDriver : true
    }
  },
  exit: { x:0 }
});

const DeleteButtonView = posed.View({
  enter: { y: 0,opacity:1,
    transition : {
      type : 'spring',
      useNativeDriver : true
    }
  },
  exit: { y:380,opacity:0 }
});


const Chat = (props) => {
  
    const { navigation } = props;
    
    const isLoaded = useRef(false);

    const [modalVisible,setModalVisible] = useState(false)
    const [name,setName] = useState('')
    const [chatData,setChatData] = useState([])
    const [isDataLoad,setIsDataLoad] = useState(false)

    // phone number from Dashboard
    const [phoneNumber, setPhoneNumber] = useState('')

    let  [,setState] = useState();

    loadMessageData = async(item, userkey) => {
      return new Promise(async resolve => {
        // last message id
        const lastMsg = await firebase.database()
          .ref('MessageList')
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

    fetchChatList = async() =>{
      let jsonData = await loadUserData()
      let userData = ''
      if(jsonData)
        userData = JSON.parse(jsonData)
      let userId = userData.phone
      setPhoneNumber(userId)
      setIsDataLoad(false)
      await firebase.database()
      .ref('ChatList')
      .orderByChild(userId)
      .equalTo(true)
      .on('value', snapshot => {
        let conversations = []
        let promises = []
        snapshot.forEach(item => {
          // displays only if there is chat history
          if(item.val().lastTime != undefined){
            promises.push(loadMessageData(item, userId))
          }
        })

        Promise.all(promises).then(data => {
          data.forEach(item => conversations.push(item))
          conversations.sort((a, b) => {
            return b.lastTime - a.lastTime
          })          
          if (!isLoaded.current) {            
            setChatData(conversations)
            setIsDataLoad(true)  
            setState({})
          }
        })
      })
    }
    useEffect(() => {
      // react native load data when we click on button and we see freeze button
      //InteractionManger helps to load data after interacting screen..
      //InteractionManager.runAfterInteractions(() => {        
      //});
      console.log('Chats UseEffect called')
      fetchChatList()            

      return () => {
        isLoaded.current = true;
      }
    },[])

    const onDelete = (name) => {
       setName(name)
       setModalVisible(true)
    }


    return (
     <View style={styles.container}>
        <ScrollView style={{flex:1}} indicatorStyle="default" >
          
          {/* <View style={{borderBottomWidth : .4,borderBottomColor : colors.grey}}>
            <Transition animateOnMount={true} enterPose="enter" exitPose="exit">
              <Overlay horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusContainer} key="chat">
                <ProfileStatus uri="http://tiny.cc/whatsapp_profile" self={true} navigation={navigation}/>
                <ProfileStatus uri="http://tiny.cc/profile1" name="Jenni" navigation={navigation} />
                <ProfileStatus uri="http://tiny.cc/profile3" name="Preston" navigation={navigation} oneStatus={true}/>
                <ProfileStatus uri="http://tiny.cc/profile4" name="Estell" navigation={navigation}/>
                <ProfileStatus uri="http://tiny.cc/profile5" name="Zyan" navigation={navigation} oneStatus={true}/>
                <ProfileStatus uri="http://tiny.cc/profile6" name="Caryl" navigation={navigation} />
              </Overlay> 
            </Transition>
          </View> */}
          <Transition>
          {
            isDataLoad && 
           <Overlay key="chat"> 
            {
              chatData.map((item) => (                        
                <UserChat 
                  key={item.key} 
                  chatid={item.key} 
                  myid = {phoneNumber} 
                  uri={item.avatar} 
                  onDelete={()=>onDelete(item.name)} 
                  navigation={navigation} 
                  userName={item.name} 
                  isOnline={1} 
                  lastMessage={item.lastMessage} 
                  lastTime={item.lastTime} 
                  messageType={item.messageType}/>  
              ))
            }
           </Overlay>
           }
          </Transition> 
         <View style={styles.chatBottomMessageWapper}>
          <Text style={styles.chatBottomText}>Hold and slide on a chat for more options</Text>
         </View>
       </ScrollView>
       
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.modalContainer} onStartShouldSetResponder={() => setModalVisible(false)}>
           <StatusBar backgroundColor="#2200001C" barStyle="dark-content" />
           <Transition animateOnMount={true} enterPose="enter" exitPose="exit">
            <DeleteButtonView key="delete" style={{backgroundColor : colors.white,paddingTop : 20}}>
              <View style={styles.modalWrapper}>
                <Text style={styles.warning}>{`Are you sure, Do you want to delete Chat with ${name}`}</Text>
              </View>
              <View style={styles.actionWrapper}>
                <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(false)}>
                  <Text style={[styles.actionText,{color : colors.darkGrey}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                <Text style={[styles.actionText,{color : 'tomato'}]}>Delete</Text>
                </TouchableOpacity>
              </View>
             </DeleteButtonView> 
            </Transition>
          </View>
        </Modal> 
      </View>  
    ) 
}

const styles = StyleSheet.create({
    container : {
       flex : 1,
       backgroundColor : colors.white,  
       marginBottom : 70  
    },
    statusContainer : {
        justifyContent : 'space-around',
    },
    chatBottomMessageWapper : {
      paddingBottom:100,
      paddingTop:30,
      alignItems : 'center',
      justifyContent: "flex-start",
    },
    chatBottomText : {
      fontSize : fontSizes.verySmall,
      fontFamily : fonts.Medium,
    },
    modalContainer : {
      backgroundColor : '#2200001C',
      flex : 1,
      justifyContent : 'flex-end'
    },
    modalWrapper : {
      paddingHorizontal : 30 ,
      paddingVertical : 10
    },
    warning : {
      fontSize : fontSizes.medium,
      fontFamily : fonts.Medium,
      textAlign : 'center'
    },
    actionWrapper : {
      flexDirection : 'row',
    },
    actionButton : {
      width : '50%',
      padding : 20,
      justifyContent : 'center',
      alignItems : 'center'
    },
    actionText : {
      fontSize : fontSizes.medium,
      fontFamily : fonts.Medium
    }
 
   
})

export default withNavigation(Chat)