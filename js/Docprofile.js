function profileDoctor() {
    fetch('https://praecox.future-developers.cloud/api/AccountDoctor/show', {
      method: "GET",
      // body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        AUTHORIZATION: "Bearer " + localStorage.getItem("patientToken"),
      },
    }).then(async (response) => {
      var body = await response.json();
      console.log(body);
  
      switch (response.status) {
        case 200:
          console.log("Succsesful");
  
      document.querySelector(".data .name").innerHTML=body.data.name;
      document.querySelector(".data .e-mail").innerHTML=body.data.email;
      document.querySelector(".data .degree").innerHTML=body.data.date;
      document.querySelector(".data .phone").innerHTML=body.data.phone;
      document.querySelector(".data .address").innerHTML=body.data.address;
  
     // console.log(body);
          break;
  
        case 400:
          alert(body.massage);
          break;
  
        case 422:
          console.log(body);
      }
    })
  }
  
  profileDoctor();