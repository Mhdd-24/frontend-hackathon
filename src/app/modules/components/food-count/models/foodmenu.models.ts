export interface Food {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  image: string;
}

export interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}
