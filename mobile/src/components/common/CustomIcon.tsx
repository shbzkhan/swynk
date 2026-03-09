import { icons } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { FC } from 'react';

type iconsName = keyof typeof icons


type IconTypes = {
    name:iconsName,
    size?:number,
    customColor?:string
}
const CustomIcon:FC<IconTypes> = ({ name, size = 20, customColor = '' }) => {
    const {colorScheme} = useColorScheme();
  const LucideIcon  = icons[name];

  return <LucideIcon
            color={customColor === '' ? colorScheme === 'dark' ? 'white' : '#005FFF' : customColor}
            size={size}
        />;
};

export default CustomIcon;
