import ENV from "../../../env/env";
import { requestHeader } from "../helpers/constants";
import { BaseAPI } from "./baseAPI";

export class JobAPI extends BaseAPI {
    createJobRequest = (jobName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addPosition`)
                .set(requestHeader)
                .send(`name=${jobName}&ci_csrf_token=`);
        } catch (error: any) {
            console.error('Something went wrong in createJobRequest');
            throw new Error(error.message);
        }
    };

    getJobWithSearchRequest = (jobName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/positions`)
                .set(requestHeader)
                .send(`ci_csrf_token=&ajax=1&filter%5Bsearch%5D=${jobName}`);
        } catch (error: any) {
            console.error('Something went wrong in getJobWithSearchRequest');
            throw new Error(error.message);
        }
    };

    getJobRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/positions`)
                .set(requestHeader);
        } catch (error: any) {
            console.error('Something went wrong in getJobRequest');
            throw new Error(error.message);
        }
    };

    editJobNameRequest = (jobId: string, newJobName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editPosition`)
                .set(requestHeader)
                .send(`name=${newJobName}&id_position=${jobId}&old_name_position=${newJobName}&ci_csrf_token=`);
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
