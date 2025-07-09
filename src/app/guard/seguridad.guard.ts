import { ActivatedRouteSnapshot,  Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const seguridadGuard= (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const lService=inject(LoginService)
    const router=inject(Router)
    const rpta=lService.verificar();
    if(!rpta){
      router.navigate(['/login']);
      return false;
    }
    // Obtenemos el rol actual
  const role = lService.showRole();

  // Obtenemos los roles permitidos definidos en la ruta (si existen)
  const allowedRoles = route.data['roles'] as Array<string> | undefined;

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Si el rol no está permitido, redirigimos a home (o donde prefieras)
    router.navigate(['/home']);
    return false;
  }
    return rpta;
};