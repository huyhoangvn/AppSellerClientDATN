import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import {appInfo} from '../constants/appInfos';
import { AxiosResponse } from '../constants/axiosResponse';
// import { CustomAxiosResponse } from '../constants/appApiResponse';
// import { CustomAxiosResponse } from '../constants/appApiResponse';




const axiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers,
  };

  config.data;
  return config;
});

// axiosClient.interceptors.response.use(
//   (res: AxiosResponse) => {
//     try {
//       if (res.data && res.status === 200) {
//         return res.data;
//       }
//       throw new Error('Error');
//     } catch (error) {
//       console.log('Error api:', JSON.stringify(error));
//       throw new Error('Error');
//     }
//   },
//   (error: any) => {
//     if (error.response) {
//       // Trường hợp có phản hồi từ server
//       const errorData = error.response.data;
//       return errorData || 'Đã xảy ra lỗi';
//       // console.log(errorMessage);
//     } else {
//       // Trường hợp không có phản hồi từ server
//       console.log('Error api:', JSON.stringify(error));
//     }
//   }
// );

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    try {
      if (res.data && res.status === 200) {
        return res.data;
      }
      throw new Error('Error');
    } catch (error) {
      console.log('Error api:', JSON.stringify(error));
      throw new Error('Error');
    }
  },
  (error: any) => {
    if (error.response) {
      // Trường hợp có phản hồi từ server
      const errorData = error.response.data;
      throw new Error(JSON.stringify({ error: errorData, message: 'Đã xảy ra lỗi' }));
    } else {
      // Trường hợp không có phản hồi từ server
      console.log('Error api:', JSON.stringify(error));
      throw new Error('Error');
    }
  }
);




export default axiosClient;
