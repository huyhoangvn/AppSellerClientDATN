import axios, { AxiosRequestConfig } from 'axios';

const baseLink = 'http://10.0.2.2:3000/api/nhanvien';
const loginApiUrl = `${baseLink}/auth`;

export default async function login(taiKhoan: string, matKhau: string): Promise<void> {
  const config: AxiosRequestConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: loginApiUrl,
    headers: { 
      'Authorization': '', 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
        taiKhoan,
        matKhau
    }), // Need to stringify the data
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data.msg));
  } catch (error) {
    console.log(error);
  }
}