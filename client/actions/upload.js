import superagent from 'superagent';
import sha1 from 'sha1';

/**
 * upload file
 * @param {object} data
 * @return {object} uploadRequest
 */
const upload = (data) => {
  const cloudName = 'hellobooks';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
  const timestamp = Date.now() / 1000;
  const uploadPreset = 'wad3pvmg';
  const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}8c060McBdeyZClXXNfNgpG8QqXU`;
  const signature = sha1(paramsStr);
  const params = {
    api_key: '521381859673832',
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
/**
 * @param {object} data
 * @param {string} uploadType
 * @return {void}
 */
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
