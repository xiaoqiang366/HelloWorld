chrome.webRequest.onAuthRequired.addListener(function(e,l){console.log(e),l({authCredentials:{username:"jerlala@163.com",password:"Yy123457"}})},{urls:["<all_urls>"]},["asyncBlocking"]);