import axios from 'axios';
import moment from 'moment';
import CONFIG from '../config/config';

export const log = (anyObj) => {
  if (CONFIG.DEV) {
    // custom console
    console.log(anyObj);
  }
};

export const request = async ({
  url,
  requestBody,
  method = 'POST',
  headers,
  token
}) => {
  try {
    log(url, requestBody);
    log(`Target: ${url}`);
    log(JSON.stringify(requestBody));

    const { data } = await axios({
      method,
      url,
      headers: {
        ...headers,
        Authorization: token && `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(requestBody)
    });
    log(data);

    if (!data.success) {
      console.log(data.err);
    }
    return data;
  } catch (error) {
    return log(error);
  }
};

export const durationToTime = (duration) => moment.utc(parseInt(duration, 10) * 1000).format('HH:mm:ss');

export const toKda = (kills = 0, deaths = 1, assists = 0) => parseFloat((kills + assists) / deaths).toFixed(2);
