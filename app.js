#!/usr/bin/env /usr/local/bin/node

/*
    <bitbar.title>VPN Country Flag</bitbar.title>
    <bitbar.version>v0.1</bitbar.version>
    <bitbar.author>Miguel Laginha</bitbar.author>
    <bitbar.author.github>brecke</bitbar.author.github>
    <bitbar.desc>It shows the country flag corresponding to your IP Address, which is useful if you use VPN to route your traffic to other countries.</bitbar.desc>
    <bitbar.image></bitbar.image>
    <bitbar.dependencies>node</bitbar.dependencies>
    <bitbar.abouturl>http://miguellaginha.com/</bitbar.abouturl>
*/

const flag = require("country-emoji").flag;
const { Requester } = require("node-duckduckgo");
const requester = new Requester("vpn-country-flag");
const ipRegex = require("ip-regex");

requester.request("ip", (err, response, body) => {
  if (err) {
    console.log(err);
    return;
  }
  body = JSON.parse(body);

  let ipAddress = body.Answer.match(ipRegex())[0];
  let location = body.Answer.match(/>(.*)</g)[0];
  location = location.slice(1, location.length - 1);
  let city = location.split(" ")[0];
  city = city.slice(0, city.length - 1);
  let country = location.split(" ")[2];

  console.log(`${city} ${flag(country)}`);
  console.log("---");
  console.log(`${ipAddress} | bash=~/.bitbar/ifconfig.sh terminal=false`);
});
