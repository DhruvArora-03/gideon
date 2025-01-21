import { jwtDecode, type JwtPayload } from 'jwt-decode';

export type SupabaseToken = JwtPayload & {
  role?: string;
};

export function decode(accessToken: string): SupabaseToken {
  try {
    return jwtDecode<SupabaseToken>(accessToken);
  } catch {
    return { role: 'anon' };
  }
}
