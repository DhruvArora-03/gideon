export const USER_ROLES = ['admin', 'manager', 'employee'] as const;

export type UserRole = (typeof USER_ROLES)[number];

export const formatUserRole = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return 'Admin';
    case 'manager':
      return 'Manager';
    case 'employee':
    default:
      return 'Employee';
  }
};
