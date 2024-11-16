"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cron = void 0;
const cron_1 = require("cron");
class cron {
    static execute(lapso, callback) {
        const job = new cron_1.CronJob(lapso, callback);
        return job;
    }
}
exports.cron = cron;
