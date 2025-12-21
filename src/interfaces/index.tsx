export interface User {
  id: number;
  password: string;
  sex: number;
  first_name: string;
  family_name: string;
  display_name: string;
  age: number;
  height: number;
  weight: number;
  shoe_size: number;
  blood_type: number;
  address: string;
  phone_number: string;
  email: string;
  emergency_name: string;
  emergency_address: string;
  emergency_phone_number: string;
  emergency_email: string;
  description: string;
  is_beginner: boolean;
  is_intermediate: boolean;
  is_expert: boolean;
  is_instructor: boolean;
  is_ill: boolean;
  dives_number: number;
  dives_time: number;
  created_at: Date;
  updated_at: Date;
}

export interface ServerActionResponse {
  success: boolean;
  message?: string;
  data?: any | null;
}

export interface Record {
  id: number;
  user_id: number;
  buddy_id: number;
  spot_id: number;
  event_id: number;
  rate: number;
  dived_at: string;
  public_range: number;
  description: string;
  updated_at: string;
  created_at: string;
}
