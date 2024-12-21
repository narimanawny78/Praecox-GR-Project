 // JavaScript code for slider effect
 document.addEventListener("DOMContentLoaded", function () {
    const images = [
      "images/rafiki6.png",
      "images/rafiki.png",
      "images/rafiki5.png",
      "images/rafiki4.png",
      "images/rafiki3.png",
      "images/rafiki2.png",
      "images/bb/pana.png",
      "images/rafiki1.png",
    ];
    const texts = [
      {
        heading: "Your personalised Alzheimer's Memory Aid App",
        description:
          "We're here to support you in managing your daily routines, medication schedule, appointments, and memory enhancement activities.",
        },
      {
        heading: "Peace of mind for you and your loved ones.",
        description:
          "praecox keeps you stay on track with your daily plans, medications, and doctor's appointments. Never miss an important schedule again.",
       },
      {
        heading: "Boost your memory and cognitive skills with praecox.",
        description:
          "Engage in brain training exercises, memory challenges, and stimulating activities designed to enhance your mental capabilities. Let's keep your mind sharp!",
      },
      {
        heading: "Stay connected with your caregivers and doctors.",
        description:
          "praecox provides a secure communication platform to exchange messages, share important updates, and access valuable resources and support.",
      },
      {
        heading: "Stay safe and independent, with the Where Am I? map option.",
        description:
          "The Where Am I?... map option allows patients to get their current location and helps them return home safely.",
      },
      {
        heading: "We ensure your preferences and privacy are prioritised.",
        description:
          "Customise your app settings, including reminders, notifications, and accessibility features.",
      },
      {
        heading: "We're here to make your experience seamless.",
        description:
          "Keep your personal information secure, back up your data, and access useful app usage statistics.",
      },
      {
        heading: "You are all set to start your journey with praecox.",
        description:
          "Our app is designed to make your life easier and enhance your well-being. Let's make every day a memorable one!",
      },
     
    ];
  
    let currentSlide = 0;
    const imageElement = document.querySelector(".landing .image img");
    const textHeadingElement = document.querySelector(".landing .text h1");
    const textDescriptionElement = document.querySelector(".landing .text p");
    const bullets = document.querySelectorAll(".landing .bullets li");
  
    function changeSlide(index) {
      imageElement.src = images[index];
      textHeadingElement.textContent = texts[index].heading;
      textDescriptionElement.textContent = texts[index].description;
  
      bullets.forEach((bullet, bulletIndex) => {
        if (bulletIndex === index) {
          bullet.classList.add("active");
        } else {
          bullet.classList.remove("active");
        }
      });
    }
  
    function nextSlide() {
      currentSlide = (currentSlide + 1) % images.length;
      changeSlide(currentSlide);
    }
  
    function previousSlide() {
      currentSlide = (currentSlide - 1 + images.length) % images.length;
      changeSlide(currentSlide);
    }
  
    function goToSlide(index) {
      currentSlide = index;
      changeSlide(currentSlide);
    }
  
    // Click event for next slide
    document
      .querySelector(".landing .fa-angle-right")
      .addEventListener("click", nextSlide);
  
    // Click event for previous slide
    document
      .querySelector(".landing .fa-angle-left")
      .addEventListener("click", previousSlide);
  
    // Click event for bullets
    bullets.forEach((bullet, bulletIndex) => {
      bullet.addEventListener("click", function () {
        goToSlide(bulletIndex);
      });
    });
  
    // Auto-sliding functionality
    setInterval(nextSlide, 5000);
  });
  
  let span = document.querySelector(".up");

window.onscroll = function () {
  // console.log(this.scrollY);
  // if (this.scrollY >= 1000) {
  //   span.classList.add("show");
  // } else {
  //   span.classList.remove("show");
  // }
  this.scrollY >= 800 ? span.classList.add("show") : span.classList.remove("show");
};

span.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

     // Toggle dark mode

// function toggleDarkMode() {
//   var body = document.body;
//   body.classList.toggle("dark-mode");
// }

// var darkModeButton = document.getElementById("darkModeButton");
// darkModeButton.addEventListener("click", toggleDarkMode);






  

