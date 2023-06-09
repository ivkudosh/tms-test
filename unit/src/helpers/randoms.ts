/* eslint-disable @typescript-eslint/no-var-requires */
const random = require('random-name');
const emails = require('email-generator');
const randomAge = require('random-age');
import { generator } from 'ts-password-generator';

const nameRandom: string = random.first();
const nameRandomBasic: string = random.first();

const emailRandom: string = emails.generateEmail();
const emailRandomBasic: string = emails.generateEmail();

const childAgeRandom: number = randomAge({ type: 'child' });
const adultAgeRandom: number = randomAge({ type: 'adult' });
const seniorAgeRandomBasic: number = randomAge({ type: 'senior' });

const passwordRandomMax: string = generator({ haveNumbers: true, charsQty: 18, isUppercase: true, haveString: true, haveSymbols: true });
const passwordRandomMaxBasic: string = generator({ haveNumbers: true, charsQty: 16, isUppercase: true, haveString: true, haveSymbols: true });
const passwordRandomMin: string = generator({ haveNumbers: true, charsQty: 8, isUppercase: true, haveString: true, haveSymbols: true });
const invalidPasswordRandom: string = generator({ haveNumbers: true, charsQty: 7, isUppercase: true, haveString: true, haveSymbols: true });

export {
    nameRandom,
    passwordRandomMax,
    passwordRandomMin,
    emailRandom,
    childAgeRandom,
    adultAgeRandom,
    invalidPasswordRandom,
    nameRandomBasic,
    emailRandomBasic,
    passwordRandomMaxBasic,
    seniorAgeRandomBasic
};
