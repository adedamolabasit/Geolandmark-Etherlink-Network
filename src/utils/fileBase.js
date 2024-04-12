import { toast } from 'react-toastify';

  const AWS = require("aws-sdk");
  const s3 = new AWS.S3({
    endpoint: "https://s3.filebase.com",
    signatureVersion: "v4",
    accessKeyId: "968C3D10764359AFF308",
    secretAccessKey: "8MrCCD5AqhKWnwSuSutROSd2c3o5LfCzZzWCSfrr",
  });


  export const uploadLangistryMedia = async  (userObj) => {
    
    const data = JSON.stringify({
      userObj
    });
    const media_registry = {
      Bucket: "landassets",
      Key: `Geolandmark-${userObj.planId}-${userObj.fullName}`,
      Body: data,
      ContentType: "registry",
      Metadata: {
        owner: `${userObj['planId']}`,
      },
    
  }
     s3.putObject(media_registry, (err, data) => {
    if (err) {
      console.log("Error! uploading data", err.stack);
      toast.error("Error while uploading data. Try again later");
    } else {
      console.log("data uploaded successfully ", data);
      toast.success("data details pinned to ipfs successfully")
    }
  });

}

export const getMediaRegistry =  (userObj) => {
    const params = {
      Key: `Geolandmark-${userObj.planId}-${userObj.fullName}`,
      Bucket: "landassets",
    };
    const res = s3.getObject(params, (err, data) => {
      if (err) {
        console.error("Data does not exists: ", err.stack);
        toast.error(err.stack)
      } else {
        toast.success("data",data)
        return data;
      }
    });
  };
  