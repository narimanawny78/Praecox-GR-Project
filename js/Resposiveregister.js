// validation

var data = {};


var formlogin = document.querySelector("#form-login");
formlogin.addEventListener('submit',(event)=>{

   var valid = validate();
   if(valid){
      loginPatient() ;
   }

   event.preventDefault()


})

function validate(){

    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var ssn = document.getElementById("ssn").value;
    var message = document.getElementById("error");

    data = {
      name ,
      phone,
      ssn,
    }

    message.style.color = "red";
    message.style.textAlign = "center";
    // message.style.backgroundColor = "red";
    message.style.padding = "10px";
    message.style.transition = "all 1s ease";
    message.style.marginBottom = "10px";
    message.style.marginTop = "10px";

    if(name=="" && phone=="" && ssn==""){
        message.innerHTML = "Please Enter Data";
        return false;
     }else if (phone.length != 11){
        message.innerHTML = "Phone number should be 11 number"
        return false;
     }else if (ssn.length != 14){
        message.innerHTML = "ssn number should be 14 number"
        return false;
     }else{
        return true;
     }

}



function loginPatient() {

  // var token = localStorage.getItem('patientToken')
   

	  fetch('https://praecox.future-developers.cloud/api/Responsible/', {
		method: 'POST',
		body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json",
      AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken"),
    },
	  }).then(async (response) => {
      var body = await response.json();
      console.log(body);
      console.log(localStorage.getItem("patientToken"))
  
      switch (response.status) {
        case 200:
          console.log("Successful");
          location.href="./upload2.html"
          break;
  
        case 400:
          alert(body.message);
          break;
  
        case 422:
          console.log(body);
      }

     });
  }