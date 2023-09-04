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
