import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate} from '@angular/router';

export class SearchGuard implements CanActivate {
  canActivate (route: ActivatedRouteSnapshot) {
    const searchUrl = route.params['searchUrl'];
    if (searchUrl === 'undefined') {
      window.confirm('搜索内容不能为空');
      return false;
    }
    return true;
  }

}
