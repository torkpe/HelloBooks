import axios from 'axios';
import superagent from 'superagent';
import sha1 from 'sha1';

const upload = (data) => {
    const cloudName = 'hellobooks'
    const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/auto/upload'
    const timestamp = Date.now()/1000
    const uploadPreset = 'wad3pvmg'
    const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'8c060McBdeyZClXXNfNgpG8QqXU'
    const signature = sha1(paramsStr)
    const params = {
        'api_key': '521381859673832',
        'timestamp': timestamp,
        'upload_preset': uploadPreset,
        'signature': signature
    }
    let uploadRequest = superagent.post(url)
    uploadRequest.attach('file', data)
    Object.keys(params).forEach((key) => {
        uploadRequest.field(key, params[key])
    })
    return uploadRequest
}
const uploader = (data, uploadType) => {
    return dispatch =>{
        if(uploadType === 'cover'){
            dispatch({type: 'UPLOAD_COVER'})
        }else{
            dispatch({type: 'UPLOAD_PDF'})
        }
        upload(data).end((err, resp) => {
            if(err){
                if (uploadType === 'cover') {
                    return dispatch({
                        type: 'UPLOAD_COVER_FAILED',
                        payLoad: err
                    })
                }
                return dispatch({
                    type: 'UPLOAD_PDF_FAILED',
                    payLoad: err
                })
            }
            if ( uploadType ==='cover') {
                return dispatch({
                    type: 'UPLOAD_COVER_SUCCESSFUL',
                    payLoad: resp.body.url
                })
            }
            return dispatch({
                type: 'UPLOAD_PDF_SUCCESSFUL',
                payLoad: resp.body.url
            })
        })
    }
}
export default uploader