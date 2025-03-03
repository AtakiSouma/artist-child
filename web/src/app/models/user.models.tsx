/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    slug: string;
  };
  avatar: string;
  photoUrl: string;
}

export interface InstructorCertsParams {
  listCerts: {
    type: string;
    url: string;
  }[];
}

export interface TeachersData{
  id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    slug: string;
  };
  avatar: any; // Define a proper type if available
  photoUrl: string;
  status: boolean;
  isCertified: string;
  hasPaid: boolean;
  certificates: {
    type: string;
    url: string;
    _id: string;
  }[];
  createdAt:Date;
}
