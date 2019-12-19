import React,{useEffect,useState} from 'react'
import { Text, View,StyleSheet, StatusBar,Animated, TouchableOpacity,TextInput, Alert, Image, Dimensions, } from 'react-native'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import firebase from 'react-native-firebase'
import MaterialIcon from '../../components/Shared/MaterialIcon'
import Feather from 'react-native-vector-icons/Feather'
import ContactItem from '../../components/ContactComponents/ContactItem'
import { getFileName } from '../../utils/utils'
import { onSendGroupChat } from '../../utils/message.js'
import posed,{Transition} from 'react-native-pose'
import { FlatList } from 'react-native-gesture-handler'
import { ProgressDialog } from 'react-native-simple-dialogs'
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker'

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const NewGroup = (props) => {

    const showCallIcon  = props.navigation.getParam('showCallIcon')
    const [data,setData] = useState([])
    const [isDataLoad,setIsDataLoad] = useState(false)
    const [selected, setSelected] = useState(new Map())
    const [visibleForProgressDialog, setVisibleForProgressDialog] = useState(false)
    const [messageForProgressDialog, setMessageForProgressDialog] = useState('')
    const [groupName, setGroupName] = useState('')
    // local avatar file info
    const [localAvatar, setLocalAvatar] = useState('')
    const [localAvatarFileName, setLocalAvatarFileName] = useState('')
    // server avatar file
    const [avatarRef, setAvatarRef] = useState('')
    const [avatarSource, setAvatarSource] = useState('')
    // phoneNumber from Dashbaord
    const [phoneNumber, setPhoneNumber] = useState(props.navigation.getParam('phoneNumber'))

    const [animatedValue,setAnimatedValue] = useState(new Animated.Value(1)) //animation value to hide/show login button

    useEffect(() => {      
        fetchContacts()        
    },[])

    setProgressDialogText = (message, visible) => {
      setMessageForProgressDialog(message)
      setVisibleForProgressDialog(visible)
    }
    fetchContacts = async () => {
      let promises = []
      snapshot = await firebase.database().ref('UserList').once('value')
      snapshot.forEach(item => {        
        if(item.key !== phoneNumber){
          promises.push(item.val())  
        }
      })
      setData(promises)
      setIsDataLoad(true);
    }
    // called when user select avatar
    selectAvatar = async () => {
      ImagePicker.showImagePicker(null, async response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker')
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error)
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton)
        } else {
          setLocalAvatar(response.path)
          setLocalAvatarFileName(response.fileName)
          
          //upload avatar to server
          setProgressDialogText('Please wait for a while...', true)
          if(avatarRef !== '')
            await firebase.storage().ref(avatarRef).delete()
          const rImage = await firebase.storage().ref('/groupRoomPics/' + getFileName(response.fileName)).putFile(response.path)
          setAvatarRef(rImage.ref)
          setAvatarSource(rImage.downloadURL)
          setProgressDialogText('', false)
        }
      })
    }
    // This function is called when user select contact
    onSelect = (id) =>{
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      console.log("Selected:" + id)
      setSelected(newSelected);
    }
    // This function is for creating group room
    onCreateGroupRoom = async () =>{
      let selectedCount = 0
      data.forEach(item=>{
        if(!!selected.get(item.phone))
          selectedCount++
      })        
      if(selectedCount<1){
        Toast.showWithGravity("Please select persons to add", Toast.LONG, Toast.CENTER)
        return
      }
      if(groupName.trim() == ''){
        Toast.showWithGravity("Provide a group subject and optional group icon", Toast.LONG, Toast.CENTER)
        return
      }
      // Create Room Started...
      let GroupRoom = {}
      setProgressDialogText('Creating Group...', true)
      GroupRoom[phoneNumber] = true
      data.forEach(item=>{
        if(!!selected.get(item.phone))
          GroupRoom[item.phone] = true
      })        
      GroupRoom['avatar'] = avatarSource
      GroupRoom['name'] = groupName
      GroupRoom['createdby'] = phoneNumber
      GroupRoom['lastTime'] = Date.now()
      let chatid = await firebase.database().ref('GroupList').push(GroupRoom).key
      await onSendGroupChat(chatid, phoneNumber, 'Hello, This is ' + groupName, '', '', 'TEXT')
      setProgressDialogText('', false)
      props.navigation.goBack()
    }
    //when keyboard is showing button will translateY to 100 mean it will hide behind the keyboard 
    const translateY = animatedValue.interpolate({
      inputRange : [0,1],
      outputRange : [100,0]
    })

    //when keyboard hide button will come in there real position and it's 0
    const opacity = animatedValue.interpolate({
      inputRange : [0,1],
      outputRange : [0,1]
    })
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.headerContainer}>
         <View style={styles.firstRow}>
          <MaterialIcon style={styles.icon} onPress={() => {props.navigation.goBack()}} name="arrow-left" size={24} color={colors.primary} />
          <Text style={styles.searchText}>New Group</Text>
         </View>
         <View style={styles.endRow}>
          <Feather style={styles.icon} name="search" size={22} color={colors.primary} />
         </View>
        </View>
        <View style={styles.createGroupWrapper}>
          <View style={styles.createGroupActionContainer}>
            <View style={styles.groupRow}>
              <TouchableOpacity 
                style={styles.groupIconWrapper}
                onPress = {selectAvatar}>
                  {
                    localAvatar !== ''
                    ? <Image source={{uri:'file:///' + localAvatar}} style = {styles.defaultGroupRoomImg}/> 
                    : <MaterialIcon name="camera-account" size={24} color={colors.white}/>
                  }
                
              </TouchableOpacity>
              <TextInput 
                placeholder="Type group subject here..."
                style={styles.newGroupText}
                onChangeText={(text) => {setGroupName(text)}}
                value ={groupName}
                underlineColorAndroid={
                  colors.darkGrey
                }/>
            </View>
            <Text
              style={styles.newGroupTip}
              >Provide a group subject and optional group icon</Text>
          </View>
        </View>
        {
          isDataLoad && 
          <FlatList 
            data = {data}
            keyExtractor={(item, index) => `${index}`}
            extraData={selected}
            renderItem={({ item }) => (
            <ContactItem
              id = {item.phone}
              myid={phoneNumber} 
              userid={item.phone} 
              uri={item.avatar} 
              userName={item.name} 
              selected = {!!selected.get(item.phone)}
              onSelect= {onSelect}
              status={'I am using WhatsApp'} 
              showCallIcon={showCallIcon}
              navigation={props.navigation} 
            />
           )}
          />
        }
        <AnimatedTouchableOpacity activeOpacity={.8} onPress={() => onCreateGroupRoom()} 
           style={[styles.bottomButtonContainer,{transform :[{translateY}],opacity}]}>
           <MaterialIcon color={colors.white} name="arrow-right" size={24}/>
        </AnimatedTouchableOpacity>
        <View >
            <ProgressDialog
                style = {styles.progressDialog}
                activityIndicatorSize = "large"
                animationType = "slide"
                message = { messageForProgressDialog }
                visible = { visibleForProgressDialog }/>
        </View>
      </View>
    )
}

