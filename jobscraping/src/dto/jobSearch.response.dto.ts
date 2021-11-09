export interface Company {
    id: number;
    title: string;
    slug: string;
    logo: string;
    logo_mini: string;
    first_char: string;
    has_story: boolean;
}

export interface Category {
    id: number;
    title: string;
    image_mini: string;
}

export interface Item {
    id: number;
    title: string;
    is_new: boolean;
    is_favorite: boolean;
    is_vip: boolean;
    created_at: Date;
    slug: string;
    request_type: string;
    company: Company;
    category: Category;
    deadline_at: Date;
    has_company_info: boolean;
    view_count: number;
}

export interface JobSearchResponseDto {
    items: Item[];
    banners: any[];
    next: string;
}

