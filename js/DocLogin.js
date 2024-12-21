
const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

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

	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var message = document.getElementById("error");

	data = {

		email ,
		password,

	  }
  

	message.style.color = "red";
    message.style.textAlign = "center";
    // message.style.backgroundColor = "red";
    message.style.padding = "10px";
    message.style.transition = "all 1s ease";
    message.style.marginBottom = "10px";
    message.style.marginTop = "10px";
    message.style.marginRight = "330px";

	if(name=="" && password==""){
        message.innerHTML = "Please Enter Data";
        return false;
     }else if (password.length <8){
        message.innerHTML = "Plaese Enter At Least 8 Character";
        return false;
	 }else{
		return true;
	 }
}

 function loginPatient() {
	 
	   fetch('https://praecox.future-developers.cloud/api/loginPatient', {
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
					var token = body.Token;
					localStorage.setItem('doctorToken',token)
					location.href="./DoctorProfile.html"
				break;

				case 400 :
					alert(body.massage)
				break;

				case 422 :
					console.log(body)
			 }
	  })

	//   .then(data=>{

        // var token = data.Token;
        // localStorage.setItem('patientToken',token)
        // location.href="./ResponsibleRegister.html"
	// 	console.log(data.status);

    //  });

	} 
	
  
