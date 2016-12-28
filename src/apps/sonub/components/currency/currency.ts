import { Component } from '@angular/core';
import { Http } from '@angular/http';

declare var Array;

@Component({
  selector: 'sonub-currency',
  templateUrl: 'currency.html'
})
export class SonubCurrency {
  currency = [];
  constructor( public http: Http) {
    //console.log("CurrencyComponent::constructor()");
    this.get_currency();
  }
  get_currency() {
    this.http.get( "http://philgo.com/?module=ajax&action=currency&submit=1" )
      .subscribe( data => {
        try {
          let re = JSON.parse( data['_body'] );
          //console.log('re::', re);
          if ( re['code'] ) console.log( re['message'] );
          else {
            this.currency = re.currency;
            //console.log( 're data' , this.currency );
          }
        }
        catch( e ){
          console.log( data['_body']);
        }
      });
  }
}
