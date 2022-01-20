/* --- STATE --- */
export interface BookingState {
  loading: boolean;
  error?: any;
  bookingList?: Array<BookingType> | null;
}

export interface BookingType {
  id: number;
  flag: string;
  appointment_help: string;
  create_date_time: string;
  updated_date_time: string;
  booking_time: string;
  zoom_link: string;
  meeting_id: string;
  meeting_password: string;
  meeting_join_url: string;
  client: {
    id: number;
    email: string;
    name: string;
    profile_picture: string;
    groups: Array<{
      name: string;
    }>;

    age: number;
    location: string;
    last_name: string;
    stripe_customer_id: string;
    reset_code: string;
    reset_expiry: string;
    zoom_id: string;
    about: string;
    price: string;
    specialization: string;
  };
  provider: number;
}
