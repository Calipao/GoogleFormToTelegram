var token = "telegrambottokenhere";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/appidhere/exec";
var groupName = "@TestGroup1";
var formID = "formlinkid";

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function getUpdates() {
  var url = telegramUrl + "/getUpdates";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function deleteWebhook() {
  var url = telegramUrl + "/deleteWebhook";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendMessage(msg) {
  var chatId = "chat_id=" + groupName;
  msg = encodeURIComponent(msg);

  var messageBody = "text=" + msg + "";
  Logger.log(messageBody);
  var url = telegramUrl + "/sendMessage?" + chatId + "&" + messageBody;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function responseToString(response) {
  var result = "";

  var itemResponses = response.getItemResponses();
  for (var j = 0; j < itemResponses.length; j++) {
    var itemResponse = itemResponses[j];
    Logger.log('Response to the question "%s" was "%s"',
        itemResponse.getItem().getTitle(),
        itemResponse.getResponse());
    result = result + itemResponse.getItem().getTitle() + ": " + itemResponse.getResponse() + "\n";
  }

  Logger.log(result);
  return result;
}

function onFormSubmit(e) {
  //getMe();
  setWebhook();
  
  var message = responseToString(e.response);
  sendMessage(message);

  deleteWebhook();
}
