import axios from "axios";

const BASE_URL = "http://localhost:8080/conversations";

export const conversationsAPI = {
    list: (params = {}, token) =>
        axios.get(BASE_URL, {
            headers: { Authorization: `Bearer ${token}` },
            params,
        }),

    get: (id, token) =>
        axios.get(`${BASE_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }),

    create: (payload, token) =>
        axios.post(BASE_URL, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }),

    messages: {
        list: (conversationId, token) =>
            axios.get(`${BASE_URL}/${conversationId}/messages`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        add: (conversationId, payload, token) =>
            axios.post(`${BASE_URL}/${conversationId}/messages`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }),
    },
};
