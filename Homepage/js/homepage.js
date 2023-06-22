


var userInfo;
$(document).ready(function () {

    userInfo = JSON.parse(localStorage.getItem('LoggedInUser'));
    console.log(userInfo);

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



    $('#html_play').click(function () {
            if(!userInfo) {
              window.location.href = "../authentication/login.html";
                
            }
            else {
                localStorage.setItem('subject', 'HTML');
                window.location.href = "../instructions/start.html";

            }
        

    });

    $('#css_play').click(function () {
        if(!userInfo)
        {
            window.location.href = "../authentication/login.html";
        }
        else{
        localStorage.setItem('subject', 'CSS');
        window.location.href = "../instructions/start.html";
        }

    });

    $('#js_play').click(function () {
        if(!userInfo){
            window.location.href = "../authentication/login.html"; 
        }
        else{
        localStorage.setItem('subject', 'JS');
        window.location.href = "../instructions/start.html";
        }

    });

   
    
   function myFunction() {
    $('#myUL').show();

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
    
}
$("#signup_button").hide();
$("#login_button").hide();

$('#login_icon').click(function () {
    $("#signup_button").toggle();
   $("#login_button").toggle();
});
});