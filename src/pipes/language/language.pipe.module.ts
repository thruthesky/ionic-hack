import { NgModule } from '@angular/core';
import { LanguagePipe } from './language.pipe';
@NgModule({
    declarations: [ LanguagePipe ],
    exports: [ LanguagePipe ],
    providers: [ LanguagePipe ]
})
export class LanguagePipeModule {}