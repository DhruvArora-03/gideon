import { redirect } from '@sveltejs/kit';

export function load() {
  const today = new Date();
  redirect(300, `/history/${today.getFullYear()}/${today.getMonth()}`);
}
