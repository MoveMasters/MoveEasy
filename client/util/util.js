import axios from 'axios';
const ip = '10.6.27.137';
const port = '9000'

/************************************ URLS ************************************/
const postCroppedImageURL = `http://${ip}:${port}/api/item/croppedImage`;
const getClarifaiTokenURL = `http://${ip}:${port}/api/auth/clarifaiToken`;
//const postImageToClarifaiURL = `https://api.clarifai.com/v1/tag/`;
const postImageToClarifaiURL = `https://api.clarifai.com/v2/tag/`;
const getClarifaiInfoURL = `http://${ip}:${port}/api/auth/clarifaiInfo`;




/************************************ PHOTOS ************************************/
var clarApp;
var clarifaiTags;
var clarifaiToken;
var clarifaiItems;
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
	return axios.get(getClarifaiInfoURL)
	.then( response => {
		const data = response.data;
		clarifaiTags = data.clarifaiTags;
		clarifaiToken = data.clarifaiToken;
		clarifaiItems = data.clarifaiItems;
		nameMappings = data.nameMappings;

    clarApp = new Clarifai.App(
      data.ClarifaiClientId,
      data.ClarifaiClientSecret
    );

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
  clarifaiTags.forEach( item => {
    var lowered = item.toLowerCase().split(' ');
    for (var i = 0; i < checkList.length; i ++) {
      var tagcheck = checkList[i];
      if (lowered.indexOf(tagcheck) > -1) {
        matches.push(item);
        break;
      }
    }
  });
  return matches;
}


const predict = (concepts) => {
  var possibilities = [];
  for (var i = 0; i < concepts.length; i ++) {
    var tag = concepts[i].name;
    //var tag = concepts[i];
    console.log('tag', tag);
    var result = getMatches(tag);
    possibilities = possibilities.concat(result);
  }
  console.log('possibilities', possibilities);
  return possibilities;
};




const postImageToClarifai = (base64Image) => {
	// return axios(postImageToClarifaiURL, {
	// 	  method: 'post',
	// 	  model: 'general-v1.3',
	// 	  headers: {
	// 	    'Authorization': `Bearer ${clarifaiToken}`
	// 	  },
	// 	  data: {
	// 	  	'encoded_data': base64Image
	// 	  }
	// 	})
	//   .then(function (response) {
	//     console.log(response, 'response from inside utils');
	//     // const concepts = response.data.outputs[0].data.concepts;
	//     const concepts = response.data.results[0].result.tag.classes;

	//     return predict(concepts);
	//   })
	//   .catch(function (error) {
	//     console.log('Error postImageToClarifai:', error);
	//     throw error;
	//   });


  return  clarApp.models.predict(Clarifai.GENERAL_MODEL, {base64: base64Image}).then(
    (response) => {
      const concepts = response.data.outputs[0].data.concepts;
      return predict(concepts);
    },
    (err) => {
      console.error('predict err', err);
      throw err;
    }
  );
}




/************************************ EXPORT ************************************/

export default { postCroppedImage, postImageToClarifai, getClarifaiInfo }