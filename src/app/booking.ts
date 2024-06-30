export interface Booking {
  id: number;
  type: 'hotel' | 'tour';
  name: number;
  itemId: number;
  userId: number;
  date: string;
  imageUrl: string;
  startDate: string;
  endDate?: string;
}
