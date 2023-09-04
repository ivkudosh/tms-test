import ENV from "../../../env/env";
import { requestHeader } from "../helpers/constants";
import { BaseAPI } from "./baseAPI";

export class UserManagerAPI extends BaseAPI {

    createUserManagerRequest = (userName: string, userSecondName: string, orgstructureId: string | number, jobName: string, dateTakeOnWork: string, dateBirthday: string, role: string, email: string, password: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addWorker`)
            .set({'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Language':'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With':'XMLHttpRequest'})
            .send({
                ci_csrf_token: '',
                first_name: userName,
                second_name: userSecondName,
                midle_name: '',
                org_structure_level_id: orgstructureId,
                position: jobName,
                is_forced_teacher: 1,
                is_expert: 1,
                date_take_on_work: dateTakeOnWork,
                date_birthday: dateBirthday,
                city_name: '',
                region_name: '',
                project_name: '',
                law_face: '',
                attribute: '',
                role: role,
                email: email,
                password: password,
                password2: password,
                send_password: 1,
                generate_person_id: 1,
            });
        } catch (error: any) {
            console.error('Something went wrong in createUserManagerRequest');
            throw new Error(error.message);
        }
    };

    // getOrgstructureRequest = () => {
    //     try {
    //         return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/orgStructure`);
    //     } catch (error: any) {
    //         console.error('Something went wrong in getOrgstructureRequest');
    //         throw new Error(error.message);
    //     }
    // };

    // editOrgstructureNameRequest = (orgstructureId: string, newOrgstructureName: string) => {
    //     try {
    //         return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editOrgStructureElement`)
    //             .set(requestHeader)
    //             .send(`level_id=${orgstructureId}&ci_csrf_token=&name=${newOrgstructureName}&id=${orgstructureId}&org_structure_level_id=&manager_id=`);
    //     } catch (error: any) {
    //         console.error('Something went wrong in editOrgstructureRequest');
    //         throw new Error(error.message);
    //     }
    // };

    // deleteOrgstructureRequest = (orgstructureId: string) => {
    //     try {
    //         return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/deleteElement/${orgstructureId}`)
    //             .set(requestHeader)
    //             .send(`ci_csrf_token=`);
    //     } catch (error: any) {
    //         console.error('Something went wrong in deleteOrgstructureRequest');
    //         throw new Error(error.message);
    //     }
    // };
}
