import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Config } from '../../etc/config';

@Pipe({
  name: 'ek'
})
@Injectable()
export class LanguageEnglishKoreanPipe implements PipeTransform {

  transform(code: Array<string>, args?: any): any {


    if ( code === void 0 ) return 'code undefined';
    let language_code = Config.language;

    let str;
    if ( language_code == 'en' ) str = code[0];
    else str = code[1];
    for( let i in args ) {
      str = str.replace('#' + i, args[i]);
    }
    //console.log('str: ', str);
    return str;

  }



}
