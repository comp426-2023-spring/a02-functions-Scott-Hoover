#!/usr/bin/env node

import minimist from 'minimist'
import moment from 'moment-timezone'
import fetch from 'node-fetch'


const args = minimist(process.argv.slice(2))

if(args.h){

    let help_ = `Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`
  
    process.stdout.write(help_)
    process.exit(0)
}

const timezone = args.z || moment.tz.guess();

var currday = 1;
if ('d' in args){
    currday = args.d;
}
var latitude = args.n || args.s * -1;
var longitude = args.e || args.w * -1;

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&timezone='+timezone+'&daily=precipitation_hours&current_weather=true');

const data = await response.json();

if (args.j){
    console.log(data);
    process.exit(0);
}





if (currday == 1){
    console.log("tomorrow.")
} else if (currday == 0){
    console.log("today.")
} else {
    console.log("in " + currdays + " days.")
}




process.exit(0);
