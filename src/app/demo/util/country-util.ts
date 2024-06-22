import { countries } from "../api/countries";

export  function getCountryNameByCountryCode(countryCode: string) {
    const country = countries.find(c => c.countryCode === countryCode);
    if (country === undefined) {
        return countryCode;
    } else {
        return country.countryName || countryCode;
    }
}
