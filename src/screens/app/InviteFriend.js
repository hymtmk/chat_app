import React,{useEffect,useState} from 'react'
import { Text, View,StyleSheet, StatusBar,InteractionManager,ScrollView,TextInput, TouchableOpacity,Animated } from 'react-native'
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import MaterialIcon from '../../components/Shared/MaterialIcon'
import posed,{Transition} from 'react-native-pose'


import {connect} from 'react-redux'
import {inviteData} from '../../store/actions'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
//when keyboard is showing button will translateY to 100 mean it will hide behind the keyboard 
const translateY = new Animated.Value(1).interpolate({
    inputRange : [0,1],
    outputRange : [100,0]
})

  //when keyboard hide button will come in there real position and it's 0
const opacity = new Animated.Value(1).interpolate({
    inputRange : [0,1],
    outputRange : [0,1]
})

const Overlay = posed.ScrollView({
  enter: { x: 0,staggerChildren: 80,delayChildren: 100, 
    transition : {
      type : 'spring',
      useNativeDriver : true
   }

  },
  exit: { x:0 }
});

const InviteFriend = (props) => {   
    
    const [phoneNumber,setPhoneNumber] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    
    
    onPhoneChange = (phoneNumber) => {
      setPhoneNumber(phoneNumber)
    }
    onFirstNameChange = (firstName) => {
        setFirstName(firstName)
    }
    onLastNameChange = (LastName) => {
        setLastName(LastName)
    }

    onInvite = () => {

        props.inviteData()
    }

    useEffect(() => {
      InteractionManager.runAfterInteractions(() => {
         const {myContacts} = require('../../res/data/data')
       
      });
    },[])

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <View style={styles.headerContainer}>
         <View style={styles.firstRow}>
          <MaterialIcon style={styles.icon} onPress={() => {props.navigation.goBack()}} name="arrow-left" size={24} color={colors.primary} />
          <Text style={styles.searchText}>Invite Frieds</Text>
         </View>
         <View style={styles.secondRow}>

          <AnimatedTouchableOpacity activeOpacity={.8} onPress={() =>{}}            
            onPress = {()=>onInvite()}
            style={{transform :[{translateY}],opacity}}>
          <MaterialIcon style={styles.icon} name="check" size={24} color={colors.primary} />          
          </AnimatedTouchableOpacity>         
         </View>        
        </View>
        <ScrollView>
            
            <View style = {{marginTop:15}}>                
           
            <Text>{props.appData.data._id}</Text>
                <TextInput placeholder='First Name (required)'
                           onChangeText = {(text)=>onFirstNameChange(text)}
                           maxLength={20}
                           style={{padding:0,fontSize : 18,
                           marginBottom:15,
                           paddingHorizontal : 4,
                           borderBottomWidth : 1.2,
                           width:'80%',
                           alignSelf:'center',
                           borderBottomColor : colors.primary,
                           fontFamily: 'Poppins-Medium',
                           color : colors.black}}
                           value = {firstName}
                />
                <TextInput placeholder='Last Name (optional)'
                            onChangeText = {(text)=>onLastNameChange(text)}                            
                            value = {lastName}
                            maxLength={20}
                            style={{padding:0,fontSize : 18,
                            paddingHorizontal : 4,
                            borderBottomWidth : 1.2,
                            borderBottomColor : colors.primary,
                            fontFamily: 'Poppins-Medium',
                            width:'80%',
                            alignSelf:'center',
                            marginBottom:15,
                            color : colors.black}}
                />
                <TextInput 
                    
                    placeholder = '1234567890 (required)'
                    value = {phoneNumber}
                    keyboardType='phone-pad'
                    maxLength={10}
                    onChangeText={(text) => onTextChange(text)}
                    style={{padding:0,fontSize : 18,
                    fontFamily: 'Poppins-Medium', width:'80%',
                    alignSelf:'center',
                    borderBottomWidth : 1.2,
                    borderBottomColor : colors.primary,
                    color : colors.black}}/>               
            </View>
        </ScrollView>
      </View>
    )
}

function mapStateToProps (state) {
	return {
	  appData: state.inviteReducer
	 }
}
  
function mapDispatchToProps (dispatch) {
	return {
        inviteData: () => dispatch(inviteData(10,20))
	 }
}  
export default connect(
    mapStateToProps,   
	  mapDispatchToProps,
)(InviteFriend)

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
      width : '10%',     
      justifyContent : 'space-around',
      alignItems : 'center'
    },
    textInput : {
        padding:0,
        paddingBottom : 2,
        paddingHorizontal : 4,
        borderBottomWidth : 1.2,
        borderBottomColor : colors.primary,
        fontSize : 16,
        fontFamily: fonts.Medium,
        color : colors.black
    }, 
})