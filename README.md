#CoinJar-Store

Storage for [CoinJar](http://coinjar.io) market rates in realtime.

Using an on-the-minute interval, fetches rates from [some source](http://coinjar-data.herokuapp.com/fair_rate.json) and stores the retrieved JSON in a SQLite database.

[![Build Status](https://travis-ci.org/loklaan/coinjar-store.svg?branch=master)](https://travis-ci.org/loklaan/coinjar-store) [![Coverage Status](https://coveralls.io/repos/loklaan/coinjar-store/badge.png?branch=master)](https://coveralls.io/r/loklaan/coinjar-store?branch=master)

#Usage
**Install:**  
`$ npm install`

**Configuration:**  
See config.json or run: `$ node coinjar-store.js --help`

#Planned
Option to choose either the seemingly public source or the users private [CoinJar API](https://developer.coinjar.io/display/CD/CoinJar+API).

##Notes
Intended to be used with an unfinished graphing webapp.
