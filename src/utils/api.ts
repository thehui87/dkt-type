import axios from 'axios';

export const getApi = (url: string) => axios.get(url);

export const getApiWithAuthentication = (token: string, url: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios.get(url, config);
};

export const postApi = async (url: string, data: object, extraConfig = {}) => {
    const config = {
        method: 'post',
        url: url,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        ...extraConfig,
    };
    return await axios(config);
};

export const postApiWithAuthentication = (
    token: string,
    url: string,
    data: object
) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    return axios.post(
        url,
        {
            ...data,
        },
        config
    );
};

// export const apiRT = axios.create({
//     withCredentials: true, // Include credentials (cookies)
// });

// // Axios Request Interceptor to Add Access Token to Headers
// apiRT.interceptors.request.use(
//     async (config) => {
//         let accessToken = localStorage.getItem('accessToken'); // Get the access token from storage

//         // Check if the token is expired (for example, using token expiry time)
//         // You could decode the token and check its expiry here

//         if (!accessToken || isTokenExpired(accessToken)) {
//             // Token is expired, attempt to refresh
//             accessToken = await refreshAccessToken();

//             if (accessToken) {
//                 localStorage.setItem('accessToken', accessToken); // Save new access token
//                 config.headers.Authorization = `Bearer ${accessToken}`; // Set new access token
//             } else {
//                 // Refresh token failed, handle logout or other fallback
//                 throw new Error('Unable to refresh token');
//             }
//         } else {
//             // Token is valid, add to the request headers
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }

//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Token expiration check function
// const isTokenExpired = (token: string): boolean => {
//     // Decode the JWT token and check if it's expired
//     // Use a library like jwt-decode or check the expiration field manually
//     // For simplicity, this example returns false (not expired)
//     return false;
// };
