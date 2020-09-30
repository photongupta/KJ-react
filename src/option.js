const getUserInfoOption = function (token) {
  return {
    host: 'www.googleapis.com',
    path: '/oauth2/v3/userinfo',
    headers: {
      'User-Agent': 'curl/7.64.1',
      Authorization: `Bearer ${token}`,
    },
  };
};

const getTokenOption = function (code, appInfo) {
  const {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} = appInfo;
  const clientId = `client_id=${CLIENT_ID}`;
  const clientSecret = `client_secret=${CLIENT_SECRET}`;
  const redirect = `redirect_uri=${REDIRECT_URI}`;
  const grant_type = 'grant_type=authorization_code';
  const tokenQuery = `code=${code}&${clientId}&${clientSecret}&${redirect}&${grant_type}`;
  return {
    host: 'www.googleapis.com',
    method: 'POST',
    path: `/oauth2/v4/token?${tokenQuery}`,
    headers: {
      Accept: 'application/json',
    },
  };
};

module.exports = {getTokenOption, getUserInfoOption};