export default NewGroup

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.white,
    },
    headerContainer : {
      flexDirection : 'row',
      alignItems : 'center',
      padding : 14,
      justifyContent : 'space-between',
      borderBottomWidth : 1,
      borderBottomColor : colors.lightGrey
    },
    searchText : {
      fontSize : fontSizes.medium,
      color : colors.black,
      fontFamily : fonts.Medium,
      marginLeft : 20
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
    endRow : {
      flexDirection : 'row',
      width : '40%',
      justifyContent : 'flex-end',
      alignItems : 'center'
    },
    groupRow : {
      flexDirection : 'row',
      justifyContent : 'flex-start',
      alignItems : 'flex-start',      
    },
    bottomContainer : {
      padding : 10,
    },
    bottomMessageWrapper : {
      flexDirection : 'row',
      paddingHorizontal : 10,
      paddingVertical : 14,
      alignItems : 'center'
    },
    messageText: {
      fontSize : fontSizes.medium,
      fontFamily : fonts.Medium,
      color : colors.black,
      marginLeft : 20
    },
    bottomButtonContainer : {
      backgroundColor : colors.primary,
      width : 60,
      height : 60,
      position : 'absolute',
      bottom : 20,
      right : 20,
      borderRadius : 60/2,
      justifyContent : 'center',
      alignItems : 'center',
    },
    createGroupWrapper : {
      padding : 10,
      paddingHorizontal:10,
      backgroundColor: colors.lightGrey
    },
    createGroupActionContainer : {
      flexDirection : 'column',
      alignItems : 'flex-start',
      justifyContent : 'space-between',
      paddingVertical : 10
    },
    groupIconWrapper : {
      backgroundColor : colors.primary,
      width : 60,
      height : 60,
      borderRadius : 60/2,
      justifyContent : 'center',
      alignItems : 'center'
    },
    defaultGroupRoomImg : {
      width : 60,
      height : 60,
      borderRadius : 60
    },
    newGroupTip : {
      fontSize : fontSizes.small,
      color : colors.black,
      fontFamily : fonts.Regular,
      marginTop: 10,
    },
    newGroupText : {
      width: '80%',
      fontSize : fontSizes.small,
      color : colors.black,
      fontFamily : fonts.SemiBold,
      marginLeft : 20
    },
    progressDialog: {
      width: SCREEN_WIDTH*9/10,
      flexDirection : 'row',        
      alignItems: 'center'
    },
  
})