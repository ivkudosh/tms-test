/* eslint-disable @typescript-eslint/no-var-requires */
import { randomIdForMethodPost, randomIdForMethodPut, randomIdForMethodPatch, randomString } from "./randoms";
import { Post } from "./types";

const BaseUrl = 'https://jsonplaceholder.typicode.com/';

const expectedCreatedPost: Post = {
    title: randomString,
    body: randomString,
    userId: randomIdForMethodPost,
};

const expectedUpdatedPost: Post = {
    title: randomString,
    body: randomString,
    userId: randomIdForMethodPut,
};

const expectedPatchedPost: Post = {
    title: randomString,
    body: randomString,
    userId: randomIdForMethodPatch,
};

export {
    BaseUrl,
    expectedCreatedPost,
    expectedUpdatedPost,
    expectedPatchedPost
};
