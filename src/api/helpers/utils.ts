import * as cheerio from 'cheerio';
import { Response } from "superagent";

export const getOrgstructureIdFromResponse = (response: Response, orgstructureName: string) => {
    const $ = cheerio.load(response.text);
    return $(`.panel.${orgstructureName}.first-level.panel-hide-or-show .panel-heading .panel-title.row a span`).attr('data-org_id');
};

export const getJobIdFromResponse = (response: Response, jobName: string) => {
    const $ = cheerio.load(response.text);
    return $(`#allUsers #allPositionsBody tr td .settings-row .show-edit-position-modal[data-name="${jobName}"]`).attr('data-id');
};

export const getJobNameFromResponse = (response: Response, jobName: string) => {
    const $ = cheerio.load(response.text);
    return $(`#allUsers #allPositionsBody tr td .settings-row .show-edit-position-modal[data-name="${jobName}"]`).attr('data-name');
};

export const getUserManagerIdFromResponse = (response: Response) => {
    const $ = cheerio.load(JSON.parse(response.text).innerHtml);
    return $(`#allUsersBody tr td:nth-child(1) .checkbox .i-checks .ShowOrHide `).attr('value');
};

export const getUserManagerPersonIdModalFromResponse = (response: Response) => {
    const $ = cheerio.load(response.text);
    return $(`.form-group.generator-field #person_id`).attr('value');
};
