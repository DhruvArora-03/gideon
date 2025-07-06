export const USER_ROLES = ['admin', 'manager', 'employee'] as const;

export type UserRole = (typeof USER_ROLES)[number];
