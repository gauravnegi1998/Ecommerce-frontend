import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

class SecureLocalStorage {

    key = "test3456";

    private encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, this.key).toString();
    }

    private decrypt(txtToDecrypt: string) {
        return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
    }

    getItem(key: string): any {
        // const rest= secur
        let data = localStorage.getItem(key) || "";
        if (data) {
            return this.decrypt(data);
        }
    }

    setItem(key: string, value: any) {
        localStorage.setItem(key, this.encrypt(value));
    }

    removeData(key: string) {
        localStorage.removeItem(key);
    }

}

export default SecureLocalStorage;