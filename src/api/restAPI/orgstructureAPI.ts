import ENV from "../../../env/env";
import { requestHeader } from "../helpers/constants";
import { BaseAPI } from "./baseAPI";

export class OrgstructureAPI extends BaseAPI {

    createOrgstructureRequest = (orgstructureName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addOrgStructure`)
                .set(requestHeader)
                .send(`ci_csrf_token=&name=${orgstructureName}&org_structure_level_id=&manager_id=`);
        } catch (error: any) {
            console.error('Something went wrong in createOrgstructureRequest');
            throw new Error(error.message);
        }
    };

    getOrgstructureRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/orgStructure`);
        } catch (error: any) {
            console.error('Something went wrong in getOrgstructureRequest');
            throw new Error(error.message);
        }
    };

    editOrgstructureNameRequest = (orgstructureId: string, editedOrgstructureName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editOrgStructureElement`)
                .set(requestHeader)
                .send(`level_id=${orgstructureId}&ci_csrf_token=&name=${editedOrgstructureName}&id=${orgstructureId}&org_structure_level_id=&manager_id=`);
        } catch (error: any) {
            console.error('Something went wrong in editOrgstructureRequest');
            throw new Error(error.message);
        }
    };

    deleteOrgstructureRequest = (orgstructureId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/deleteElement/${orgstructureId}`)
                .set(requestHeader)
                .send(`ci_csrf_token=`);
        } catch (error: any) {
            console.error('Something went wrong in deleteOrgstructureRequest');
            throw new Error(error.message);
        }
    };
}
