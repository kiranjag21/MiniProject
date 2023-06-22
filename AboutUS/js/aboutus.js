
$(document).ready(function(){
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
    
})
