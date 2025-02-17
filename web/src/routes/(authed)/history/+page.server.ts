import { redirect } from '@sveltejs/kit';

export function load() {
  const today = new Date();
  throw redirect(300, `/history/${today.getFullYear()}/${today.getMonth()}`);
}
