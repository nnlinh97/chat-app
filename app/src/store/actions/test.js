var getUrls = require('get-urls');
const isImageUrl = require('is-image-url');
const urlRegex = require('url-regex');

let text = 'https://www.facebook.com/ https://www.ibo.org/globalassets/digital-tookit/logos-and-programme-models/myp-programme-logo-en.png?fbclid=IwAR02EtxwVqiIGLcIc5gRPk4Rr2jNtVTy6A7pjSZ7s_qkakewGd0tVEpdupw'
// console.log(text.match(urlRegex())); 
// const allUrls = text.match(urlRegex());
// allUrls.forEach(item => {
//     console.log(isImageUrl(item));
// });
console.log(isImageUrl('//scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-1/p160x160/41336413_1205442736272721_1045035512429019136_n.jpg'));

// https://www.google.com.vn/search?q=get+url++npm&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiNocjK_sHeAhUCHXAKHchWBAkQ_AUIDygC&biw=1396&bih=657#imgrc=x71dv2Tf-CAH_M: