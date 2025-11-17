import EmailAddressScreen from '../screens/EmailAddressScreen';
import LoginScreen from '../screens/LoginScreen';
import MessageScreen from '../screens/MessageScreen';
import NewGroupScreen from '../screens/NewGroupScreen';
import OTPScreen from '../screens/OTPScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RequestScreen from '../screens/RequestScreen';
import SearchFriendScreen from '../screens/SearchFriendScreen';
import SearchScreen from '../screens/SearchScreen';
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
        name:'EmailAddressScreen',
        component: EmailAddressScreen,
    },
    {
        name:'OTPScreen',
        component: OTPScreen,
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
    {
        name:'MessageScreen',
        component: MessageScreen,
    },
    {
        name:'SearchScreen',
        component: SearchScreen,
    },
    {
        name:'RequestScreen',
        component: RequestScreen,
    },
    {
        name:'NewGroupScreen',
        component: NewGroupScreen,
    },
];

export const mergeStack = [...authStack, ...dashboardStack];
