import React,{useState,useRef,useEffect} from 'react';
import {Text, View,StyleSheet,Keyboard,ScrollView,TouchableOpacity,Animated,
  Dimensions,TextInput,StatusBar, Image,ImageBackground,} from 'react-native';
import firebase from 'react-native-firebase';
import { ProgressDialog } from 'react-native-simple-dialogs';

import CountryPicker from 'react-native-country-picker-modal';
import {colors} from '../../res/style/colors'
import {fontSizes} from '../../res/style/fontSize'
import {fonts} from '../../res/style/fonts'
import Logo from "../../res/assets/images/logo.png"
import BackgroundImg from '../../res/assets/images/background.png'
import { Transitioning, Transition } from 'react-native-reanimated';
import {MaterialIcon,} from '../../components/Shared/Index'
import {moderateScale} from '../../res/style/scalingUnit'

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width)
const window = Dimensions.get('window')

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const MobileNumber = (props) => {
  
    const [cca2,setCca2] = useState('IN') // you can set ur country here
    const [callingCode,setCallingCode] = useState('91') 
    const [name,setName] = useState('India')
    const [phoneNumber,setPhoneNumber] = useState('')
  
    onTextChange = (phoneNumber) => {
      setPhoneNumber(phoneNumber)
    }

    return (
      <View style={{flex:1}}>
        <View style={{marginTop:20}}>
         <Text style={styles.loginHeadText}>Enter your mobile number to login or register</Text>
        </View>
        <View style={styles.mobileNumberWrapper}>
          <View style={{marginTop:20}}>
           <Text style={styles.subHead}>Country</Text>
           <View style={styles.countryWrapper}>
           <View style={styles.countryFlagWrapper}>
           <CountryPicker
              closeable
              onChange={value => {
                setCca2(value.cca2)
                setCallingCode(value.callingCode)
                setName(value.name)
              }}
              filterable={true}
              flagType="flat"
              cca2={cca2}
              translation="eng"
            />
            <Text style={styles.countryName}>{name}</Text>
            </View>
            <MaterialIcon style={styles.arrowIcon} size={20} name="chevron-down" color={colors.primary} />
           </View>
          </View>
          <View style={{ marginTop : 30}}>
          <Text style={styles.subHead}>Your Mobile Number*</Text>
          <View style={styles.phoneNumberWrapper}>  
            <TextInput 
            value={`+${callingCode}`}
            style={styles.textInput}
            editable={false}
            />
            <View style={[styles.textInput,{marginLeft:10,flex:1,flexDirection:'row',alignItems:'center'}]}>
            <TextInput 
             keyboardType='phone-pad'
            // maxLength={10}
             onChangeText={(text) => onTextChange(text)}
             style={{padding:0,flex:1,fontSize : 18,
              fontFamily: 'Poppins-Medium',
              color : colors.black}}/>
              {
                phoneNumber.length === 10 && (
                  <MaterialIcon size={22} color="#25D366" name="check-circle"/>
                )
              }
            </View>
          </View>
         </View>
        </View>
      </View>
    ) 
}

const OtpScreen = () => {
  return (
        <View style={{flex:1}}>
          <View style={{marginTop:20,}}>
           <Text style={styles.loginHeadText}>Waiting to automatically detect and sms send to +91 7715046761</Text>
          </View>
          <View style={styles.otpTextInputContainer}>
           <TextInput
            ref={input => {
             this.firstTextInput = input;
            }}
            onChangeText={(event) => { event && this.secondTextInput.focus() }}
            keyboardType='phone-pad' style={styles.otpTextInput} maxLength={1}/>
           <TextInput 
            ref={input => {
              this.secondTextInput = input;
            }}
            onKeyPress={({ nativeEvent: { key: keyValue } }) => {
              if (keyValue === 'Backspace') {
                this.firstTextInput.focus();
            }
            }}
            onChangeText={(event) => { event && this.thirdTextInput.focus() }}
            keyboardType='phone-pad' style={styles.otpTextInput} maxLength={1}/>
           <TextInput 
            ref={input => {
             this.thirdTextInput = input;
            }}
            onKeyPress={({ nativeEvent: { key: keyValue } }) => {
              if (keyValue === 'Backspace') {
                this.secondTextInput.focus();
            }
            
            }}
            onChangeText={(event) => { event && this.fourTextInput.focus() }}
            keyboardType='phone-pad' style={styles.otpTextInput} maxLength={1}/>
           <TextInput 
            ref={input => {
             this.fourTextInput = input;
            }}
            onKeyPress={({ nativeEvent: { key: keyValue } }) => {
              if (keyValue === 'Backspace') {
                this.thirdTextInput.focus();
            }
            }}
            keyboardType='phone-pad' style={styles.otpTextInput} maxLength={1}/>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={styles.otpSubText}>
              Did’nt receive the code?  
              <Text style={styles.otpSubTextSpan}>  RESEND CODE</Text>
            </Text>
          </View>
        </View>
  )
}


