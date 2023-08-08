import { Superagent } from "../helpers/types";

export class BaseAPI {
    constructor(protected readonly superagent: Superagent) { }
}
