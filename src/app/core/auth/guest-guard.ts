import { CanActivateFn } from '@angular/router';
import { SupabaseService } from '../supabase_service/supabase';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = async (route, state) => {
  const sb = inject(SupabaseService).supabase;
  const { data: { session } } = await sb.auth.getSession();
  return !session;
};
