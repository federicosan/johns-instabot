// utils
const { randBetween, msToMin } = require('../../utils');
const getDateFormatted = require('../../utils/getDateFormatted');
// modules
const handleManager = require('../../modules/handleManager');
const queueManager = require('../../modules/queueManager');
// settings
const settings = require('../../settings.js');
// actions
const followAndLog = require('../multiple/followAndLog');


const scheduleFollow = async (username, cookies, browser) => {

    const rangeInMs = settings.follows.waitRange.map(min => min * 1000 * 60);
    const waitTime = randBetween.apply(null, rangeInMs);
    setTimeout(async () => {
      try {
        await followAndLog(username, cookies, browser);
        queueManager.removeFollow(username);
      } catch (e) {
        console.error('followUser error', e, 'though we shouldnt care because it was handled in followUser');
      }
    }, waitTime);
    console.log('scheduled follow of ' + username + ' in...' + msToMin(waitTime) + 'min');
    queueManager.addFollow(username);
};

module.exports = scheduleFollow;
