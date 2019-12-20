import React,{useRef, useState, useEffect} from 'react'
import { Text, View,StyleSheet, StatusBar,TextInput,Image,ScrollView,TouchableOpacity,Keyboard } from 'react-native'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import {OnlineOffline} from '../../components/Shared/Index'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {Icon,MaterialIcon} from '../../components/Shared/Index'
import {chatDetails} from "../../res/data/data"
import {MoneyChat,GalleryChat} from '../../components/ChatComponents/ChatType'

import {moderateScale} from '../../res/style/scalingUnit'
import { onSendSingleChat } from '../../utils/message.js'

import posed,{Transition} from 'react-native-pose';
import firebase from 'react-native-firebase'

import TimeAgo from 'javascript-time-ago' 
// The desired locales.
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)

const attachmentIcons = [
  {
    id : 1,
    name : 'Document',
    iconName : 'document',
    colorCode : colors.documentIcon
  },
  {
    id : 2,
    name : 'Payment',
    iconName : 'rupee',
    colorCode : colors.paymentIcon
  },
  {
    id : 3,
    name : 'Gallery',
    iconName : 'gallery',
    colorCode : colors.galleryIcon
  },
  {
    id : 4,
    name : 'Audio',
    iconName : 'music',
    colorCode : colors.musicIcon
  },
  {
    id : 5,
    name : 'Location',
    iconName : 'location',
    colorCode : colors.locationIcon
  },
  {
    id : 6,
    name : 'Profile',
    iconName : 'profile',
    colorCode : colors.profileIcon
  },
]


const config = {
  enter : {
    opacity :1,
    y :0,
    scale:1,
    staggerChildren: 60,
    delayChildren: 100,
  },
  exit : {
    opacity : 0,
    y :200,
    scale : 0,
    delay : 100
  }
}

const attachmentIconConfig = {
  enter : {
    opacity :1,
    scale :1,
  },
  exit : {
    opacity : 0,
    scale : 0
  }
}

const AttachmentView = posed.View(config)
const AttachmentIcon = posed.View(attachmentIconConfig)

