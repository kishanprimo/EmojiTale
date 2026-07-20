export interface MemberStoriesPayload {
    userId: number;
    page: number;
    limit: number;
}

export interface MemberStoryItem {
    aigeneratedstory_id: number;

    title: string;

    content: string;

    user_id: number;

    member_id: number;

    public: boolean;

    report_id: number | null;

    read_count: number;

    emoji_ids: number[];

    ai_provider: string;

    ai_model: string;

    prompt_tokens: number;

    completion_tokens: number;

    ai_cost_usd: string;

    created_at: string;

    updated_at: string;

    story_category_id: number | null;

    member: {
        member_id: number;

        fullname: string;

        avatar_id: number;

        avatar: {
            avatar_media: string;

            avatar_id: number;
        } | null;
    };
}

export interface MemberStoriesResponse {
    success: boolean;

    message: string;

    data: {
        stories: MemberStoryItem[];

        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
}