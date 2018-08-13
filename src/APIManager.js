import serverInfo from './configs';

const ACCESS_ENDPOINT = `${serverInfo.url}/access`;

const Fetch = async (method, url, params) => {
  let response;
  try {
    response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  } catch (error) {
    alert(error.messages);
  }
  return response.json();
};

export class AccessAPI {
  static loginValidate = params => Fetch('POST', `${ACCESS_ENDPOINT}/loginValidate`, params);
}
