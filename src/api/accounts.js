import axios from 'axios';

const getUserData = async ({ id, token }) => {
  const requestStringOne = `${process.env.REACT_APP_GATEWAY_HOST || '127.0.0.1'}`;
  const requestStringTwo = `/${process.env.REACT_APP_ACCOUNT_BASEURL}/${id}`;
  const requestString = requestStringOne + requestStringTwo;

  const response = await axios.get(requestString, {
    headers: { Authorization: token },
  });
  const account = response.data;
  return account;
};

const postUser = async (payload) => {
  const requestStringOne = `${process.env.REACT_APP_GATEWAY_HOST || '127.0.0.1'}`;
  const requestStringTwo = `/${process.env.REACT_APP_ACCOUNT_BASEURL}/`;
  const requestString = requestStringOne + requestStringTwo;

  const response = await axios.post(requestString, payload);

  const postStatus = response.status;
  return postStatus;
};

const allMethods = {
  getUserData,
  postUser,
};

export default allMethods;
