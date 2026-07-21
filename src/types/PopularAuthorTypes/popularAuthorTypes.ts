export interface PopularAuthorItem {
    author_id: number;
    author_name: string;
    profile_image: string;
    story_count: number;
    total_reads: number;
    total_likes: number;
    total_comments: number;
    score: number;
}

export interface PopularAuthorMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PopularAuthorResponse {
    message: string;
    data: PopularAuthorItem[];
    meta: PopularAuthorMeta;
}
