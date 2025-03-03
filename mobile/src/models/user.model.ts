export interface UserData {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  interests: string[];
  courses: { _id: string }[];
  role: string;
  isBlocked: boolean;
  status: boolean;
  isVerified: boolean;
  updateAtLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
