// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsjDa8dQL4kxXg7Yrx_fTewS9pixVK2_E",
    authDomain: "snektalk-41b50.firebaseapp.com",
    projectId: "snektalk-41b50",
    storageBucket: "snektalk-41b50.appspot.com",
    messagingSenderId: "625439812905",
    appId: "1:625439812905:web:d46308af63f024a703db38",
    measurementId: "G-NF11X4WBZG"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  var username = prompt("What's your name?");
  username = username.slice(0, 10);
  if (username == ""){location.reload(); }
  const room = prompt("room?");
  if (room == ""){location.reload(); }
  document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  if (document.getElementById("chat-txt") == '')
  {return;}else
 { e.preventDefault();
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const message = chatTxt.value;
  chatTxt.value = "";
  if (message == "")return;else{
  db.ref("messages/"+room+"/" + timestamp).set({
    usr: username,
    msg: message,
  });}}
}
const fetchChat = db.ref("messages/"+room+"/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  if (messages.usr == username){
  const msg = "<li class='box2 sb13'>" + messages.usr + " : " + messages.msg + "</li>";
  document.getElementById("messages").innerHTML += msg;
  document.getElementById( 'bottom' ).scrollIntoView();
  }else{
  const msg = "<li class='box3 sb14'>" + messages.usr + " : " + messages.msg + "</li>";
  document.getElementById("messages").innerHTML += msg;
  document.getElementById( 'bottom' ).scrollIntoView();

  }
});
window.onload = function() { 
  setTimeout(function(){
    const getChat = db.ref("messages/"+room+"/");
    getChat.endAt().limitToLast(1).on('child_added', function(snapshot) {
      const messages = snapshot.val();
      if (messages.usr == username){
      return;
      }else{
      const img = 'favicon.ico';
      const text = `${messages.usr}:${messages.msg}`;
      const notification = new Notification('Snektalk', { body: text, icon: img });
    
      }
    });
  },000); 
}
Notification.requestPermission().then(function(getperm) 
{ 

    console.log('Perm granted', getperm) 

});