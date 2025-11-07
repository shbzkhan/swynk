import { View, Text, Image} from 'react-native';
import Wrapper from '../components/common/Wrapper';
import CustomButton from '../components/common/CustomButton';
import { navigate } from '../navigation/NavigationUtils';

const WelcomeScreen = () => {
  return (
    <Wrapper className="justify-center gap-6">
      <View className="items-center justify-center">
      <Image
      source={require('../assets/images/logo.png')}
      className="w-56 h-56"
      tintColor="#005FFF"
      />
      <View className="items-center justify-center">
      <Text className="text-sm font-rubik text-text">Welcome to</Text>
      <Text className="text-2xl font-rubik-bold dark:text-white">Swynk Chat App</Text>
      </View>
      </View>
      <Text className="text-center font-rubik-medium text-text">Please Login in Swynk app</Text>
      <View className="gap-6">
        <CustomButton
        title="Login with Google"
        handlePress={()=>navigate('BottomTabs')}
        />
        <CustomButton
        title="Continue with Email"
        handlePress={()=>navigate('LoginScreen')}
        />
      </View>
    </Wrapper>
  );
};

export default WelcomeScreen;
