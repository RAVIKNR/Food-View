const ImageKit = require('@imagekit/nodejs')


const client = new ImageKit({
  privateKey: process.env.PRIVATE_KEY, // This is the default and can be omitted
});


async function uploadFile(file,fileName){

    const response = await client.files.upload({
      file:file.toString("base64"),
      fileName:fileName,
    });

    return response

}

module.exports = {uploadFile}