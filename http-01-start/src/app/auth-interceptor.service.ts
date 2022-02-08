import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')}); //req is immutable, so can't make changes to the same requests
        console.log('Request is on its way');
        //return next.handle(req);
        return next.handle(modifiedRequest);
    }
}
