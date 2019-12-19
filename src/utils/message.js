import firebase from 'react-native-firebase'

// This function is used tos send Single Chat 
export const onSendSingleChat = async (chatid, senderid, text, audio, uri, messageType,) => {
    // if input text is empty
   if(text.length === 0)
     return
   // send message
   const message = {
     sender: senderid,
     audio: '',
     text: text,
     uri: '',
     messageType: "TEXT",
     timeStamp: Date.now()      
   }

   const messageKey = await firebase.database()
     .ref('MessageList')
     .child(chatid)
     .push(message).key

   await firebase.database()
     .ref('ChatList')
     .child(chatid)
     .child('lastMsg')
     .set(messageKey)

   await firebase.database()
     .ref('ChatList')
     .child(chatid)
     .child('lastTime')
     .set(message.timeStamp)
  }
  export const onSendGroupChat = async (chatid, senderid, text, audio, uri, messageType,) => {
    // if input text is empty
   if(text.length === 0)
     return
   // send message
   const message = {
     sender: senderid,
     audio: '',
     text: text,
     uri: '',
     messageType: "TEXT",
     timeStamp: Date.now()      
   }

   const messageKey = await firebase.database()
     .ref('GroupMessageList')
     .child(chatid)
     .push(message).key

   await firebase.database()
     .ref('GroupList')
     .child(chatid)
     .child('lastMsg')
     .set(messageKey)

   await firebase.database()
     .ref('GroupList')
     .child(chatid)
     .child('lastTime')
     .set(message.timeStamp)
  }