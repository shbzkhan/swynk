import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SearchFriendScreen from "../screens/SearchFriendScreen";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

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
        name:'SearchFriendScreen',
        component: SearchFriendScreen,
    },
    {
        name:'ProfileScreen',
        component: ProfileScreen,
    },
]