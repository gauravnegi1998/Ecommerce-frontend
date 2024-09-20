import { Injectable } from '@angular/core';
import * as countryStateJson from 'countrycitystatejson';


@Injectable({
    providedIn: 'root'
})

class CountryStateService {
    countryState = countryStateJson;

    _getAllCountry() {
        return this.countryState.getCountries();
    }

    _getStatesByCountry(countryShotName: string) {
        return this.countryState.getStatesByShort(countryShotName);
    }
}

export default CountryStateService;