import React from 'react';
import { IconKey, iconMap } from './iconMap';
import { MdOutlineDisabledByDefault } from 'react-icons/md';

interface DynamicIconProps {
  type: String;
  size?: number;
  color?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ type, size = 16, color = 'gray' }) => {
  const IconComponent = iconMap[type as IconKey];

  if (!IconComponent) {
    return <MdOutlineDisabledByDefault size={size} color = {color} /> // Fallback message (shouldn't happen with valid keys)
  }

  return <IconComponent size={size} color={color} />;
};

export default DynamicIcon;
