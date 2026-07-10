export interface PlanPayload {
  product_type: string;
  page: number;
  limit: number;
}

export interface PlanItem {
  plan_id: number;
  plan_type: string;
  price: string;
  currency: string;
  features: string[];
  xp_reward: number;
  is_active: boolean;
  is_deleted: boolean;
  revenuecat_product_id: string;
  product_type: string;
  platform: string;
  is_revenuecat_managed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PlanPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PlanResponse {
  success: boolean;
  message: string;
  data: {
    records: PlanItem[];
    pagination: PlanPagination;
  };
}