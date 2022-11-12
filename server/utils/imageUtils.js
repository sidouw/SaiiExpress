
const uploadToImagur = async (image)=>{
    // return false
    var base64Data=''
  
    // base64Data = image.replace(/^data:image\/png;base64,/, "")
    if (image.includes('png')) {
      base64Data = image.replace(/^data:image\/png;base64,/, "")
    }else if (image.includes('jpeg')) {
      base64Data = image.replace(/^data:image\/jpeg;base64,/, "")
    } else if (image.includes('jpg')) {
      base64Data = image.replace(/^data:image\/jpg;base64,/, "")
    }else {
      return false
    }
  
    // console.log(base64Data+'____________________');
      const rimage ={}
      var data = new FormData();
      data.append('image',base64Data);
      data.append('type','base64');
  
      var config = {
        method: 'post',
        url: 'https://api.imgur.com/3/upload',
        headers: { 
          Authorization: `Client-ID ${imgurkey.Client_ID}`, 
          ...data.getHeaders()
        },
        data : data
      };
  
      try {
        const response = await  axios(config)
        // for imageDeletion
        rimage.deletehash = response.data.data.deletehash //Add delete Image on Post delete
        rimage.link = response.data.data.link
        return rimage
      } catch (error) {
        console.log(error.response.statusText);
        return false
        
      }
  
  }
  