const fs = require('fs');

const newHorseman = require('../../utils/newHorseman');

const likePicture = (url, cookies) => {
  return new Promise((resolve, reject) => {

    const horseman = newHorseman();

    console.log('liking url: ', url);

    let imgId = url.split('/');
    imgId = imgId[imgId.length - 2];

    horseman
      .cookies(cookies)
      .open(url)
      .wait(1000)
      // .screenshot('beforeclick.png')
      .mouseEvent('doubleclick', 560, 400)
      .wait(3000)
      .screenshot('screenshots/likes/' + imgId +  '.png')
      .then(() => {
        console.log('done screenshot.');

        fs.appendFile('logs/likes.txt', url + '\n', err => {

          horseman.close();
          resolve();

        });

      });
  });
};

module.exports = likePicture;
