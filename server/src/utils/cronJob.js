import { getExceededDeadlineAndRemind } from './remindUser';
import upgradeUser from './upgradeUser';

const cron = require('cron');
// Cron Job to remind users exceeding deadline

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

// Cron job to upgrade users due for upgrade

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