const Login = props => {
    const [isOtpSend, setIsOtpSend] = useState(false) //track if otp is send or not to switch screen
    const [animatedValue,setAnimatedValue] = useState(new Animated.Value(1)) //animation value to hide/show login button
    const [callingCode,setCallingCode] = useState('91') 
    const [phoneNumber,setPhoneNumber] = useState('')
    const [message, setMessage] = useState('')

    const ref = useRef();
    
    const onLogin = () => {
      var fullPhonenumber = "+" + callingCode + phoneNumber
      console.log("Phone Number: " + fullPhonenumber)
      setMessage("Sending code...")
      firebase.auth().signInWithPhoneNumber( fullPhonenumber )
            .then( confirmResult => {
                setMessage("")
                console.log("Success Login!")
                // setMessage("Code has been sent")
                // requestAnimationFrame quite useful to give better experience when we click on button
                requestAnimationFrame(() => { 
                    Keyboard.dismiss()
                    setIsOtpSend(!isOtpSend)
                    ref.current.animateNextTransition();
                })
            })
          .catch( error => setMessage(""))
      
    }

    const onOtpConfirm = () => {
      requestAnimationFrame(() => {
        Keyboard.dismiss()
        props.navigation.navigate("App")
      })  
    }

    useEffect(() => {
      let keyboardDidShowSub = Keyboard.addListener(
        "keyboardDidShow", //keyboardWillShow for ios
        keyboardDidShow
      );
      let keyboardDidHideSub = Keyboard.addListener(
        "keyboardDidHide", //keyboardWillShow for ios
        keyboardDidHide
      );

      return ()=>{
        keyboardDidShowSub.remove();
        keyboardDidHideSub.remove();
      }
    })

    //this animation hide login button when keyboard will show
    keyboardDidShow = event => {
      Animated.timing(animatedValue,{
        toValue : 0,
        duration:500
      }).start()
    };
    
     //this animation show login button when keyboard will hide
    keyboardDidHide = event => {
      Animated.timing(animatedValue,{
        toValue : 1,
        duration:200
      }).start()
    };

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

    //transition for appearance of otp screen 
    const transition = (
      <Transition.Sequence>
        <Transition.Out type="slide-left" durationMs={400} interpolation="easeIn" />
        <Transition.Change />
        <Transition.Together>
          <Transition.In
            type="slide-right"
            durationMs={400}
            interpolation="easeOut"
            propagation="right"
          />
        </Transition.Together>
      </Transition.Sequence>
     );

      return ( 
        <ScrollView contentContainerStyle={styles.container}>
        
          <StatusBar backgroundColor={colors.primary}/>
          <ImageBackground style={styles.backImage} source={BackgroundImg} />
          <View style={styles.logoWrapper}>
            <Image style={{width:30, height:30,resizeMode:'contain'}} source={Logo} />
            <Text style={styles.logoText}>WhatsApp</Text>
          </View>
          <View style={styles.containerStyle} >
           <View style={styles.sliderContainerStyle} >
           <View style={styles.slider}></View>
          </View>
         </View>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.wrapper}> 
            {
             isOtpSend ? <OtpScreen/>: <MobileNumber phoneNumber = {phoneNumber} setPhoneNumber = {setPhoneNumber} 
             callingCode = { callingCode} setCallingCode = {setCallingCode}/>
            }
          </Transitioning.View>
         
          <AnimatedTouchableOpacity activeOpacity={.8} onPress={() => isOtpSend ? onOtpConfirm() : onLogin()} 
           style={[styles.loginContainer,{transform :[{translateY}],opacity}]}>
           <MaterialIcon color={colors.white} name="arrow-right" size={24}/>
          </AnimatedTouchableOpacity>
          <View >
              <ProgressDialog
                  style = {styles.progressDialog}
                  activityIndicatorColor = "blue"
                  activityIndicatorSize = "large"
                  animationType = "slide"
                  message = { message }
                  visible = { message.length > 0 ? true : false }/>
            </View>
        </ScrollView>
      );
    
}

