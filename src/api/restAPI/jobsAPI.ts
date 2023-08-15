import ENV from "../../../env/env";
import { requestHeader } from "../helpers/constants";
import { BaseAPI } from "./baseAPI";

export class JobAPI extends BaseAPI {

    createJobRequest = (jobName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addPosition`)
            .set({
                // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                // 'Accept-Encoding': 'gzip, deflate, br',
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                // 'Connection': 'keep-alive',
                // 'Sec-Fetch-Dest': 'empty',
                // 'Sec-Fetch-Mode': 'cors',
                // 'Sec-Fetch-Site': 'same-origin',
                // 'Cache-Control': 'no-cache'
            })
            .send(`name=${jobName}&ci_csrf_token=`);
        } catch (error: any) {
            console.error('Something went wrong in createJobRequest');
            throw new Error(error.message);
        }
    };

    getJobWithSearchRequest = (jobName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/positions`)
            .set({
                // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                // 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                // 'Sec-Fetch-Dest': 'empty',
                // 'Sec-Fetch-Mode': 'cors',
                // 'Sec-Fetch-Site': 'same - origin',
                // 'Sec-Fetch-User': '?1',
                // 'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': '"Windows"',
                'x-requested-with': 'XMLHttpRequest'
            })
            .send(`ci_csrf_token=&ajax=1&filter%5Bsearch%5D=${jobName}`);
        } catch (error: any) {
            console.error('Something went wrong in getJobWithSearchRequest');
            throw new Error(error.message);
        }
    };

    getJobRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/positions`)
            .set({
                // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                // 'Connection': 'keep-alive',
                // 'Cache-Control': 'max-age=0',
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                // 'Sec-Fetch-Site': 'same-origin',
                // 'Sec-Fetch-Mode': 'navigate',
                // 'Sec-Fetch-Dest': 'document',
                // 'Sec-Fetch-User': '?1',
                // 'Upgrade-Insecure-Requests': '1',
                // 'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': '"Windows"'
            });
        } catch (error: any) {
            console.error('Something went wrong in getJobRequest');
            throw new Error(error.message);
        }
    };

    editJobNameRequest = (jobId: string, jobEditedName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editPosition`)
            .set({
                // 'Accept': 'application/json, text/javascript, */*; q=0.01',
                // 'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                // 'Connection': 'keep-alive',
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                // 'Sec-Fetch-Site': 'same-origin',
                // 'Sec-Fetch-Mode': 'cors',
                // 'Sec-Fetch-Dest': 'empty',
                // 'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                // 'sec-ch-ua-mobile': '?0',
                // 'sec-ch-ua-platform': '"Windows"',
            })
            .send(`name=${jobEditedName}&id_position=${jobId}&old_name_position=${jobEditedName}&ci_csrf_token=`);
        } catch (error: any) {
            console.error('Something went wrong in editJobNameRequest');
            throw new Error(error.message);
        }
    };

    deleteJobRequest = (jobId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/deletePosition`)
                .set(requestHeader)
                .send(`id%5B%5D=${jobId}&ci_csrf_token=`);
        } catch (error: any) {
            console.error('Something went wrong in deleteJobRequest');
            throw new Error(error.message);
        }
    };
}