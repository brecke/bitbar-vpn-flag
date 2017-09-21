#!/usr/bin/env /usr/local/bin/node

/*
    <bitbar.title>VPN Country Flag</bitbar.title>
    <bitbar.version>v0.1</bitbar.version>
    <bitbar.author>Miguel Laginha</bitbar.author>
    <bitbar.author.github>brecke</bitbar.author.github>
    <bitbar.desc>It shows the country flag corresponding to your IP Address, which is useful if you use VPN to route your traffic to other countries.</bitbar.desc>
    <bitbar.image>https://user-images.githubusercontent.com/19879/30689083-d8e4d2bc-9eb7-11e7-8d83-d45a9079c287.png</bitbar.image>
    <bitbar.dependencies>node</bitbar.dependencies>
    <bitbar.abouturl>https://github.com/brecke/bitbar-vpn-flag</bitbar.abouturl>
*/

const ipapi = require('ipapi.co');
const https = require('https');
const flag = require('country-code-emoji').flag;

let IPAddress;
https.get('https://ipapi.co/ip/', function(resp){
    var body = ''
    resp.on('data', function(data){
        body += data;
    });

    resp.on('end', function(){
	IPAddress = body;
	ipapi.location((country) => { 
		console.log(flag(country)); 
	}, IPAddress.toString(), '', 'country');
    });
});


