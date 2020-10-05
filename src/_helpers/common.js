import { regexConstants } from '../_constants';

export function validateEmail(email) {
    const re = regexConstants.EMAIL;
    return re.test(String(email).toLowerCase());
}