import * as cheerio from 'cheerio';
import { Response } from "superagent";

export const getOrgstructureIdFromResponse = (response: Response, orgstructureName: string) => {
    const $ = cheerio.load(response.text);
    return $(`.panel.${orgstructureName}.first-level.panel-hide-or-show .panel-heading .panel-title.row a small`).text().replace(/\/\s*id:\s*/, "");
};
