import { CronJob, CronTime } from "cron";

type lapso = string|Date;
type callback = ()=>void
export class cron{


    static execute(lapso:lapso,callback:callback):CronJob{
        const job = new CronJob(lapso,callback)
        return job;
    }


}