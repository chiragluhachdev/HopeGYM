import type { IconType } from 'react-icons';
import {
  FaHeartbeat,
  FaDumbbell,
  FaRunning,
  FaUserCheck,
  FaFireAlt,
  FaSpa,
  FaMusic,
  FaPrayingHands,
} from 'react-icons/fa';

/**
 * Maps the string `icon` keys stored in data to actual icon components.
 * Keeping data free of JSX makes it portable to a CMS / API later.
 */
export const facilityIcons: Record<string, IconType> = {
  strength: FaDumbbell,
  cardio: FaHeartbeat,
  functional: FaRunning,
  crossfit: FaFireAlt,
  yoga: FaPrayingHands,
  zumba: FaMusic,
  personal: FaUserCheck,
  spa: FaSpa,
};
