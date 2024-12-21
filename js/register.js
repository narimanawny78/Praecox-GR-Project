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
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var date = document.getElementById("date").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var age = document.getElementById("age").value;
    var ssn = document.getElementById("ssn").value;
    var Gender = formlogin.gender.value;
    var message = document.getElementById("error");

   data = {
      name ,
      email ,
      Gender ,
      phone,
      date,
      password,
      age,
      ssn,
      address,
    }


    message.style.color = "red";
    message.style.textAlign = "center";
   //  message.style.backgroundColor = "red";
    message.style.padding = "10px";
    message.style.transition = "all 1s ease";
    message.style.marginBottom = "10px";
    message.style.marginTop = "10px";
    
   console.log(Gender);

    if(name=="" && email=="" && password=="" && date=="" && phone=="" && address=="" && age=="" && ssn=="" && Gender==""){
        message.innerHTML = "Please Enter Data";
        return false;
     }else if (email.indexOf("@")=="-1"){
        message.innerHTML = "Plaese Enter Valid E-mail";
        return false;
     }else if (password.length <8){
        message.innerHTML = "Plaese Enter At Least 8 Character";
        return false;
     }else if (phone.length != 11){
        message.innerHTML = "Phone number should be 11 number";
        return false;
     }else if (ssn.length != 14){
        message.innerHTML = "ssn number should be 14 number";
        return false;
     }else{
        return true;
     }

}

//API

function loginPatient() {
	 
   fetch('https://praecox.future-developers.cloud/api/registerPatient', {
   method: 'POST',
   body: JSON.stringify(data),
   headers: {
     'Content-type': 'application/json; charset=UTF-8',
   },
  }).then(async (response) => {
          // console.log(response.json());
       var body = await response.json();
       console.log(body);

       switch (response.status){
         case 200 :
            console.log('Succsesful');
            var token = body.token;
            localStorage.setItem('patientToken',token)
            // location.href="./RespoRegistration.html"
            location.href="./ResponsibleRegister.html"
         break;

         case 400 :
            alert(body.massage)
         break;

         case 422 :
            console.log(body)
       }
  })
}
