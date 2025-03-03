export interface Thumbnail {
  public_id: string;
  url: string;
}

export interface Categories {
  _id: string;
  title: string;
}

export interface Link {
  title: string;
  url: string;
  _id: string;
}

export interface Benefit {
  title: string;
  _id: string;
}

export interface CourseContent {
  videoUrl: string;
  title: string;
  videoSection: string;
  description: string;
  suggestion: string;
  links: Link[];
  _id: string;
  reviews: any[]; // Assuming this can be of any type
  questions: any[]; // Assuming this can be of any type
}

export interface Prerequisite {
  title: string;
  _id: string;
}
export interface Instructor {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: string;
}
export interface Course {
  instructor: Instructor;
  thumbnail: Thumbnail;
  isBlocked: boolean;
  status: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  estimatePrice: number;
  categories: Categories;
  level: string;
  ratings: number;
  purchased: number;
  demoUrl: string;
  benefits: Benefit[];
  courseContentData: CourseContent[];
  prerequisites: Prerequisite[];
  totalVideos: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

