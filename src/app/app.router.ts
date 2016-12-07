import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
export { ActivatedRoute } from '@angular/router';
@Injectable()
export class AppRouter {
    constructor(
        private router: Router
    ) {
        console.log("AppRoute::constructor()");
    }
    
    go( url ) {
        this.router.navigateByUrl( url );
    }
}