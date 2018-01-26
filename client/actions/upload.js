import superagent from 'superagent';
import sha1 from 'sha1';

import types from '../types/types';

const {
  UPLOAD_COVER,
  UPLOAD_PDF,
  FAILED_TO_UPLOAD_COVER,
  FAILED_TO_UPLOAD_PDF,
  UPLOAD_COVER_SUCCESSFUL,
  UPLOAD_PDF_SUCCESSFUL,
  CLEAR_UPLOAD_STATE
} = types;
/**
 * @description Upload file to cloudinary
 * 
 * @param {object} data
 * 
 * @return {object} UploadRequest
 */
const upload = (data) => {
  const cloudName = process.env.CLOUD_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const timestamp = Date.now() / 1000;
  const paramsStr = `timestamp=\
${timestamp}&upload_preset=${process.env.UPLOAD_PRESET+process.env.PARAM_STRING}`;
  const signature = sha1(paramsStr);
  const params = {
    api_key: process.env.API_KEY,
    timestamp,
    upload_preset: process.env.UPLOAD_PRESET,
    signature,
  };
  const uploadRequest = superagent.post(url);
  uploadRequest.attach('file', data);
  Object.keys(params).forEach((key) => {
    uploadRequest.field(key, params[key]);
  });
  return uploadRequest;
};
/**
 * @description Handle file upload
 * 
 * @param {object} data
 * @param {string} uploadType
 * 
 * @return {object} Dispatch
 */
const uploader = (data, uploadType) => (dispatch) => {
  if (uploadType === 'cover') {
    dispatch({ type: UPLOAD_COVER });
  } else {
    dispatch({ type: UPLOAD_PDF });
  }
  upload(data).end((error, response) => {
    if (error) {
      if (uploadType === 'cover') {
        return dispatch({
          type: FAILED_TO_UPLOAD_COVER,
          payLoad: error.response.data,
        });
      }
      return dispatch({
        type: FAILED_TO_UPLOAD_PDF,
        payLoad: error.response.data,
      });
    }
    if (uploadType === 'cover') {
      return dispatch({
        type: UPLOAD_COVER_SUCCESSFUL,
        payLoad: response.body.url,
      });
    }
    return dispatch({
      type: UPLOAD_PDF_SUCCESSFUL,
      payLoad: response.body.url,
    });
  });
};
/**
 * @description Clear upload state
 * 
 * @return {object} Dispatch
 */
export const clearUploadState = () => dispatch => dispatch({
  type: CLEAR_UPLOAD_STATE
});
export default uploader;
