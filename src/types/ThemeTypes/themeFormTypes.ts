export interface AddThemeResponse {
    success: boolean;
    message: string;
    data: {
        theme_id: number;
        theme_name: string;
        theme_name_subtitle: string;
        theme_image: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface UpdateThemePayload {
    themeId: number;
    formData: FormData;
}

export interface UpdateThemeResponse {
    success: boolean;
    message: string;
    data: {
        theme_id: number;
        theme_name: string;
        theme_name_subtitle: string;
        theme_image: string;
        createdAt: string;
        updatedAt: string;
    };
}

export interface SelectedTheme {
    theme_id: number;
    theme_name: string;
    theme_name_subtitle: string;
    theme_image: string;
}
