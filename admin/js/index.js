var flag = 0; //either post or put
var id_temp;
var total_question = 0;
let DATA_URL = "http://localhost:3000/";


$(document).ready(function () {
   
    //check if admin is logged in or not
    var status = localStorage.getItem("loggedIn"); 
  
    if(status == 'true'){       // check if user access pages after logging in

        var categories =["html","js"];

     /* fetch data on page load  */

     $.each(categories, function (key, value) { 
            
             var url = DATA_URL + value;


             /* GET data on load. */
        $.get(url,
            (data, textStatus, jqXHR) => {
                
         var tables = ""+'<h3 class="capitalise">'+ value +'</h3>'; 

                tables += '<table id="'+value+'" class="table table-hover"><thead class="thead-dark w-100"><tr><th scope="col">Id</th> <th scope="col">Question</th>   <th scope="col">Answer</th> <th scope="col">Option 1</th>  <th scope="col">Option 2</th>     <th scope="col">Option 3</th> <th scope="col">Option 4</th>   <th scope="col">Operations</th> </tr></thead> <tbody>';
 
                for(var i=0; i< data.length; i++){

                    tables += `<tr id="row${data[i].id}"> 
                    <td id="id${data[i].id}"> ${data[i].id}</td>
                    <td id="name${data[i].id}">${data[i].question}</td> 
                    <td id="name${data[i].id}">${data[i].answer}</td> 
                    <td id="name${data[i].id}">${data[i].option1}</td>  
                    <td id="name${data[i].id}">${data[i].option2}</td>  
                    <td id="name${data[i].id}">${data[i].option3}</td>  
                    <td id="name${data[i].id}">${data[i].option4}</td> 
                    <td><button id="${data[i].id}" class="btn btn-warning edit" cat=${value}>Edit</button> 
                    <button id="${data[i].id}" class=" btn btn-danger delete"  cat=${value}>Delete</button></td> 
                    <tr/>`;

                    total_question ++;
                 
                   
                }
              
                tables += '</tbody></table><br/>';

                $('#allTables').append(tables);  

              //  console.log(total_question);

                $(".card").find("#total_que").text(total_question);
            }
        );


    });
   

    /* POST data */

    $('.form').on("click","#submit",null,function(){
           
        /* fetch user values */
        console.log("in submit");
        var cat = $('#category :selected').attr('value');                        /* flag 0 represents POST function */
        var question = $('#question').val();
        var answer =  $('#answer').val();
        var option1 = $('#option1').val();
        var option2 = $('#option2').val();
        var option3 = $('#option3').val();
        var option4 = $('#option4').val();
        var imgName = $('#queImage').val();
      
        if(!cat || !question || !answer || !option1 || !option2 || !option3 || !option4 ){
            alert('please enter all values !');
        }
        else{
            var data ={
                "question": question,
                "answer": answer,
                "option1": option1,
                "option2": option2,
                "option3": option3,
                "option4": option4,
                "img": '../admin/images/'+imgName
            };
    
            submitForm(cat,data);
    
        }
       
    });

        /* submit form */
function submitForm(cat,data) {

  
    var url = DATA_URL + cat;
 
     /* post */
        if(flag == 0) {                                              /* flag 0 represents POST function */
            flag= 0;

            $.post(url, data,
            
                function(data, status){
               
               alert(`Question Added!`);
           });
    
        }
        /* update */
        else{                                                           /* flag 1 represents UPDATE function */
           
           var url_update = url+'/'+id_temp;
           console.log(url_update);
           updateQuestion(url_update , data);                           /* calls upate function  */
           flag= 0;

        }
}   

    $('#allTables').on("click",".edit",null,function(){

        var id = $(this).attr("id");
        var cat =$(this).attr("cat");

        id_temp = id;
      
        flag=1;
        
        $('.dropdown').addClass('dropdown-showhide');
        $('#question').focus();

        populateFormData(id,cat);
            
      });

      /* populate form */
    function populateFormData(id,cat){

        var url = DATA_URL+cat+'/'+id;
        console.log(url);
        
           $(".form").find("#submit").text('Save').addClass(".btn-color-chnage");

           $.get(url,function (data, textStatus, jqXHR) {

                //    console.log(data);
                 $('#category').val(cat);
                 $('#question').val(data.question);
                 $('#option1').val(data.option1);
                 $('#option2').val(data.option2);
                 $('#option3').val(data.option3);
                 $('#option4').val(data.option4);
                 $('#answer').val(data.answer); 
            }
        ); 
    }
    
  function updateQuestion(url,data) {
       
      /*   console.log(url);
      console.log('in update data');
       console.log(data);
 */
       $.ajax(
            {     
                type:'PUT',
                url: url,
                data: JSON.stringify(data),
                contentType:'application/json',
                success:function(data){
                  //  console.log('in update sucess');
                    alert("Data Updated!");
                },
                error:function(e){
                    console.log(e);
                }
                }
        );  
   }



   $('#allTables').on("click",".delete",null,function(){

        var id = $(this).attr("id");
        var cat =$(this).attr("cat");

    /*     console.log(cat);
        console.log(id);
 */
        deleteData(id,cat);
         
   });


   function deleteData(id,cat) {

    var status = confirm("Are you sure you want to delete question?");

    if(status == true) {
        
        $.ajax(
            {
               type:'DELETE',

               url: `http://localhost:3000/${cat}/${id}`,

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

    }
        
    else{
        window.location.href="index.html";
     //   alert('please login first');
       
    }

    
});