import { faker } from "@faker-js/faker";

export const generateCustomPassword = () => {
    const PASSWORD_LENGTH = getRandomInteger(10, 12);
    const NUMBERS = "123456789";
    const CAPITAL_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const SPECIAL_CHARACTER = "!@#$%^&*()+-=?<>";
    const CHARS = NUMBERS + CAPITAL_LETTERS + SPECIAL_CHARACTER + "abcdefghijklmnopqrstuvwxyz";

    let password = NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length))
        + CAPITAL_LETTERS.charAt(Math.floor(Math.random() * CAPITAL_LETTERS.length))
        + SPECIAL_CHARACTER.charAt(Math.floor(Math.random() * SPECIAL_CHARACTER.length))
        + NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length))
        + CAPITAL_LETTERS.charAt(Math.floor(Math.random() * CAPITAL_LETTERS.length));
    let i = password.length;

    for (i; i < PASSWORD_LENGTH; i++) {
        password += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return password;
};

const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

export const generateOrgstructureName = faker.company.buzzVerb;

export const generateJobName = faker.person.jobType;

export const generateFirstName = faker.person.firstName;
export const generateLastName = faker.person.lastName;

export const generateEmail = faker.internet.email;
export const generatePassword = generateCustomPassword;

export const generateDate = () => {
    return faker.date.between({ from: '1950-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toLocaleDateString().replace(/\./g, '/');
};
