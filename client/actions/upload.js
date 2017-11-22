import superagent from 'superagent';
import sha1 from 'sha1';

const dotenv = require('dotenv');

dotenv.config();

const upload = (data) => {
  const cloudName = process.env.CLOUD_NAME;
  console.log(cloudName);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const timestamp = Date.now() / 1000;
  const uploadPreset = process.env.UPLOAD_PRESET;
  const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset + process.env.PARAM_STRING}`;
  const signature = sha1(paramsStr);
  const params = {
    api_key: process.env.API_KEY,
    timestamp,
    upload_preset: uploadPreset,
    signature,
  };
  const uploadRequest = superagent.post(url);
  uploadRequest.attach('file', data);
  Object.keys(params).forEach((key) => {
    uploadRequest.field(key, params[key]);
  });
  return uploadRequest;
};
const uploader = (data, uploadType) => (dispatch) => {
  if (uploadType === 'cover') {
    dispatch({ type: 'UPLOAD_COVER' });
  } else {
    dispatch({ type: 'UPLOAD_PDF' });
  }
  upload(data).end((error, response) => {
    if (error) {
      if (uploadType === 'cover') {
        return dispatch({
          type: 'UPLOAD_COVER_FAILED',
          payLoad: error.response.data,
        });
      }
      return dispatch({
        type: 'UPLOAD_PDF_FAILED',
        payLoad: error.response.data,
      });
    }
    if (uploadType === 'cover') {
      return dispatch({
        type: 'UPLOAD_COVER_SUCCESSFUL',
        payLoad: response.body.url,
      });
    }
    return dispatch({
      type: 'UPLOAD_PDF_SUCCESSFUL',
      payLoad: response.body.url,
    });
  });
};
export default uploader;
