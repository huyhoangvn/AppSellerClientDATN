import axios, { AxiosRequestConfig } from 'axios';
const baseLink = 'http://10.0.2.2:3000/api/nhanvien';

const MonApiUrl = `${baseLink}/mon`;

export default async function modifyMonData(tenMon: string, giaTien: number, hinhAnh: string, trangThai: boolean): Promise<void> {
  
    const config: AxiosRequestConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: MonApiUrl,
      headers: { 
        'Authorization': '', 
        'Content-Type': 'application/json'
      },
      // Need to stringify the data
    };
  

    

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data.msg));
    } catch (error) {
      console.log(error);
    }



  }