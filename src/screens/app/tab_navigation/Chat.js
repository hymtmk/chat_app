import React,{useState,useEffect} from 'react'
import { Text, View,StyleSheet,ScrollView,StatusBar,TouchableOpacity,Modal,InteractionManager } from 'react-native'
import {colors} from '../../../res/style/colors'
import {fontSizes} from '../../../res/style/fontSize'
import {fonts} from '../../../res/style/fonts'
import {withNavigation} from 'react-navigation'
import ProfileStatus from '../../../components/ChatComponents/ProfileStatus'
import UserChat from '../../../components/ChatComponents/UserChat'
import posed,{Transition} from 'react-native-pose'

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
      
    const [modalVisible,setModalVisible] = useState(false)
    const [name,setName] = useState('')
    const [data,setData] = useState([])
    const [isDataLoad,setIsDataLoad] = useState(false)

    useEffect(() => {
      // react native load data when we click on button and we see freeze button
      //InteractionManger helps to load data after interacting screen..
      InteractionManager.runAfterInteractions(() => {
         const { chatUsers } = require("../../../res/data/data")
         setData(chatUsers)
         setIsDataLoad(true);
      });
    },[])

    const onDelete = (name) => {
       setName(name)
       setModalVisible(true)
    }


    return (
     <View style={styles.container}>
        <ScrollView style={{flex:1}} indicatorStyle="default" >
          <View style={{borderBottomWidth : .4,borderBottomColor : colors.grey}}>
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
          </View>
          <Transition>
          {
            isDataLoad && 
           <Overlay key="chat"> 
            {
              data.map((item) => (
                <UserChat key={item.id} id={item.id} uri={item.avatar} onDelete={()=>onDelete(item.name)} chatId={item.chatId} navigation={navigation} userName={item.name} isOnline={item.isOnline} message="Hello Nilesh Kadam" time="2:00 pm"/>  
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