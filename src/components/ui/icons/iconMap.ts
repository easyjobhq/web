import { IconType } from 'react-icons';
import { FaSink, FaBolt, FaBroom, FaBuilding, FaKey, FaTree, FaWrench, FaPaintBrush, FaHammer } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export type IconKey = 
  | 'Carpintero'
  | 'Plomero'
  | 'Electricista'
  | 'Limpiador'
  | 'Albañil'
  | 'Cerrajero'
  | 'Jardinero'
  | 'Mecánico'
  | 'Fontanero'
  | 'Pintor'
  | 'Casa';

export const iconMap: Record<IconKey, IconType> = {
  Carpintero: FaHammer,       // Tools icon for carpenters
  Plomero: FaSink,           // Sink icon for plumbers
  Electricista: FaBolt,      // Lightning bolt icon for electricians
  Limpiador: FaBroom,        // Broom icon for cleaners
  Albañil: FaBuilding,       // Building icon for builders
  Cerrajero: FaKey,          // Key icon for locksmiths
  Jardinero: FaTree,         // Tree icon for gardeners
  Mecánico: FaWrench,        // Wrench icon for mechanics
  Fontanero: FaSink,         // Sink icon for plumbers (duplicate for Spanish synonym)
  Pintor: FaPaintBrush,
  Casa: FaLocationDot      // Paintbrush icon for painters
};
