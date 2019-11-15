// $(function() {
//     var params = {
//         // Request parameters
//     };
//     // https://sandbox.momodeveloper.mtn.com/collection
//     $.ajax({
//         url: "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay?" + $.param(params),
//         beforeSend: function(xhrObj){
//             // Request headers
//             xhrObj.setRequestHeader("Authorization","");
//             xhrObj.setRequestHeader("X-Callback-Url","");
//             xhrObj.setRequestHeader("X-Reference-Id","");
//             xhrObj.setRequestHeader("X-Target-Environment","");
//             xhrObj.setRequestHeader("Content-Type","application/json");
//             xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
//         },
//         type: "POST",
//         // Request body
//         data: "{body}",
//     })
//     .done(function(data) {
//         alert("success");
//     })
//     .fail(function() {
//         alert("error");
//     });
// });

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const user = 'ec315ecb-e9e7-4d96-a1c1-697f4640478d'
const password = 'b1d6dcee8a5444e8890405cee69fcf21'
const credentials = user + ':' + password
const auth = btoa(credentials)
console.log(auth)
app.post('https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay', async (req, res) => {

})
// Subscription key is assigned to Ocp-Apim-Subscription-Key(My general Password) in the header
// The Provider sends a POST {baseURL}/apiuser/{APIUser}/apikey request to Wallet platform
// Key id returned for that user who made the request
// {
//     "apiKey": "b1d6dcee8a5444e8890405cee69fcf21"
// }
// We then make a GET request to MTN to get that apiKey

// My user -- ec315ecb-e9e7-4d96-a1c1-697f4640478d

// Encoded auth -- ZWMzMTVlY2ItZTllNy00ZDk2LWExYzEtNjk3ZjQ2NDA0NzhkYjFkNmRjZWU4YTU0NDRlODg5MDQwNWNlZTY5ZmNmMjE=

// To request for a token you need password => api key generated    |
//                                                                  |----POSTMAN (go under authorication and choose basic Auth)
// then user name => uuid that was generated(X-Reference-Id)        |
