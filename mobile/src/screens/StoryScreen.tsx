import { View } from 'react-native';
import Wrapper from '../components/common/Wrapper';
import HomeHeader from '../components/home/HomeHeader';
import { Text } from 'react-native';

const StoryScreen = () => {
  return (
    <Wrapper isBottomTabs={true}>
      <HomeHeader
      title="Swynk Story"
      />
      <View className="flex-row items-center justify-center h-full">
        <Text className="text-3xl text-text-primary font-rubik-bold">Coming Soon</Text>
      </View>
    </Wrapper>
  );
};

export default StoryScreen;
