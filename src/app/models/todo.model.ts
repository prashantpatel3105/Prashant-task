export interface Todo {
    id?: any;
    title: string;
    description: string;
    dueDate: Date | null;
    attachment?: string;
    completed: boolean;
  }
  