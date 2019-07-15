const express = require('express');
const server = express();
const NodeCache = require("node-cache");
const request = require('request');
// CACHE
const cache = new NodeCache({stdTTL: 60 * 2,checkperiod: 60 * 1000 * 1});// cache for 2 minutes
const headers = {
    'Authorization': 'training-token ABCDEFGHIJKML'
};

const options = {
    url: 'https://training-service.relocate.ly/stations',
    headers: headers
};

const callback =(error, response, body) => {
    if (!error && response.statusCode == 200) {
        cache.set("apiData", body, function (err, success) {
            if (!err && success) {
                console.log('save api data in cache');
            }
        });
    }
    else {
        console.log('api data has not been cached');
    }
}

request(options, callback);


// ROUTES
server.get('/', (req, res) => {
    cache.get("apiData", function (err, apiData) {
        if (!err) {
            if (apiData == undefined) {
                // key not found
                res.send([]);
            } else {
                res.send(apiData);
            }
        }
    });
    
});

// LISTEN
server.listen(8080, 'localhost', e => {
    if (e) {
        console.log(e);
    }
    else {
        console.log("listenning on 8080");
    }
})