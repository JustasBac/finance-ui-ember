import Service from '@ember/service';
import ENV from 'finance-ui-ember/config/environment';

export default class RequestsService extends Service {
  async fetch(endPoint) {
    console.log(`${ENV.apiUrl}`);
    try {
      const response = await fetch(`${ENV.apiUrl}/${endPoint}`, {
        method: 'GET',
        headers: {
          // accept: 'application/json',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY5MDg3OTcyMywianRpIjoiOTRjNTNmYmUtMzljMC00NmZmLWEwZjAtNDMxMzRmMDhhM2U0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MSwibmJmIjoxNjkwODc5NzIzLCJleHAiOjE2OTA4ODA2MjN9.u84taferecWicJeTxFEP0liEx1ofYK7GNTKBT9wCDfU`,
        },
      });
      return await response.json();
    } catch (e) {
      console.log(e);
    }
  }
}
