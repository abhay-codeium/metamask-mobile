export interface AlertState {
  isVisible: boolean;
  autodismiss: number | null;
  content: string | null;
  data: Record<string, unknown> | null;
}
