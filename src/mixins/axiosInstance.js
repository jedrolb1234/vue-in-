import axios from "axios";

const refreshToken = async () => {
  // if (context.getters.getLastLogin == null || context.getters.getLastLogin + parseInt(process.env.VUE_APP_REFRESH_TOKEN_TIMEOUT) < Date.now()) {
  const config = {
    headers: {
      refreshToken: localStorage.getItem('refresh_token')
    }
  }
  let res;
  try {
    res = await axios.post(process.env.VUE_APP_BACKEND_URL + process.env.VUE_APP_REFRESH_TOKEN_ENDPOINT, null, config);
    if (res.status == 200) {
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('refresh_token', res.data.refreshToken);
    }
  } catch (error) {
    return Promise.reject(error);
  }
  // }
}

    const instance = axios.create({
      baseURL: process.env.VUE_APP_BACKEND_URL,
    })

    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;
      }
      return config;
    },
      (error) => {
        return Promise.reject(error);
      }
    )

    instance.interceptors.response.use(response => {
      return response;
    }, async (error) => {
      const originalConfig = error.config;
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        await refreshToken();
        // instance.defaults.headers.common["Authorization"] = 'Bearer ' + localStorage.getItem('token');
        return instance(originalConfig);
      }
      return Promise.reject(error);
    })


export default instance;