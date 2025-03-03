export interface CurrentUser {
  id: string;
  email: string;
  photoUrl: string;
  avatar: string;
  password?: string;
  name: string;
  role: string;
}

export interface UserRegisterParams {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export interface userLoginParams {
  email: string;
  password: string;
}
export interface LoginWithGoogleParams {
  name: string;
  email: string;
  photo: string;
}

export interface UserData {
  data: {
    access_token: string;
    link: string;
    user: {
      avatar: string;
      email: string;
      id: string;
      name: string;
      photoUrl: string;
      role: string;
      isVerified: boolean;
      isCertified: string;
      hasPaid: boolean;
    };
    status: number;
    success: boolean;
  };
}
export interface UserData {
  access_token: string;
  link: string;
  user: {
    avatar: string;
    email: string;
    id: string;
    name: string;
    photoUrl: string;
    role: string;
    isVerified: boolean;
    isCertified: string;
    hasPaid: boolean;
  };
}
