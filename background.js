var tabDisabled = {};

function sendToTab(tab, message) {
  chrome.tabs.sendRequest(tab.id, message, function(response) {});
}

chrome.pageAction.onClicked.addListener(function(tab) {
  var disabled = tabDisabled[tab.id] || false;

  if (disabled) {
    chrome.pageAction.setIcon({path: "icon-19.png", tabId: tab.id});
    chrome.pageAction.setTitle({title: "Click to Enable Hulu Filter", tabId: tab.id});
    tabDisabled[tab.id] = false;
    sendToTab(tab, {
      type: 'restart'
    });
  } else {
    chrome.pageAction.setIcon({path: "icon-19-disabled.png", tabId: tab.id});
    chrome.pageAction.setTitle({title: "Click to Enable Hulu Filter", tabId: tab.id});
    tabDisabled[tab.id] = true;
    sendToTab(tab, {
      type: 'start'
    });
  }
});

function msg(title, message) {
  notification = webkitNotifications.createNotification('48.png', title, message);
  notification.show();
  return notification;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.type == "msg") msg(request.title, request.message);
  if (request.type == "enable") chrome.pageAction.show(sender.tab.id);
  sendResponse({});
});
