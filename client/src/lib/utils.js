import axios from 'axios';

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