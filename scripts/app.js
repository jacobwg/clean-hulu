window.localStorage['test'] = 'works';

if (document.player || document.getElementById('player')) {
  chrome.extension.sendRequest({type: "enable"}, function(response) {});

  var xhr = new XMLHttpRequest();
  xhr.open("GET", chrome.extension.getURL('/hulu-filter/runner/application.js'), true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
      return;
    }

    window.baseUrl='http://tmfdb.org';
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('charset', 'UTF-8');
    s.text = xhr.responseText;
    document.documentElement.appendChild(s);
  };
  xhr.send();

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log(window.muter);
    if (request.type == "stop") {
      window.muter.stopRebuildTesting();
      window.muter.clear();
      Notification.info('Filter stopped');
    } else if (request.type == "restart") {
      window.muter.rebuild();
      window.muter.startRebuildTesting();
      Notification.success('Filter started...');
    }
    sendResponse({});
  });
}