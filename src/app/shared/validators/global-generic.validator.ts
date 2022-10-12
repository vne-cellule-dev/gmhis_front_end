import { FormGroup } from "@angular/forms";

export class GlobalGenerateValidator {
    constructor (
        private  validatorMessage :  { [key : string] : { [key : string] : string } }
    ){}

    public createErrorMessage(container : FormGroup, isFormSubmitted? : boolean) : { [key : string]:string }{
        
        const errorMessages : any = {};

        for (const controlName in container.controls) {
            
            if (container.controls.hasOwnProperty(controlName)) {
                
                const selectedControl = container.controls[controlName];

                if (this.validatorMessage[controlName]) {
                    console.log(selectedControl);

                    errorMessages[controlName] = '';

                    if ((selectedControl.dirty || selectedControl.touched || isFormSubmitted) && selectedControl.errors) {
                        console.log('oko');
                        
                        Object.keys(selectedControl.errors).map((errorMessageKey : string) => {
                            if (this.validatorMessage[controlName][errorMessageKey]) {
                                errorMessages[controlName] += this.validatorMessage[controlName][errorMessageKey] + ''
                            }
                        })
                    }


                }
            }            
        }

        return errorMessages;
    }
}