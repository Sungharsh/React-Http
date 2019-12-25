import * as Sentry from '@sentry/browser';


function init(){
    Sentry.init({dsn: "https://43c2158f99a74f15a8f8c06a1a6a96c4@sentry.io/1866262"});
}

function log(error){
    Sentry.captureException(error);
}

export default{
    init,
    log
}