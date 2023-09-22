import ENV from "../../../env/env";
import { BaseAPI } from "./baseAPI";

export class GroupsAPI extends BaseAPI {

    createGlobalGroupRequest = (groupName: string, userId: string, orgstructureId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editSpeciality`)
            .set({'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language':'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'Content-Type':'application/x-www-form-urlencoded'
        })
            .send(`ci_csrf_token=&speciality_id=&type=function&speciality=${groupName}&role%5B1%5D%5B%5D=${userId}&chat_mod_descr=&structure=%5B${orgstructureId}%5D&select-always-structure=%5B%5D&days_from=&days_before=`);
        } catch (error: any) {
            console.error('Something went wrong in createGlobalGroupRequest');
            throw new Error(error.message);
        }
    };
}
