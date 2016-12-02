import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Config } from '../../etc/config';
import { languageText as text } from '../../etc/language-text';

@Pipe({
  name: 'ln'
})
@Injectable()
export class LanguagePipe implements PipeTransform {

  transform(code: any, args?: any): any {
    if ( code === void 0 ) return 'code undefined';
    let language_code = Config.language;
    if ( text[code] === void 0 ) return code;
    if ( text[code][language_code] === void 0 ) return code;
    let str = text[code][language_code];
    for( let i in args ) {
      str = str.replace('#' + i, args[i]);
    }
    //console.log('str: ', str);
    return str;

  }


}
