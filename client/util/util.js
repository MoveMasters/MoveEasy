import axios from 'axios';
const ip = '10.6.27.137';
const port = '9000'

/************************************ URLS ************************************/
const postCroppedImageURL = `http://${ip}:${port}/api/item/croppedImage`;
const getClarifaiTokenURL = `http://${ip}:${port}/api/auth/clarifaiToken`;
const postImageToClarifaiURL = `https://api.clarifai.com/v1/tag/`;
const getClarfaiInfoURL = `http://${ip}:${port}/api/auth/clarifaiInfo`;




/************************************ PHOTOS ************************************/
var clarfaiTags;
var clarfaiToken;
var clarfaiItems;
var nameMappings;


const postCroppedImage = (image) => {
	return axios.post(postCroppedImageURL, { image })
	  .then(function (response) {
	    console.log('Response from postCroppedImage:', response);
	  })
	  .catch(function (error) {
	    console.log('Error from postCroppedImage:', error);
	  });
}

const getClarifaiInfo = () => {
	return axios.get(getClarfaiInfoURL)
	.then( response => {
		const data = response.data;
		clarfaiTags = data.clarfaiTags;
		clarfaiToken = data.clarfaiToken;
		clarfaiItems = data.clarfaiItems;
		nameMappings = data.nameMappings;
		return data;
	})
	.catch( error => {
		console.log('Error getClarifaiInfo', error) 
		throw err;
	});
}


const getMatches = tag => {
  var checkList = [tag];
  if (tag in nameMappings) {
    checkList.push(nameMappings[tag]);
  }
  var matches = [];
  items2check.forEach( item => {
    var lowered = item.toLowerCase();
    for (var i = 0; i < checkList.length; i ++) {
      var tagcheck = checkList[i];
      if (lowered.includes(tagcheck)) {
        matches.push(item);
        break;
      }
    }
  });
  return matches;
}


const predict = concepts => {
  var possibilities = [];
  for (var i = 0; i < data.length; i ++) {
    var tag = data[i].name;
    var result = getMatches(tag);
    possibilities = possibilities.concat(result);
  }
  console.log('possibilities', possibilities);
  return possibilities;
};




const postImageToClarifai = (base64Image) => {
	return axios(postImageToClarifaiURL, {
		  method: 'post',
		  model: 'general-v1.3',
		  headers: {
		    'Authorization': `Bearer ${clarfaiToken}`
		  },
		  data: {
		  	'encoded_data': image
		  }
		})
	  .then(function (response) {
	    console.log(response, 'response from inside utils');
	    const concepts = response.data.outputs[0].data.concepts;
	    return predict(concepts);
	  })
	  .catch(function (error) {
	    console.log('Error postImageToClarifai:', error);
	    throw error;
	  });
}




/************************************ EXPORT ************************************/

export default { postCroppedImage, postImageToClarifai, getClarifaiInfo }