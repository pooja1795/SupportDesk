import  axiosClient  from './axiosClient';

const BASE_URL = "/conversations";

export const conversationsAPI = {
    list: (params = {}, token) =>
        axiosClient.get(BASE_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params,
        }),

    get: (id, token) =>
        axiosClient.get(`${BASE_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }),

    create: (payload, token) =>
        axiosClient.post(BASE_URL, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }),

    messages: {
        list: (conversationId, token) =>
            axiosClient.get(`${BASE_URL}/${conversationId}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        add: (conversationId, payload, token) =>
            axiosClient.post(`${BASE_URL}/${conversationId}/messages`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
    },
};
