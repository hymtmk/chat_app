import React from 'react'
import CameraScreen from '../../app/CameraScreen'
import {withNavigation} from 'react-navigation'

const Camera = (props) =>  <CameraScreen navigation={props.navigation} showStatusBar={true}/>


export default withNavigation(Camera)