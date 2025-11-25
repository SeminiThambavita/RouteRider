export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface TransportItem {
  id: string;
  type: "bus" | "train" | "tram";
  number: string;
  destination: string;
  departureTime: string;
  status: "On Time" | "Delayed" | "Cancelled";
  platform?: string;
  delay: number;
  image?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface TransportState {
  items: TransportItem[];
  favorites: string[];
  loading: boolean;
}
