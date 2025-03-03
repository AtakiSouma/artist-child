interface Thumbnail {
  public_id: string;
  url: string;
}

interface Category {
  _id: string;
  title: string;
}

export interface CourseData {
  id: string;
  name: string;
  thumbnail: Thumbnail;
  description: string;
  price: number;
  categories: Category;
  level: string;
  purchased: number;
  status: string;
  createdAt: Date;
}

export interface CourseCount {
  count: number;
}
