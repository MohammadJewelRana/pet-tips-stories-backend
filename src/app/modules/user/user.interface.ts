export type Address = {
  currentCity: string;
  homeTown: string;
  relationship: string;
};

export type TUser = {
  fullName: string;
  surName: string;
  dob: Date;
  gender: 'male' | 'female' | 'others';
  email: string;
  password: string;
  followers?: number;
  following?: number;
  profileImage?: string;
  bio?: string;
  address?: Address;
  contactNumber?: string;

  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
