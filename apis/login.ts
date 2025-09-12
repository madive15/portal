import type {LoginType} from "~/types/login";

export const processLogin = (member: LoginType) => {
    const axios = useAxios();
    return axios.post('/api/main/login', member);
}

export const processLogout = () => {
    const axios = useAxios();
    return axios.post('/api/main/logout');
}