/* eslint-disable @typescript-eslint/no-var-requires */
const random = require("simple-random-number-generator");
import { generator } from 'ts-password-generator';
import { Params } from "./types";

const params: Params = {
    min: 1,
    max: 100,
    integer: true
};

const paramsInvalid: Params = {
    min: 1,
    max: 100,
    integer: true
};

const randomInvalidId: number = random(paramsInvalid);
const randomUserId: number = random(params);
const randomIdForMethodGet: number = random(params);
const randomIdForMethodPost: number = random(params);
const randomIdForMethodPut: number = random(params);
const randomIdForMethodPatch: number = random(params);
const randomIdForMethodDelete: number = random(params);

const randomString: string = generator({ haveNumbers: true, charsQty: 18, isUppercase: true, haveString: true, haveSymbols: true });

export {
    randomIdForMethodPost,
    randomIdForMethodGet,
    randomIdForMethodPut,
    randomIdForMethodPatch,
    randomIdForMethodDelete,
    randomUserId,
    randomString,
    randomInvalidId
};
