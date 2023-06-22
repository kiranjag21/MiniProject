firebase.auth().onAuthStateChanged(function(user) {
        console.log("In useer Authentication!!")
            if (user) {
            var userId = firebase.auth().currentUser.uid;     // User is signed in.
            console.log("UserId",userId);
                if(userId != null){
                    console.log('hi from authstate:',userId);
                    localStorage.setItem('LoggedInUser', JSON.stringify({userId:userId, email: user.email}));
                     console.log(localStorage.getItem('LoggedInUser'))
                    
                    //  Hiding the login icon and showing the Dashboard
                    $('#dashboard').show();
                    $('#myInput').show();
                    $('#login_icon').hide();
                    $('#useremail').text('Hi, ' + userInfo.email);
                    $('#logout').css({display: 'block'});
                }   
        } else {
            // No user is signed in
            console.log("In else not signed in.......");
            }
        }); 