import { inject } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AuthServices } from "../../services/AuthServices.service";

export class _asynchronousFunction {

    toaster = inject(ToastrService);
    auth = inject(AuthServices);
    success: any = null;
    error: any = null;

    constructor() { }


    async _callTheAPi(apiUrl: Promise<any>, callbackFunction?: (success: any, error: any) => void) {
        await apiUrl.then((result) => {
            if (result.status === 'ok') {
                // if (callbackFunction) this.callbackFunction(result);
                this.success = result;
                // this.toaster.error(result.message);
            } else {
                this.toaster.error(result.message);
            }
        }).catch((err) => {
            this.toaster.error(err.message);
            this.error = err;
        })
        if ((this.success || this.error) && callbackFunction) {
            callbackFunction(this.success, this.error)
        }
        // return this
    }

}

