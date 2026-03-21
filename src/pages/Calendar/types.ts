export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  time: string;
  type: string;
  priority: string;
  status: string;
  color: string;
  isHoliday: boolean;
}

export interface EventFormState {
  id: string;
  date: string;
  title: string;
  time: string;
  type: string;
  priority: string;
  status: string;
  isHoliday: boolean;
}
