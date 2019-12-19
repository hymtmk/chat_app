import {createStackNavigator, createSwitchNavigator, createAppContainer} from "react-navigation"

import Splash from "./screens/auth/Splash"
import Login from "./screens/auth/Login"
import Profile from "./screens/auth/Profile"

import Dashboard from "./screens/app/Dashboard"
import Contact from './screens/app/Contact'
import NewGroup from './screens/app/NewGroup'
import ChatScreen from './screens/app/ChatScreen'
import GroupChatScreen from './screens/app/GroupChatScreen'
import CameraScreen from './screens/app/CameraScreen'
import PhotoPreviewScreen from './screens/app/PhotoPreviewScreen'
import Setting from './screens/app/Setting'
import MyProfileScreen from './screens/app/MyProfileScreen'
import ContactProfileScreen from './screens/app/ContactProfileScreen'
import Calling from './screens/app/Calling'
import ProfileStatus from './components/ChatComponents/ProfileStatus'
import StatusPreview from './screens/app/StatusPreview'
import InviteFriend from './screens/app/InviteFriend'
import EditProfile from './screens/app/EditProfile'

// Auth Stack Navigation
const Auth = createStackNavigator(
    {
        SplashScreen: {
            screen: Splash,
            navigationOptions: {
                header: null
            }
        },
        LoginScreen: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        UserProfile: {
            screen: Profile,
            navigationOptions: {
                header: null
            }
        }
    }, 
    {
        initialRouteName: 'SplashScreen'
    }
)

// Main App Stack Navigation
const App = createStackNavigator({  
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
        }
    },
    ChatScreen : {
        screen : ChatScreen,
        navigationOptions: {
            header: null
        }
    }, 
    GroupChatScreen : {
        screen : GroupChatScreen,
        navigationOptions: {
            header: null
        }
    },     
    ContactProfileScreen: {
        screen: ContactProfileScreen,
        navigationOptions: {
            header: null
        }
    },
    Contact : {
        screen : Contact,
        navigationOptions: {
            header: null
        }
    },
    NewGroup : {
        screen : NewGroup,
        navigationOptions: {
            header: null
        }
    },  
    CameraScreen : {
        screen : CameraScreen,
        navigationOptions: {
            header: null
        }
    },
    PhotoPreviewScreen : {
        screen : PhotoPreviewScreen,
        navigationOptions: {
            header: null
        }
    },
    Setting : {
        screen : Setting,
        navigationOptions: {
            header: null
        }
    },
    MyProfileScreen: {
        screen: MyProfileScreen,
        navigationOptions: {
            header: null
        }
    },
    Calling: {
        screen: Calling,
        navigationOptions: {
            header: null
        }
    },
    StatusPreview: {
        screen: StatusPreview,
        navigationOptions: {
            header: null
        }
    },
    ProfileStatus : {
        screen: ProfileStatus,
        navigationOptions: {
            header: null
        }
    },
    // write by lyvanna
    InviteFriend : {
        screen : InviteFriend,
        navigationOptions: {
            header: null
        }
    }, 
    EditProfile : {
        screen : EditProfile,
        navigationOptions: {
            header: null
        }
    }, 
    //end
})

// Switcher decides which screen loads first 
// It is a best practice to keep two separate stack for Authentication part and 
// Main Application screen which should be restricted to only Users who successfully login
// You can learn more about react-navigation on https://reactnavigation.org
const Switcher = createSwitchNavigator({
    Auth,
    App,
},{
    initialRouteName:"Auth"
})

const Navigation = createAppContainer(Switcher)

export default Navigation