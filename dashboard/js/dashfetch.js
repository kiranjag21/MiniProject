
$(document).ready(function(){
    
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


var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost:3000/results');
ourRequest.onload = function () {
    var ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData);

    if (!ourData.length) {
        document.getElementById('historyStat').style.display = 'block';
    }
    else {
        document.getElementById('historyStat').style.display = 'none';
        renderHTML(ourData);

    }

};
ourRequest.send();
var q1,q2,q3,q4,q5;
var marks = [];
function renderHTML(data) {

    console.log(userInfo);
    var htmlPass=0, cssPass=0, jsPass=0, html=0, css=0, js=0;
    for (var i = 0; i < data.length; i++) {

        if(data[i].userid == userInfo.userId) {
            var a = document.getElementById('tbody')
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            td1.append(i + 1);
            var td2 = document.createElement('td');
            td2.append(data[i].subject);
            var td3 = document.createElement('td');
            td3.append('-');
            var td4 = document.createElement('td');
            td4.append(data[i].marksObtained);
            var td5 = document.createElement('td');
            td5.append(data[i].totalMarks);
            var td6 = document.createElement('td');
            td6.append(data[i].timeElapsed);
            var td7 = document.createElement('td');
            td7.append(data[i].dateTime);
    
            tr.append(td1);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
            tr.append(td6);
            tr.append(td7);
           
            marks.push(data[i].marksObtained);
            console.log(data[i].marksObtained);
            document.getElementById('tbody').append(tr);


            if(data[i].subject == 'HTML' || data[i].subject == 'html') {
                html++;
                if(parseInt(data[i].percentage) > 50)
                    htmlPass++;
            }
            if(data[i].subject == 'CSS' || data[i].subject == 'css') {
                css++;
                if(parseInt(data[i].percentage) > 50)
                    cssPass++;
            }
            if(data[i].subject == 'JS' || data[i].subject == 'js') {
                js++;
                if(parseInt(data[i].percentage) > 50)
                    jsPass++;
            }
        }
        
    }

    $('.htmlCount').text(html);
    $('.cssCount').text(css);
    $('.jsCount').text(js);


    $('.htmlpass').text(htmlPass);
    $('.csspass').text(cssPass);
    $('.jspass').text(jsPass);


    $('.htmlfail').text(parseInt(html) - parseInt(htmlPass));
    $('.cssfail').text(parseInt(css) - parseInt(cssPass));
    $('.jsfail').text(parseInt(js) - parseInt(jsPass));

    console.log(marks);
    q1=marks[marks.length-1];
    q2=marks[marks.length-2];
    q3=marks[marks.length-3];
    q4=marks[marks.length-4];
    q5=marks[marks.length-5];

console.log(q1);
console.log(q2);

new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ["quiz1","quiz2","quiz3","quiz4","quiz5"],
    datasets: [
      {
        label: "Quiz result",
        backgroundColor: ["#3e95cd","#3e95cd","#3e95cd","#3e95cd","#3e95cd"],
        data: [q5,q4,q3,q2,q1]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Progress Report'
    }
    /*scales: {
      xAxes: [{
          barThickness: 20,  // number (pixels) or 'flex'
          maxBarThickness: 50 // number (pixels)
      }]
  }*/
}
});

$("#signup_button").hide();
$("#login_button").hide();

$('#login_icon').click(function () {
    $("#signup_button").toggle();
   $("#login_button").toggle();
});
   // console.log(q1=data[0].marksObtained);    //alert(q1);
   // alert(q2);
}


//console.log(marks);
//var q1=marks[1];
//console.log(q1);
/*new Chart(document.getElementById("bar-chart"), {
  type: 'bar',
  data: {
    labels: ["html"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd"],
        data: [localStorage.getItem('totalCorrect')]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Progress Report'
    }
  }
});*/
})