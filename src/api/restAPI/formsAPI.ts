import ENV from "../../../env/env";
import { requestHeader } from "../helpers/constants";
import { BaseAPI } from "./baseAPI";

export class FormsAPI extends BaseAPI {
    createFormRequest = (formName: string, studentId: string, groupId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/forms/save`)
                .send(`id=&name=${formName}&searchUnsplash=&image-file=&questions%5B1%5D%5Btype%5D=select&questions%5B1%5D%5Bid_field%5D=0&questions%5B1%5D%5Bname%5D=form_question_select&questions%5B1%5D%5Bkey%5D%5B%5D=select_one&questions%5B1%5D%5Bid_multi_answer%5D%5B%5D=0&questions%5B2%5D%5Btype%5D=multi_select&questions%5B2%5D%5Bid_field%5D=0&questions%5B2%5D%5Bname%5D=form_question_multi_select&questions%5B2%5D%5Bkey%5D%5B%5D=multi_select_one&questions%5B2%5D%5Bid_multi_answer%5D%5B%5D=0&questions%5B3%5D%5Btype%5D=checkbox&questions%5B3%5D%5Bid_field%5D=0&questions%5B3%5D%5Bname%5D=form_question_checkbox&questions%5B4%5D%5Btype%5D=textarea&questions%5B4%5D%5Bid_field%5D=0&questions%5B4%5D%5Bname%5D=form_question_textarea&students_outside%5B%5D=${studentId}&students_outside_type%5B${studentId}%5D=${groupId}&from_group_users%5B${studentId}%5D%5B%5D=${groupId}&open_access_groups%5B%5D=${groupId}`);
        } catch (error: any) {
            console.error('Something went wrong in createFormRequest');
            throw new Error(error.message);
        }
    };

    getFormRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/forms`);
        } catch (error: any) {
            console.error('Something went wrong in getFormRequest');
            throw new Error(error.message);
        }
    };

    editOrgstructureNameRequest = (orgstructureId: string, newOrgstructureName: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editOrgStructureElement`)
                .set(requestHeader)
                .send(`level_id=${orgstructureId}&ci_csrf_token=&name=${newOrgstructureName}&id=${orgstructureId}&org_structure_level_id=&manager_id=`);
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