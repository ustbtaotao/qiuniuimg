const axios = require('axios');
const page1 = require('./page1.json');
const fs = require('fs');
const qiniuUrl  = '你的七牛域名';
const pathSys = require('path');
page1.data.entries.forEach((item, index) => {
    if(index === 0)
    axios({
        method: 'get',
        url: item.dl_remove_attname_url,
        responseType: 'stream'
    })
        .then(function (response) {
            let path = item.dl_remove_attname_url.replace(qiniuUrl, '.');
            path = path.substring(0, path.lastIndexOf('/'));
            path = pathSys.join(__dirname, path);
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            console.log(item.dl_remove_attname_url);
            response.data.pipe(fs.createWriteStream( pathSys.join(__dirname, item.dl_remove_attname_url.replace(qiniuUrl, ''))))
        });

});
