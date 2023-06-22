$( document ).ready(function() {

    

var userInfo = JSON.parse(localStorage.getItem('LoggedInUser'));

if (userInfo) {

    $('#dashboard').show();
    $('#myInput').show();
    $('#login_icon').hide();
    console.log(userInfo.email);
    $('#useremail').text('Hi, ' + userInfo.email);
    $('#logout').css({display: 'block'});

}
if(!userInfo){
    $('#dashboard').hide();
    $('#myInput').hide();
}
$('#myUL').hide();

$("#signup_button").hide();
$("#login_button").hide();

$('#login_icon').click(function () {
$("#signup_button").toggle();
$("#login_button").toggle();
});


var botui = new BotUI('my-botui-app');

// Start Bot
// First Messages
botui.message.bot({
    content: 'Hi there! How are you guys?',
    loading: true,
    delay: 3000,
}).then(function () {
    return botui.message.bot({
        loading: true,
        delay: 1500,
        content: "I'm Bot, I am here  to help you.",
    });

}).then(function () {
    return botui.message.bot({
        loading: true,
        delay: 1500,
        content: "Do you want to get in touch with us?",
    });
}).then(function () {
  return botui.action.button({
        delay: 1500,
        loading: true,
        addMessage: true,
        action: [{
            text: 'Yes!',
            value: 'yes'
        }, {
            text: 'No.',
            value: 'no'
        }]
    })
}).then(function (res) {
  if (res.value == 'yes') {
     return botui.message.bot({
                loading: true,
                delay: 1500,
                content: "Contact us on www.quizmaster.in ",
            });
  } else {
    return botui.message.bot({
                loading: true,
                delay: 1500,
                content: "Pls visit our Frequently Asked Question Page for other Queries(FAQ's)",
            });
  }
}).then(function () {
  return botui.message.bot({
                loading: true,
                delay: 1500,
                content: "Bye,Have a great time ahead.",
            });
})
});