export interface NotificationState {
  notifications: Array<{
    id: string;
    date: number;
    data: Record<string, unknown>;
  }>;
}
