import { HttpInterceptor, HttpHandler ,HttpRequest, HttpEventType} from '@angular/common/http';
import { onErrorResumeNext } from 'rxjs';
import { tap } from 'rxjs/operators';


export class LoggingInterceptorService implements HttpInterceptor
{
  intercept(req:HttpRequest<any>,handler:HttpHandler)
  {
    console.log('outgoing request!!!');
    console.log(req.url);
   return handler.handle(req).pipe(
     tap(
       event=>
       {
         if(event.type===HttpEventType.Response)
         {
           console.log('Incoming Response');
           console.log(event.body);
         }

       }
     )
   )
  }
}
