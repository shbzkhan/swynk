import { TouchableOpacity, Image } from 'react-native';
import React, { FC } from 'react';

interface userLogoPros {
  url: string
  handlePress:()=>void
}
const UserLogo:FC<userLogoPros> = ({url, handlePress}) => {
  return (
    <TouchableOpacity className="w-12 h-12 overflow-hidden rounded-full"
    onPress={handlePress}
    >
      <Image
        source={{uri: url }}
        className="w-full h-full rounded-full"
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};


export default UserLogo;
