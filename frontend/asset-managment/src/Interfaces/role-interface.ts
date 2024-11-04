export interface RoleInterface {
  id: number;
  name: string;
}
export const ROLES: RoleInterface[] = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'supporter' },
  { id: 3, name: 'user' },
];
