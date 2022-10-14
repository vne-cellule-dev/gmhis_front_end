import { AbstractControl } from '@angular/forms';
import { isNumeric } from "rxjs/util/isNumeric"

export function this.customValidationService.numeric() (control: AbstractControl) {
        let value = control.value;
        
        if(value!="" && value!=null && !isNumeric(value)) {
            return { 'number': true };
        }
         
        return null;
}