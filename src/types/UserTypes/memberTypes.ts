export interface MemberPayload {
    userId: number;
    page: number;
    limit: number;
    gender?: string;
    age_group?: string;
}

export interface MemberItem {
    member_id: number;
    user_id: number;
    relationship_id: number;

    fullname: string;

    gender: string;

    avatar_id: number;

    theme_id: number | null;

    age_group: string | null;

    current_streak: number;

    last_story_at: string | null;

    streak_updated_at: string | null;

    createdAt: string;

    updatedAt: string;

    avatar: {
        avatar_media: string;
        avatar_id: number;
        name: string;
    } | null;

    relationships: {
        relationship_id: number;
        relationship_type: string;
    } | null;
}

export interface MemberResponse {

    success: boolean;

    message: string;

    data: {

        count: number;

        rows: MemberItem[];

    };

}