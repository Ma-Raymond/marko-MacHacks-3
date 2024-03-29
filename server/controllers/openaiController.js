const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req,res) => {
    const { prompt, size } = req.body; // should be the body
    
    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024'

    try {
        const response = await openai.createImage({
            prompt,
            n: 3,
            size: imageSize
        });
        const items = response.data
        const imageUrl1 = items.data[0].url
        const imageUrl2 = items.data[1].url
        const imageUrl3 = items.data[2].url

        res.status(200).json({
            success: true,
            data: [imageUrl1,imageUrl2,imageUrl3]
        });
    } catch (error){
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
        }
        res.status(400).json({
            success: false,
            error: 'The image could not be generated'
        });
    }
}

module.exports = { generateImage }