var total_user = 0;

$(document).ready(function () {

    $.get("http://localhost:3001/users",
        function (data, textStatus, jqXHR) {
            
            for(var i=0; i< data.length; i++){
               

                $('#userList').append(`<tr id="row${data[i].id}"> 
                <td id="id${data[i].id}"> ${data[i].id}</td>
                <td id="id${data[i].email}"> ${data[i].email}</td>
                <td id="name${data[i].password}">${data[i].password}</td> 
                <td id="name${data[i].phone}">${data[i].phone}</td>
                <td><button id="${data[i].id}" class="btn btn-danger delete" phone=${data[i].phone}>Delete</button></td> 
                <tr/> `);
                total_user++;
            }
            console.log(total_user);

            $(".card").find("#total_user").text(total_user);
        }
    );

    /* DELETE USER */
    $('#userList').on("click",".delete",null,function(){

        var id = $(this).attr("id");    //delete from user json
        var phone = $(this).attr("phone");  //to delete from firebase db
   
        console.log(id);
       deleteData(id);
       deletefromFirebase(phone);
    
   });

   function deleteData(id){

    var status =confirm('Are you sure you want to delete?');

        if(status == true) {
            
            $.ajax(
                {
                type:'DELETE',

                url: `http://localhost:3001/users/${id}`,

                success: function(data){
                    alert("Deleted succesfully");
                },
                error:function(){
                    console.log("error");
                }
                }
            );
         }

         
        
     }
   
     function deletefromFirebase(phone){
         console.log(phone);
         firebase.database().ref('users/' + phone).remove();
     }


});