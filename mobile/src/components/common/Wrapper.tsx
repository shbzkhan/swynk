import {ReactNode } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Wrapper = ({loading,children}:{loading:boolean | false,children:ReactNode}) => {
  return (
    <SafeAreaView>
        {loading ? <ActivityIndicator/> : children}
    </SafeAreaView>
  )
}

export default Wrapper