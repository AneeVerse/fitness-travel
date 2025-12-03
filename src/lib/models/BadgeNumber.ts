export interface BadgeNumber {
  _id?: string;
  eventId: string;
  eventTitle: string;
  badgeNumber: number;
  totalSlots: number;
  updatedAt: Date;
  createdAt: Date;
}

export const defaultBadgeNumbers: Omit<BadgeNumber, '_id' | 'createdAt' | 'updatedAt'>[] = [
  {
    eventId: 'SRI_LANKA_DEC',
    eventTitle: 'SRI LANKA',
    badgeNumber: 15,
    totalSlots: 20,
  },
  {
    eventId: 'PHUKET_FEB',
    eventTitle: 'PHUKET',
    badgeNumber: 20,
    totalSlots: 25,
  },
  {
    eventId: 'PHUKET_SONGKRAN',
    eventTitle: 'PHUKET SONGKRAN',
    badgeNumber: 18,
    totalSlots: 25,
  },
  {
    eventId: 'PHUKET_FINALE',
    eventTitle: 'PHUKET FINALE',
    badgeNumber: 22,
    totalSlots: 30,
  },
];

export const COLLECTION_NAME = 'badgeNumbers';