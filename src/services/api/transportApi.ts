import { TransportItem } from "../../types";

// Sri Lankan transport data - Comprehensive routes
export const mockTransportData: TransportItem[] = [
  // Colombo City Buses
  {
    id: "1",
    type: "bus",
    number: "100",
    destination: "Colombo Fort - Pettah",
    departureTime: "06:15",
    status: "On Time",
    platform: "Platform 1",
    delay: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  },
  {
    id: "2",
    type: "bus",
    number: "101",
    destination: "Colombo - Kandy",
    departureTime: "07:30",
    status: "On Time",
    platform: "Platform 2",
    delay: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  },
  {
    id: "3",
    type: "bus",
    number: "102",
    destination: "Colombo - Galle",
    departureTime: "08:45",
    status: "Delayed",
    platform: "Platform 3",
    delay: 10,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  },
  
  // Intercity Trains
  {
    id: "4",
    type: "train",
    number: "8035",
    destination: "Colombo Fort - Badulla",
    departureTime: "09:20",
    status: "On Time",
    platform: "Platform 4",
    delay: 0,
    image: "https://images.unsplash.com/photo-1531572753322-ad0631652ff8?w=300&q=80"
  },
  {
    id: "5",
    type: "train",
    number: "8041",
    destination: "Colombo Fort - Matara",
    departureTime: "10:10",
    status: "On Time",
    platform: "Platform 1",
    delay: 0,
    image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=300&q=80"
  },
  {
    id: "6",
    type: "train",
    number: "8055",
    destination: "Colombo Fort - Jaffna",
    departureTime: "11:05",
    status: "Cancelled",
    platform: "Platform 2",
    delay: 0,
    image: "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=300&q=80"
  },
  
  // Express Buses
  {
    id: "7",
    type: "bus",
    number: "138",
    destination: "Colombo - Kurunegala",
    departureTime: "12:30",
    status: "On Time",
    platform: "Platform 5",
    delay: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  },
  {
    id: "8",
    type: "bus",
    number: "177",
    destination: "Colombo - Negombo",
    departureTime: "13:15",
    status: "Delayed",
    platform: "Platform 6",
    delay: 15,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  },
  {
    id: "9",
    type: "bus",
    number: "255",
    destination: "Colombo - Ratnapura",
    departureTime: "14:20",
    status: "On Time",
    platform: "Platform 7",
    delay: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  },
  
  // More Sri Lankan Routes
  {
    id: "10",
    type: "train",
    number: "8067",
    destination: "Colombo Fort - Anuradhapura",
    departureTime: "15:45",
    status: "On Time",
    platform: "Platform 3",
    delay: 0,
    image: "https://images.unsplash.com/photo-1531572753322-ad0631652ff8?w=300&q=80"
  },
  {
    id: "11",
    type: "bus",
    number: "199",
    destination: "Colombo - Kalutara",
    departureTime: "16:30",
    status: "Delayed",
    platform: "Platform 8",
    delay: 8,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  },
  {
    id: "12",
    type: "bus",
    number: "225",
    destination: "Colombo - Panadura",
    departureTime: "17:15",
    status: "On Time",
    platform: "Platform 9",
    delay: 0,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&q=80"
  }
];

export const transportApi = {
  getTransportSchedule: async (): Promise<TransportItem[]> => {
    // Simulate API delay with random success/failure
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldFail = Math.random() < 0.1; // 10% chance of failure for testing
        if (shouldFail) {
          reject(new Error("Failed to fetch transport data. Please try again."));
        } else {
          resolve(mockTransportData);
        }
      }, 1500);
    });
  },

  getTransportById: async (id: string): Promise<TransportItem | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = mockTransportData.find(transport => transport.id === id);
        resolve(item);
      }, 500);
    });
  }
};