const ChatScreen = (props) => {

   const chatid = props.navigation.getParam('chatid')
   const isLoaded = useRef(false);
   const [myid, setId] = useState(props.navigation.getParam('myid'))
   const [uri, setUri] = useState(props.navigation.getParam('uri'))
   const [username, setUsername] = useState(props.navigation.getParam('userName'))
   const [status, setStatus] = useState(props.navigation.getParam('isOnline'))
   const [messages, setMessages] = useState([])
   const [text, setTextMessage] = useState('')
   const [isAttachmentContentShow, setAttachmentContentShow] = useState(false)
   const [keyboardHeight,setKeyboardHeight] = useState(0)
   const [isKeyboardShow,setKeyboardShow] = useState(false)
   // is used to render again
   let  [,setState] = useState();

   const chatType = (type,isSend,text,uri="") =>{   
       switch (type) {
         
         case "TEXT":
           return (<Text style={isSend ? styles.sentText : styles.receivedText}>{text}</Text>) 
          
         case "MONEY":
           return (<MoneyChat/>)
         
         case "GALLERY":
              return (<GalleryChat uri={uri} text={text}/>)   
         default:
            break;
       }
   }

   const onSend = async () => {
     // if input text is empty
    if(text.length === 0)
      return
    // send message
    onSendSingleChat(chatid, myid, text, '', '', 'TEXT')

    setTextMessage('')
   }

   const onAttachmentIcon = () => {
    Keyboard.dismiss() 
    setAttachmentContentShow(!isAttachmentContentShow)
   }

    useEffect(() => {
      let keyboardDidShowSub = Keyboard.addListener(
        "keyboardDidShow",
        keyboardDidShow
      );
      let keyboardDidHideSub = Keyboard.addListener(
        "keyboardDidHide", //keyboardWillHide
        keyboardDidHide
      );

      return ()=>{
        keyboardDidShowSub.remove();
        keyboardDidHideSub.remove();
      }
    })
    onMessage = async () => {
      let chatMsg = []
      snapshot = await firebase.database()
      .ref('MessageList')
      .child(chatid)
      .on('child_added', snapshot => {
        const message = {
          key: snapshot.key,
          ...snapshot.val()
        }
        if(!isLoaded.current){

        const timeAgo = new TimeAgo('en-US')
        message.timeStamp = timeAgo.format(message.timeStamp)
        chatMsg.push(message)
        setMessages(chatMsg)
        console.log('Chat Screen useEffect called')
        setState({})  
        }
        //passing empty object will re-render the component
        
      })

    }
    useEffect(() => {      
      onMessage()
      return() =>{
        isLoaded.current = true;
        console.log('Chat Screen useEffect returned' + isLoaded.current)
      }
    },[])

    keyboardDidShow = event => {
       setAttachmentContentShow(false)
       setKeyboardShow(true)
       setKeyboardHeight(event.endCoordinates.screenY)
    };
    
    keyboardDidHide = event => {
      setKeyboardShow(false)
    };

    const onCamera = () => {
      props.navigation.navigate('CameraScreen',{
        uri
      })
    }

    const onProfile = () => {

      props.navigation.navigate('ContactProfileScreen', {
        id,
        uri,
        username,
        status
      })
    }

    onCall = () => {
      props.navigation.navigate('Calling',{
        uri,
        name : username
      })
    }

    return (
     
      <View style={{flex:1}} onStartShouldSetResponder={() => setAttachmentContentShow(false)}>
        <StatusBar animation={true} backgroundColor={colors.white} barStyle="dark-content"  />
        <View style={styles.headerContainer}>
         <View style={styles.firstRow}>
          <MaterialIcon onPress={() => {props.navigation.goBack()}} name="arrow-left" size={24} color={colors.primary} />
           <TouchableOpacity activeOpacity={.8} onPress={onProfile} style={styles.userDetail}>
              <View style={[styles.img,{backgroundColor:colors.lightGrey}]}>
               <Image style={styles.img} source={{uri}}/>
              </View>
              <OnlineOffline userWrapperStyle={styles.userWrapperStyle} isOnline={status} />
              <Text style={styles.searchText}>{username}</Text>
          </TouchableOpacity>
         </View>
         <View style={styles.secondRow}>
          <MaterialIcon name="video" size={24} color={colors.primary} />
          <MaterialIcon onPress={onCall} name="phone" size={24} color={colors.primary} />
          <MaterialIcon name="dots-horizontal-circle" size={24} color={colors.primary} />
         </View>
        </View>
        <ScrollView style={styles.inverted} contentContainerStyle={styles.content}>
          {
            messages.map((chats)=>{
              
              const isSend =  chats.sender === myid
              const messageType = chats.messageType === 'MONEY'        
              return(
                <View key={chats.key} style={[isSend ? styles.sentContainer : styles.receivedContainer,styles.inverted]}>
                 <View style={{  paddingVertical: 4,paddingHorizontal: 6,}}>
                  <View 
                   style={[[styles.bubble,messageType && { paddingVertical: 0,
                    paddingHorizontal: 0,}],isSend ? [styles.sent,styles.sendBorderRadiusStyle,messageType && {backgroundColor:'transparent',padding:0}] : [styles.received,styles.receivedBorderRadiusStyle,messageType && {backgroundColor:'transparent'}]]}>
                   {
                     chatType(chats.messageType,isSend,chats.text,chats.uri)
                   }
                   </View>
                   <View style={[styles.timeContainer,isSend && {justifyContent:'flex-end'}]}>
                   <Text style={styles.timeText}>{chats.timeStamp}</Text>
                   {
                     isSend && (
                      <MaterialIcon  style={styles.checkMarkIcon} name="check-all" color={colors.primary} size={14} />
                     )
                   }
                     </View>
                 </View>
                </View>
              )
            }).reverse()
          }
        </ScrollView>
        <Transition>
         { isAttachmentContentShow && <AttachmentView key="attach" style={[styles.attachmentContentWrapper, isKeyboardShow && {transform : [{ translateY : keyboardHeight }],zIndex : 99999}]}>
            { attachmentIcons.map((item) => (
              <AttachmentIcon key={item.id} style={styles.iconContainer}>
               <View style={[styles.iconWrapper,{borderColor:item.colorCode}]}>
                <Icon name={item.iconName} color={item.colorCode} size={moderateScale(22)}/>
               </View>
               <Text style={styles.iconText}>{item.name}</Text>
              </AttachmentIcon>
            )) }
          </AttachmentView>}
        </Transition>
        <View style={styles.writeMessageContainer}>
         <View style={styles.firstCol}>
          <Fontisto style={{marginTop : 6}} name="smiley" size={20} color={colors.darkGrey}/>
          <TextInput 
            style={styles.input}
            placeholder="Type your message"
            underlineColorAndroid="transparent"
            multiline={true}
            onFocus={() => isAttachmentContentShow && setAttachmentContentShow(false)}
            onChangeText={(text) => {setTextMessage(text)}}
            value={text}
          />
         </View>
         <View style={styles.secondCol}>
           <MaterialIcon onPress={onAttachmentIcon}
            style={styles.iconContentContainer}  
            name="attachment" iconStyle={styles.attachIcon} size={24} color={colors.darkGrey} />
           <MaterialIcon onPress={onCamera} 
            style={styles.iconContentContainer}  name="camera" size={24} color={colors.darkGrey} />

            {
              text.length === 0 ? (
              <MaterialIcon name="microphone" style={styles.sendIconWrapper} size={22} color={colors.white}/>) : 
              (<MaterialIcon onPress={onSend} iconStyle={{marginLeft:6}} style={styles.sendIconWrapper} name="send" size={22} color={colors.white}/>)
            }
         </View>
        </View>
      </View>

    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor : colors.white
    },
    headerContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        paddingHorizontal : 14,
        paddingVertical : 10,
        justifyContent : 'space-between',
        borderBottomWidth : 1,
        borderBottomColor : colors.lightGrey
      },
    userDetail : {
        marginLeft : 10,
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        flex : 1,
        paddingRight : 8,
        paddingVertical : 2,
    },
    searchText : {
        fontSize : fontSizes.medium,
        color : colors.black,
        fontFamily : fonts.Medium,
        marginLeft : 12
      },
    firstRow : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        width : '60%',
      },
    secondRow : {
        flexDirection : 'row',
        width : '40%',
        justifyContent : 'space-around',
        alignItems : 'center'
      },
    img : {
        width : 50,
        height: 50,
        borderRadius: 50/2,
   }, 
   userWrapperStyle : {
        bottom:-4,
        left:20,
   },
   userContainerStyle : {
        width:6,
        height:6,
        borderRadius:6/2,
   },
   inverted : {
       transform: [{ scaleY: -1 }],
   },
   content : {
       padding : 10
   },
  receivedContainer: {
       flexDirection: 'row',
  },
  sentContainer: {
      flexDirection: 'row-reverse',
  }, 
  bubble: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      alignItems : 'center',
      justifyContent : 'center'
  },
  sent: {
      backgroundColor: colors.primary,
  },
  received: {
      backgroundColor: colors.lightGrey,
  },
  sentText: {
     color: colors.white,
     fontSize : fontSizes.small,
     fontFamily : fonts.Regular
  },
  receivedText: {
     color: colors.black,
     fontSize : fontSizes.small,
     fontFamily : fonts.Regular
  },
  sendBorderRadiusStyle : {
    borderTopStartRadius : 6,
    borderTopRightRadius : 6,
    borderBottomEndRadius : 6
  },
  receivedBorderRadiusStyle : {
    borderTopStartRadius : 6,
    borderBottomRightRadius : 6,
    borderBottomStartRadius : 6
  },
  input : {
    flex:1,
    height: 50,
    paddingVertical: 10,
    marginLeft : 10,
    paddingRight:5,
    fontSize : fontSizes.medium,
  },
  writeMessageContainer : {
    flexDirection : 'row',
    paddingBottom : 6,
    borderTopWidth : .8,
    borderTopColor : '#E7E7E7'
  },
  firstCol : {
    flexDirection : 'row',
    alignItems : 'center',
    paddingHorizontal: 10,
    width : '60%'
  },
  secondCol : {
    flexDirection : 'row',
    paddingHorizontal: 4,
    justifyContent : 'space-between',
    alignItems : 'center',
    width :'40%',
    paddingHorizontal: 10,
    
  },
  timeContainer : {
    paddingVertical : 2,
    paddingHorizontal : 4,
    flexDirection : 'row',
  },
  timeText : {
    fontSize : fontSizes.tinySmall,
    fontFamily : fonts.Regular,
    color : colors.darkGrey
  },
  checkMarkIcon : {
    marginLeft : 4,
    alignSelf : 'flex-start',
    padding:0
  },
  attachIcon : {
    transform : [{rotate : '315deg'}]
  },
  sendIconWrapper : {
    padding:1,
    width : 40,
    height:40,
    borderRadius:40/2,
    backgroundColor:colors.primary,
    justifyContent:'center',
    alignItems: 'center'
  },
  iconContainer : {
    alignItems : 'center',
    marginHorizontal : 20,
    marginVertical : 10
  },
  attachmentContentWrapper : {
    position : 'absolute',
    bottom : 56,
    paddingVertical : 10,
    paddingHorizontal : 20,
    margin : 10,
    backgroundColor : colors.white,
    flexWrap : 'wrap',
    flexDirection : 'row',
    justifyContent : 'space-evenly',
    borderWidth : .8,
    borderColor : '#E7E7E7',
    borderRadius : 10
  },
  iconWrapper : {
    width : moderateScale(55),
    height : moderateScale(55),
    borderRadius : moderateScale(55)/2,
    borderWidth : .8,
    justifyContent : 'center',
    alignItems : 'center'
  },
  iconText : {
    fontSize : 12,
    color : colors.black,
    marginTop : 10,
    fontFamily : fonts.Regular
  },
  iconContentContainer : {
    padding : 6
  },
  icon : {
    marginHorizontal: 4
  }
})

export default ChatScreen