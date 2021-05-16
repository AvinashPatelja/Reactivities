import axios, { AxiosResponse } from 'axios'
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "https://localhost:44398/api";

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    create: (activity: Activity) => requests.post<void>('activities', activity),
    delete: (id: string) => requests.delete<void>(`activities/${id}`)
}

const agent = {
    activities
}

export default agent;