import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../supabase_service/supabase';

export const authGuard: CanActivateFn = async (_route, state) => {
  
  const router = inject(Router);
  const sb = inject(SupabaseService).supabase;
  
  const { data: { session } } = await sb.auth.getSession();

  if (session) return true;
  
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
