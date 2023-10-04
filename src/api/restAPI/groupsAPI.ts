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

    createLocalGroupRequest = (groupName: string, parentGroupId: string, orgstructureId: string, jobName: string, daysBefore: number, daysAfter: number, staticActiveUsers: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editSpeciality`)
            .send(`ci_csrf_token=&speciality_id=&type=dynamic&speciality=${groupName}&chat_mod_descr=&follow%5B%5D=${parentGroupId}&structure=%5B${orgstructureId}%5D&select-always-structure=%5B%5D&position%5B%5D=${jobName}&days_from=${daysBefore}&days_before=${daysAfter}&active_users%5B%5D=${staticActiveUsers}`);
        } catch (error: any) {
            console.error('Something went wrong in createLocalGroupRequest');
            throw new Error(error.message);
        }
    };

    getGroupRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/groups`);
        } catch (error: any) {
            console.error('Something went wrong in getGroupRequest');
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

    getLocalGroupWithSearchRequest = (parentGlobalGroupId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/groups`)
            .set(requestHeader)
            .send(`ci_csrf_token=&program=&course=&event=&moderator=&group_follows=${parentGlobalGroupId}`);
        } catch (error: any) {
            console.error('Something went wrong in getLocalGroupWithSearchRequest');
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
    
    editLocalGroupRequest = (groupId: string, newGroupName: string, parentGroupId: string, jobName: string, daysBefore: number, daysAfter: number) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editSpeciality`)
            .send(`i_csrf_token=&speciality_id=${groupId}&type=dynamic&speciality=${newGroupName}&chat_mod_descr=&follow%5B%5D=${parentGroupId}&structure=&select-always-structure=%5B%5D&position%5B%5D=${jobName}&days_from=${daysAfter}&days_before=${daysBefore}`);
        } catch (error: any) {
            console.error('Something went wrong in editLocalGroupRequest');
            throw new Error(error.message);
        }
    };

    deleteGroupRequest = (groupId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/deleteSpeciality`)
            .send(`ci_csrf_token=&specialities%5B%5D=${groupId}`);
        } catch (error: any) {
            console.error('Something went wrong in deleteGroupRequest');
            throw new Error(error.message);
        }
    };
}
