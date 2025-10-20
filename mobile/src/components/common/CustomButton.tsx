import { useColorScheme } from 'nativewind';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

const CustomButton = ({title, handlePress, loading}:{title:string, handlePress:()=>void,loading:boolean}) => {
    const {colorScheme} = useColorScheme();
  return (
    <TouchableOpacity className="items-center w-full py-4 rounded-full bg-primary dark:bg-white" activeOpacity={0.5}
    onPress={handlePress}
    disabled={loading}
    >
        {
            loading ? (
                <ActivityIndicator size="small" color={colorScheme === 'dark' ? '#005FFF' : 'white'}/>
            ) : (
                <Text className="text-lg text-white font-rubik-semibold dark:text-primary">{title}</Text>
            )
        }
        </TouchableOpacity>
  );
};

export default CustomButton;
