import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import '../global.css';
import MainNavigator from './navigation/MainNavigator';
import { store } from './redux/store';
import { requestNotificationPermission } from './utils/notificationService';

const App = () => {
   useEffect(()=>{
    GoogleSignin.configure({
    webClientId:'169610081696-gnkj974650mj1rso9use8j9l1bh7o9sq.apps.googleusercontent.com',
    forceCodeForRefreshToken:true,
    offlineAccess:false,
    iosClientId:'169610081696-hlojke1jhs3jdak7ij7ll8ht8uf5770p.apps.googleusercontent.com',
  });


  //notifications
  requestNotificationPermission();

  //notificatin service
  const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {title, body, imageUrl} = remoteMessage.data;
      await notifee.displayNotification({
        title,
        body,
        android:{
          channelId:'default',
          importance: AndroidImportance.HIGH,
          pressAction:{id:'default'},
          largeIcon: imageUrl,
          circularLargeIcon: true,
        },
      });
    });

    messaging().setBackgroundMessageHandler(async remoteMessage =>{
      const {title, body, imageUrl} = remoteMessage.data;
      await notifee.displayNotification({
        title,
        body,
        android:{
          channelId:'default',
          importance: AndroidImportance.HIGH,
          pressAction:{id:'default'},
          largeIcon: imageUrl,
          circularLargeIcon: true,
        },
      });
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      // console.log("Notifee background event:", type, detail);
      if (type === EventType.PRESS) {
        console.log('Notification pressed in background', detail.notification);
      }
    });

    return() =>{
      unsubscribe();
    };
  },[]);

  return (
    <Provider store={store}>
      <MainNavigator/>
    </Provider>

  );
};

export default App;