export default Login

const styles = StyleSheet.create({
  containerStyle: {
      alignSelf: 'center',
      width:  window.width,
      height: window.width/7,
      overflow: 'hidden',
      transform: [{ rotate: '180deg'}],
      backgroundColor:"transparent",
      marginTop:20
   },
   sliderContainerStyle: {
      borderRadius: window.width,
      width: window.width * 2,
      height: window.width * 2,
      marginLeft: -((window.width / 2)),
      position: 'absolute',
      bottom: 0,
      overflow: 'hidden',
    },
   slider: {
      height: window.width/7,
      width: window.width,
      position: 'absolute',
      bottom: 0,
      marginLeft: window.width / 2,
      backgroundColor: colors.white,
   },
  container : {
      backgroundColor:colors.primary,
      flex:1, 
  },
  backImage : {
      width:SCREEN_WIDTH+20,
      height:moderateScale(300),
      resizeMode:'cover',
      position:"absolute", 
      alignSelf:'center'
  },
  logoWrapper : {
      padding : 50,
      justifyContent : 'center',
      alignItems : 'center',
      flexDirection : 'row'
  },
  logoText : {
      fontFamily : fonts.SemiBold,
      fontSize:fontSizes.big,
      color:colors.white,
      marginLeft : 10,
      marginTop : 4
  },
  wrapper : {
      backgroundColor: colors.white, 
      flex:1,
      paddingHorizontal:20,
      paddingVertical : 20,
      justifyContent:'flex-start',
  },
  loginHeadText : {
      color: colors.black,
      fontSize : fontSizes.medium,
      fontFamily: fonts.SemiBold,
      marginRight: 40
  },
  mobileNumberWrapper : {
      flex:1,
      justifyContent:'flex-start'
  },
  subHead : {
      color : colors.grey,
      fontSize : fontSizes.small,
      fontFamily: fonts.Medium,
  },
  countryWrapper : {
      flexDirection : 'row',
      borderBottomWidth : 1.2,
      borderBottomColor : colors.primary,
      alignItems : 'center',
      justifyContent : 'space-between',
      marginTop : 8
  },
  countryFlagWrapper : {
      flexDirection : 'row'
  },
  countryName : {
      marginLeft : 12,
      fontSize : fontSizes.medium,
      fontFamily: fonts.Medium,
      color: colors.black,
  },
  arrowIcon : {
      justifyContent : 'flex-end',
  },
  phoneNumberWrapper : {
      flexDirection : 'row',
      marginTop : 10
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
  loginContainer : {
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
  otpTextInputContainer : {
      marginTop : 40,
      flexDirection : 'row'
  },
  otpTextInput : {
      padding: 0,
      height: 50,
      paddingHorizontal:4,
      borderBottomWidth : 1.2,
      borderBottomColor : colors.primary,
      fontFamily: fonts.Medium,
      color : colors.primary,
      width: SCREEN_WIDTH/5,
      marginRight: 10,
      fontSize: 24,
      textAlign: "center",
  },
  otpSubText: {
      fontSize: fontSizes.verySmall,
      fontFamily: fonts.Regular
  },
  otpSubTextSpan: {
      fontSize: fontSizes.small,
      fontFamily: fonts.Bold,
      color: colors.primary
  },
  progressDialog: {
    width: SCREEN_WIDTH*9/10,
    flexDirection : 'row',        
    alignItems: 'center'
  },
})
