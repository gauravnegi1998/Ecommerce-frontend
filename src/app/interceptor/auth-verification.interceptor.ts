import { HttpInterceptorFn } from '@angular/common/http';

export const authVerificationInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
