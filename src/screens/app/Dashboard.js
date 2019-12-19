import React,{useState, useEffect} from 'react'
import { Text, View,StyleSheet,Image,StatusBar,TouchableOpacity,Modal,Dimensions} from 'react-native'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import {OnlineOffline} from '../../components/Shared/Index'
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import { loadUserData } from '../../utils/db.js'
import Animated from 'react-native-reanimated';
import Camera from './tab_navigation/Camera';
import Chat from './tab_navigation/Chat'
import Group from './tab_navigation/Group'
import Calls from './tab_navigation/Calls'

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)
const { interpolate, Extrapolate } = Animated;
const AnimateIcon = Animated.createAnimatedComponent(MaterialIcon)
const AnimateCameraIcon = Animated.createAnimatedComponent(Icon)

const HEADER_HEIGHT = 70 //header height
const TAB_TRANSLATE = -50 // translateY 

const Dashboard = (props) => {
   
    const [modalVisible,setModalVisible] = useState(false)
    const [index,setIndex] = useState(0)
    const [routes,setRoutes] = useState([
      { key: 'chat', title: 'Chat' },
      { key: 'groups', title: 'Groups' },
      { key: 'calls', title: 'Calls' },
    ],)
    const [userData, setUserData] = useState([{
      name: '',
      phone: '',
      avatar: ''

    }])
    //track position of tabs for animation
    const [position,setPosition] = useState(new Animated.Value(1))  
    
    useEffect(() => {
     
      loadUserData((err, result) => {
          if(result){
            let data = JSON.parse(result);
            setUserData(data)            
          } 
      })
    }, []); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

    onOption = () => {
      requestAnimationFrame(() => {
       setModalVisible(true)
      })
    }

    onSetting = () => {
      requestAnimationFrame(() => {
        setModalVisible(false)
        props.navigation.navigate('Setting')
      })
    }

    //change bottom icon based on tab
    const setBottomIconName = (screen) =>{
     if(screen === 0){
       return "android-messages"
     } else if(screen === 1){
       return "account-multiple-plus"
     } else if(screen === 2){
       return "phone-plus"
     }
    }

    const setOnPress = (screen) => {
     if(screen === 0){
      return onContact
     } else if(screen === 1){
      return onNewGroup
     } else if(screen === 2){
      return onAddCall
     }
    }

    onContact = () => {
       requestAnimationFrame(() => {
         props.navigation.navigate('Contact',{
         showCallIcon : false,
         phoneNumber: userData.phone
        })
       })
/*
      requestAnimationFrame(() => {
        props.navigation.navigate('InviteFriend',{
        showCallIcon : false
       })
      })
*/      
    }

    onAddCall = () => {   
       requestAnimationFrame(() => {
          props.navigation.navigate('Contact',{
          showCallIcon : true
        })
       })   
    }

   onNewGroup = () => {
    requestAnimationFrame(() => {
      props.navigation.navigate('NewGroup',{
      showCallIcon : false,
      phoneNumber: userData.phone
     })
    })
   }
  
  //I used this in renderLabel because i want camera icon in my tab bar..
  const getLabel = ({route,color}) => {
    if (route.key === 'camera') {
      return <AnimateCameraIcon name='camera' size={20} color={color}/>
    } else if (route.key === 'chat') {
      return <Animated.Text style={[styles.tabBarLabel,{color}]}>{route.title}</Animated.Text>
    } else if (route.key === 'groups') {
      return <Animated.Text style={[styles.tabBarLabel,{color}]}>{route.title}</Animated.Text>
    } else if (route.key === 'calls') {
      return <Animated.Text style={[styles.tabBarLabel,{color}]}>{route.title}</Animated.Text>
    }
  }

    //tab position will change to 0 means to camera then header will get change to translateY
    const animateTranslateY = interpolate(position,{ 
      inputRange : [0,1,2],
      outputRange : [0,0,0 ],
    })
  
    //tab position will change to 0 means to camera then tabBar will get change to translateY
    const tabTranslateY = interpolate(position,{ 
     inputRange : [0,1,2],
     outputRange : [HEADER_HEIGHT,HEADER_HEIGHT,HEADER_HEIGHT ],
    })    
   
    //tab position will change to 0 means to camera then bottom button opacity change
    const opacity = interpolate(position,{ 
      inputRange : [0,1],
      outputRange : [1,1],
      extrapolate : Extrapolate.CLAMP
    })    

    return (
      <View style={styles.container} onStartShouldSetResponder={() => setModalVisible(false) }>
         <StatusBar backgroundColor={index===-1 ? "#000" : colors.white} animated={true} barStyle="dark-content" />
         <Animated.View style={[styles.headerWrapper, {transform:[{translateY : animateTranslateY}]}]}>
           <Animated.View style={[styles.headerCol,{transform:[{translateY : animateTranslateY}]}]}>
            <View style={[styles.profileImg,styles.imgWrapper]}>
             <Image style={styles.profileImg} source={
               userData.avatar !== ''
              ? { uri: userData.avatar}
              : require ('../../res/assets/images/profile.png')}/>
            </View>
            <OnlineOffline userWrapperStyle={styles.userWrapperStyle} isOnline={true} />
            <Text style={styles.userNameText}>{userData.name}</Text>
           </Animated.View>
           <Animated.View style={[styles.headerCol,{transform:[{translateY : animateTranslateY}]}]}>
             <Feather style={styles.icon} name="search" size={24} color={colors.primary} />
             <TouchableOpacity style={{padding:6}} onPress={onOption}>
              <MaterialIcon style={styles.icon} name="dots-horizontal-circle" size={24} color={colors.primary} />
             </TouchableOpacity>
           </Animated.View>
         </Animated.View>
         <Animated.View style={[styles.tabBarWrapper,
          {transform:[{translateY : tabTranslateY}]},{marginBottom : TAB_TRANSLATE}]}> 
          <TabView
            renderTabBar={props =>
              <TabBar
                {...props}
                activeColor={colors.primary}
                inactiveColor={colors.grey}
                style={styles.tabBar}
                renderLabel={props => getLabel(props)}
                indicatorStyle={{backgroundColor:colors.primary}}
              />}
            navigationState={{index,routes}}
            renderScene={SceneMap({              
              chat: Chat,
              groups : Group,
              calls : Calls
            })}
            style={{backgroundColor:colors.white}}
            position={position}
            onIndexChange={index => setIndex(index)}
            initialLayout={{ width: Dimensions.get('window').width }}
          />
         </Animated.View>
          { /*index !==-1 &&*/ (
              <AnimatedTouchable activeOpacity={.8} onPress={setOnPress(index)}  style={[styles.messageIconWrapper,{opacity}]}>
                <AnimateIcon name={setBottomIconName(index)} color={colors.white} size={26}/>
              </AnimatedTouchable>
          )}
  
         <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.modalContainer} onStartShouldSetResponder={() => setModalVisible(false)}>
           <View style={styles.sideModalContainer}>
             <TouchableOpacity style={styles.optionContainer}>
               <Text style={styles.optionText}>New Group</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.optionContainer}>
               <Text style={styles.optionText}>New Broadcast</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.optionContainer}>
               <Text style={styles.optionText}>WhatsApp Web</Text>
             </TouchableOpacity>  
             <TouchableOpacity style={styles.optionContainer}>
               <Text style={styles.optionText}>Starred Messages</Text>
             </TouchableOpacity>   
             <TouchableOpacity style={styles.optionContainer} onPress={onSetting}>
               <Text style={styles.optionText}>Setting</Text>
             </TouchableOpacity>
            </View> 
          </View>
        </Modal>
      </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        color : colors.white
    },
    tabBarWrapper : {
      backgroundColor: colors.white, 
      flex:1,
    },
    tabBar : {
      backgroundColor : colors.white,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 2,
    },
    tabBarLabel : {
      textAlign : 'center',
      fontFamily : fonts.Medium,
      textTransform : 'capitalize',
      fontSize : 14,
      marginBottom : 0
    },
    headerWrapper : {
        flexDirection : 'row',
        paddingVertical: 10,
        paddingHorizontal:10,
        alignItems : 'flex-end',
        justifyContent : 'space-between',
        width : '100%',
        position : 'absolute',
        height : HEADER_HEIGHT,
        backgroundColor : colors.white,
    },
    headerCol : {
      flexDirection:'row',alignItems:'center'
    },
    userNameText : {
        fontFamily : fonts.SemiBold,
        fontSize : fontSizes.xmedium,
        color : colors.black,
        marginLeft : 10
    },
    imgWrapper : {
      justifyContent : 'center',
      alignItems : 'center',
      backgroundColor : colors.lightGrey
    },
    profileImg : {
        width : 50,
        height:50,
        borderRadius:50/2,
    },
    userWrapperStyle : {
      bottom:-4,
      left:20
    },
    icon : {
        margin : 10
    },
    modalContainer : {
      backgroundColor : '#00000000', //transparent color
      flex : 1,
      alignItems : 'flex-end',
      paddingTop : 8,
      paddingRight:6
    },
    sideModalContainer : {
      paddingVertical : 4,
      paddingLeft : 10,
      paddingRight : 50,
      backgroundColor : colors.white,
      borderRadius : 4,
      borderRadius : 4,
      elevation : 2,
    },
    optionContainer : {
     padding : 10
    },
    optionText : {
      fontSize : fontSizes.medium,
      fontFamily : fonts.Medium,
      color : colors.black,
    },
    messageIconWrapper : {
      backgroundColor : colors.primary,
      width : 60,
      height : 60,
      borderRadius : 60/2,
      justifyContent : 'center',
      alignItems : 'center',
      position : 'absolute',
      right : 20,
      elevation : 4,
      bottom : 20
    },
})

export default Dashboard