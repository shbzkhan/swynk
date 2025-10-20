import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SearchFriendScreen from '../screens/SearchFriendScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BottomTabNavigator from './BottomTabNavigator';

const authStack = [
     {
        name: 'SplashScreen',
        component: SplashScreen,
    },
    {
        name:'WelcomeScreen',
        component: WelcomeScreen,
    },
    {
        name:'RegisterScreen',
        component: RegisterScreen,
    },
    {
        name:'LoginScreen',
        component: LoginScreen,
    },
]

const dashboardStack = [
    {
        name:'BottomTabs',
        component: BottomTabNavigator,
    },
    {
        name:'SearchFriendScreen',
        component: SearchFriendScreen,
    },
    {
        name:'ProfileScreen',
        component: ProfileScreen,
    },
];

export const mergeStack = [...authStack, ...dashboardStack];
