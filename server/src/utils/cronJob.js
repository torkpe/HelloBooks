import { getExceededDeadlineAndRemind } from './remindUser';
import upgradeUser from './upgradeUser';

const cron = require('cron');

export const remindUser = () => {
  const job1 = new cron.CronJob({
    cronTime: '* * * * *',
    onTick() {
      getExceededDeadlineAndRemind();
    },
    start: false,
    timeZone: 'America/Los_Angeles'
  });
  job1.start();
};

export const upgradeUsers = () => {
  const job1 = new cron.CronJob({
    cronTime: '* * * * *',
    onTick() {
      upgradeUser();
    },
    start: false,
    timeZone: 'America/Los_Angeles'
  });
  job1.start();
};
