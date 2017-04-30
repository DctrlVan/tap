#!/usr/bin/env node

var evdev = require('evdev');

var reader = new evdev();

var device = reader.open("/dev/input/by-id/usb-Yubico_Yubico_Yubikey_II-event-kbd");

var fob = ""

function keyparse(code) {
  var key = code.substr(4);
  if (key == "ENTER") {
    console.log(fob);
    fob = ""
  } else {
    fob = fob + key;
  }
}

reader.on("EV_KEY",function(data){
  if (data.value == 1)
    keyparse(data.code)
});
