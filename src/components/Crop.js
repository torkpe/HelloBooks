import React from 'react';
import CropperJS from 'react-cropperjs';
 
export default class Demo extends React.Component {
         constructor() {
        super();
 
        this.state = {
            image: null,
            previewImage: null
        };
    }
 onChange(e){
     this.setState({image: e.target.value})
 }
  _crop(){
    // image in dataUrl 
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }
 
  render() {
    return (
        <div>
                            <input type='file' accept='image/*' onChange={this.onChange}
                            name='cover'/>
           fddfbgfbgf
        </div>
    );
  }
}