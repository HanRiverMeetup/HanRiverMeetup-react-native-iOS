import serverInfo from './configs';

const ACCESS_ENDPOINT = `${serverInfo.url}/access`;

const Fetch = async (method, url, params) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    return response.json();
  } catch (error) {
    alert(error.messages);
  }
};

export class AccessAPI {
  static loginValidate = params => Fetch('POST', `${ACCESS_ENDPOINT}/loginValidate`, params);
  // static loginValidate = params => console.log(params);

  // static registUser = params =>
  //   fetch(`${serverInfo.url}/access/registUser`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json; charset=utf-8',
  //     },
  //     body: JSON.stringify(params),
  //   });
}
