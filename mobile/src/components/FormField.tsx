import { FC } from 'react';
import { View, Text, TextInput} from 'react-native';

interface formFiledProps {
    title:string
    value:string
    placeholder:string
    handleChangeText:(e:string)=>void
}
const FormField:FC<formFiledProps> = ({title, value, placeholder, handleChangeText,...props}) => {
  return (
   <View className="px-4 py-3 rounded-2xl bg-light-secondary dark:bg-dark-secondary">
        <Text className="font-rubik-semibold text-text">{title}</Text>
        <TextInput
            value={value}
            className="p-0 font-rubik-medium dark:text-white placeholder:text-gray-400 placeholder:dark:text-gray-600"
            placeholder={placeholder}
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password'}
            selectionColor="#005FFF"
            {...props}
        />
   </View>
  );
};

export default FormField;
