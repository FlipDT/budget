export interface RegisterDto {
  username: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface Operation {
  id: number;
  createdDate: Date;
  title: string;
  description: string;
  amount: number;
  categoryId: number;
  categoryName: string;
}

export interface Category {
  id: number;
  name: string;
}