import qs from 'qs';
import Axios, { REQUEST_METHOD } from './axios';

const axios = new Axios('https://hotels-map.s3.ap-northeast-1.amazonaws.com')

type Status = 'Done' | 'Getting';
type Vacancy = {
  id: string;
  status: Status;
  vacancy: boolean;
  updatedAt: string;
};

export async function sendEventLogs(ids: string[], uuid: string): Promise<{ vacancies: Vacancy[] }> {
  const headers = {
    'X-Unique-ID': uuid,
  };
  const query = qs.stringify({ ids }, { encode: false });
  const url = `vacancies?${query}`;
  return await axios.request(REQUEST_METHOD.GET, url, { headers });
}
