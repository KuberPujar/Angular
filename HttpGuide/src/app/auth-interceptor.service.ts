import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export class AuthInterCeptorService implements HttpInterceptor{
  intercept(req:HttpRequest<any>,next:HttpHandler)
  {
    const modifiedRequest=req.clone(
      {
        headers:req.headers.append('Auth','kuber')
      }
    );
    return next.handle(modifiedRequest);
  }
}
