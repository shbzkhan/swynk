import { icons } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { FC } from 'react';

type iconsName = keyof typeof icons


type IconTypes = {
    name:iconsName,
    size?:number,
}
const CustomIcon:FC<IconTypes> = ({ name, size = 20 }) => {
    const {colorScheme} = useColorScheme();
  const LucideIcon  = icons[name];

  return <LucideIcon
            color={colorScheme === 'dark' ? 'white' : '#005FFF'}
            size={size}
        />;
};

export default CustomIcon;
