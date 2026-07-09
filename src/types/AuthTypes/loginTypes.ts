export interface LoginPayload {
  email: string;
  password: string;
}

export interface AdminData {
  admin_id: number;
  full_name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  toast: boolean;
  timestamp: string;

  data: {
    token: string;
    admin: AdminData;
  };
}

export interface LoginState {
  loading: boolean;
  error: string | null;

  token: string | null;
  admin: AdminData | null;
}