import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../environments/environment.developments";

export const baseUrl: HttpInterceptorFn = (req, next) => {
    const url = environment.api + req.url;
    return next(req.clone({ url }));
  };