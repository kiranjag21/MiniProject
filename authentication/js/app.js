
// signup
function signUp(){

    console.log("In signup");
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let phoneNumber = document.getElementById("phone").value;

    if(phoneNumber.length == 10){

        // Creates the new user in firebase
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            alert("Signed Up");
            //   postDataToUserJson(email,password,phoneNumber); 
            // window.location.href="../../index.html";
            window.location.href="./login.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    } 
    else{
        console.log("In phonje else");
    }  

    insert();      // invokes the insert()  
    // postDataToUserJson(email,password,phoneNumber); 
}

//post to user json
// function postDataToUserJson(email,password,phoneNumber){

//     if(!email && !password && !phoneNumber){
//         alert("Not got email");
//     }

//     else{
//         var url= "http://localhost:3001/users";
//         var data={
//              "email":email,
//              "password":password,
//              "phone":phoneNumber
//          };
     
//          console.log(data);
//           // Creating a XHR object 
//          let xhr = new XMLHttpRequest(); 
         
//          xhr.open("POST", url, true); 
//          console.log("xhr ",xhr);
//          // Set the request header i.e. which type of content you are sending 
//          xhr.setRequestHeader("Content-Type", "application/json"); 
     
//          // Create a state change callback 
//          xhr.onreadystatechange = function () { 
//              if (xhr.readyState === 4 && xhr.status === 200) { 
     
//                  // Print received data from server 
//                  console.log("success post data");
     
//              } 
//          }; 
     
//          // Sending data with the request 
//          xhr.send(JSON.stringify(data));
     
//          alert('in post');
//          window.location.href="../../index.html";
//     }
// }


// login
function loginData(event){

    event.preventDefault();
    console.log("Login");
    getemail = document.getElementById("email").value;
    getPwd = document.getElementById("password").value;

    if(getemail != "" && getPwd != ""){
        console.log("Insside firerbase")

        // Logins with user credentials
       firebase.auth().signInWithEmailAndPassword(getemail, getPwd)
                    .then((user) => {
                            console.log(user);
                            alert('you can attempt quiz now!');
                            window.location.href = "../../index.html";
                        })
                        .catch((error) => {
                            console.log("In login catch")
                            var errorCode = error.code;
                            console.log(errorCode);
                            var errorMessage = error.message;
                    });
        }
        else{
            // window.location.href="login1.html"
            alert("Please enter your credentials");
        }

}

// Forget Password functionality
function forgetPassword(){

    let auth = firebase.auth();
    let forgetEmail = document.getElementById("email").value;
    console.log(forgetEmail);

    if(forgetEmail){

        // Reset password functionality from firebase
        auth.sendPasswordResetEmail(forgetEmail).then(function() {
            
          })
          .catch(function(error) {
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                console.log("ErroreMessage:",errorMessage);
          });
          alert("Sent successfully");
    }

    else{
        alert("Please Enter Email to reset the Password!");
    }
}

// fetches the values from the textboxes
let getName,getPhone;
let getemail,getPwd;

function ready(){
    getName = document.getElementById("username").value;
    getPhone = document.getElementById("phone").value;
}

// Inserting the data into the Firebase.
function insert(){

    ready();                                                            // invokes the ready() 
    let convertoInt = parseInt(getPhone);

    if(getPhone.length == 10){

        // inserts the data into the firebase.
        firebase.database().ref('users/'+ convertoInt).set({
            NameStudent:getName,
            Phone:getPhone,
        });
    }
    else{
        console.log("Insert ELsE!")
    }
}