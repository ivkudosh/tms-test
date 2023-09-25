import ENV from "../../../env/env";
import { requestHeader } from "../helpers/constants";
import { BaseAPI } from "./baseAPI";

export class GroupsAPI extends BaseAPI {
    createGlobalGroupRequest = (groupName: string, userId: string, orgstructureId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editSpeciality`)
            .send(`ci_csrf_token=&speciality_id=&type=function&speciality=${groupName}&role%5B1%5D%5B%5D=${userId}&chat_mod_descr=&structure=%5B${orgstructureId}%5D&select-always-structure=%5B%5D&days_from=&days_before=`);
        } catch (error: any) {
            console.error('Something went wrong in createGlobalGroupRequest');
            throw new Error(error.message);
        }
    };

    getGlobalGroupRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/groups`);
        } catch (error: any) {
            console.error('Something went wrong in getGlobalGroupRequest');
            throw new Error(error.message);
        }
    };

    getGlobalGroupWithSearchRequest = (userModeratorId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/groups`)
            .set(requestHeader)
            .send(`ci_csrf_token=&program=&course=&event=&moderator=${userModeratorId}&group_follows=`);
        } catch (error: any) {
            console.error('Something went wrong in getGlobalGroupWithSearchRequest');
            throw new Error(error.message);
        }
    };

    editGlobalGroupRequest = (groupId: string, newGroupName: string, userModeratorId: string, orgstructureId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editSpeciality`)
            .send(`ci_csrf_token=&speciality_id=${groupId}&type=function&speciality=${newGroupName}&role%5B1%5D%5B%5D=${userModeratorId}&chat_mod_descr=&structure=%5B${orgstructureId}%5D&select-always-structure=%5B%5D&days_from=&days_before=`);
        } catch (error: any) {
            console.error('Something went wrong in editGlobalGroupRequest');
            throw new Error(error.message);
        }
    };

    deleteGlobalGroupRequest = (groupId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/deleteSpeciality`)
            .send(`ci_csrf_token=&specialities%5B%5D=${groupId}`);
        } catch (error: any) {
            console.error('Something went wrong in deleteGlobalGroupRequest');
            throw new Error(error.message);
        }
    };
}
