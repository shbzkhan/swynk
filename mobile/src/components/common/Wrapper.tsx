import { FC, ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface WrapperProps{
  loading?:boolean
  children:ReactNode,
  className?:string
  isBottomTabs?:boolean
}
const Wrapper:FC<WrapperProps> = ({loading = false, children, className, isBottomTabs = false}) => {
  return (
    <SafeAreaView
    className="flex-1 bg-white dark:bg-dark-50"
    edges={isBottomTabs ? ['left','right','top'] : ['bottom','left','right','top']}
  >
    <View className={`flex-1 bg-light dark:bg-dark ${className}`}>
      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size={'large'} color={'#005FFF'}/>
        </View>
        )
        :
          children
      }
    </View>
  </SafeAreaView>
  );
};

export default Wrapper;
