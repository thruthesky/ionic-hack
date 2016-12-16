
import { Component } from '@angular/core';
import { LanguageEnglishKoreanPipe } from '../../../pipes/language/language-english-korean.pipe';
@Component({
    selector: 'base-left-side',
    templateUrl: 'base-left-side.html'
})
export class BaseLeftSide {
    constructor( public ln: LanguageEnglishKoreanPipe ) {

    }
    ek( english, korean ) {
        //return this.ln.transform( )
    }
}