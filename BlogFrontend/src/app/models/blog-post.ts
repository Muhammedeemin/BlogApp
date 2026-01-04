export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdDate: string;
  isPublished: boolean;
}

export interface CreateBlogPostDto {
  title: string;
  content: string;
  author: string;
  isPublished: boolean;
}

export interface UpdateBlogPostDto {
  title: string;
  content: string;
  author: string;
  isPublished: boolean;
}

export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items: T[];
}

