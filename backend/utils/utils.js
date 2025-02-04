import crypto from 'crypto';

export  const generateRandomString = (length) => {
    return crypto.getRandomValues(new BigUint64Array(1))[0].toString(length);
};