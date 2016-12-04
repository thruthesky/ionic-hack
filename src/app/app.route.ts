import { Injectable } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Injectable()
export class AppRoute {
    constructor(
        private router: Router
    ) {
        console.log("AppRoute::constructor()");
    }
    
    go( url ) {
        this.router.navigateByUrl( url );
    }
}