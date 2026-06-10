import type { GalleryItem } from '@/types';

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-1',
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    alt: 'Members training with free weights in the strength zone',
    category: 'strength',
  },
  {
    id: 'g-2',
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    alt: 'Rows of treadmills in the cardio zone',
    category: 'cardio',
  },
  {
    id: 'g-3',
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    alt: 'High-energy group fitness class in session',
    category: 'classes',
  },
  {
    id: 'g-4',
    src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80',
    alt: 'Spacious gym floor with premium machines',
    category: 'facility',
  },
  {
    id: 'g-5',
    src: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80',
    alt: 'Athlete doing functional training with battle ropes',
    category: 'strength',
  },
  {
    id: 'g-6',
    src: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80',
    alt: 'Member running on a treadmill',
    category: 'cardio',
  },
  {
    id: 'g-7',
    src: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=900&q=80',
    alt: 'Yoga and stretching class',
    category: 'classes',
  },
  {
    id: 'g-8',
    src: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern gym reception and lounge area',
    category: 'facility',
  },
  {
    id: 'g-9',
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80',
    alt: 'Dumbbell rack in the weights area',
    category: 'strength',
  },
  {
    id: 'g-10',
    src: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?auto=format&fit=crop&w=900&q=80',
    alt: 'CrossFit box with rigs and equipment',
    category: 'classes',
  },
  {
    id: 'g-11',
    src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
    alt: 'Spin cycling studio',
    category: 'cardio',
  },
  {
    id: 'g-12',
    src: 'https://images.unsplash.com/photo-1554344728-77cf90d9ed26?auto=format&fit=crop&w=900&q=80',
    alt: 'Steam room and recovery area',
    category: 'facility',
  },
];

export const galleryCategories = [
  { key: 'all', label: 'All' },
  { key: 'strength', label: 'Strength' },
  { key: 'cardio', label: 'Cardio' },
  { key: 'classes', label: 'Classes' },
  { key: 'facility', label: 'Facility' },
] as const;
