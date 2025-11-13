import '../global.css';
import React from 'react';
import MainNavigator from './navigation/MainNavigator';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { requestNotificationPermission } from './utils/notificationService';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';

const App = () => {
   useEffect(()=>{
  //   GoogleSignin.configure({
  //   webClientId:WEB_CLIENT_ID,
  //   forceCodeForRefreshToken:true,
  //   offlineAccess:false,
  //   iosClientId:IOS_CLIENT_ID
  // });


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
          // style:imageUrl ? {type:AndroidStyle.BIGPICTURE, picture:imageUrl}: undefined
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
