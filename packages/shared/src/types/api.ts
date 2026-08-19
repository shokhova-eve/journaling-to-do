export interface LoginRequest {
  password: string;
}

export interface SessionResponse {
  authenticated: boolean;
}

export interface CreateTaskRequest {
  text: string;
  parentTaskId?: string;
}

export interface UpdateTaskRequest {
  text?: string;
  completed?: boolean;
  position?: number;
}

export interface CreateTileRequest {
  title: string;
}

export interface UpdateTileRequest {
  title?: string;
  position?: number;
  archivedAt?: string | null;
}

export interface ClipboardResponse {
  markdown: string;
}
