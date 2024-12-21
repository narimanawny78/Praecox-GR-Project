let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// config param
let countItem = items.length;
let itemActive = 0;
// event next click
next.onclick = function(){
    itemActive = itemActive + 1;
    if(itemActive >= countItem){
        itemActive = 0;
    }
    showSlider();
}
//event prev click
prev.onclick = function(){
    itemActive = itemActive - 1;
    if(itemActive < 0){
        itemActive = countItem - 1;
    }
    showSlider();
}
// auto run slider
// let refreshInterval = setInterval(() => {
//     next.click();
// }, 5000)
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active-E');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active-E');
    itemActiveOld.classList.remove('active-E');
    thumbnailActiveOld.classList.remove('active-E');

    // active new item
    items[itemActive].classList.add('active-E');
    thumbnails[itemActive].classList.add('active-E');

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}

// click thumbnail
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    })
})

// Get all read more links
var readMoreLinks = document.getElementsByClassName("read-more");

// Add click event listener to each read more link
for (var i = 0; i < readMoreLinks.length; i++) {
  readMoreLinks[i].addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default anchor behavior

    // Get the data-modal-id attribute from the read more link
    var modalId = this.getAttribute("data-modal-id");

    // Show the modal with the corresponding modalId
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  });
}

// Get all modal close buttons
var modalCloseButtons = document.getElementsByClassName("modal-close");

// Add click event listener to each modal close button
for (var i = 0; i < modalCloseButtons.length; i++) {
  modalCloseButtons[i].addEventListener("click", function() {
    // Hide the modal when close button is clicked
    var modal = this.closest('.modal');
    modal.style.display = "none";
  });
}

// Add click event listener to close modal when clicking outside the modal content
window.addEventListener("click", function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
});

   // Auto-sliding functionality
  //  setInterval(nextSlide, 5000);
  
  
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

const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");

toggle.addEventListener("change", () => {
    
    body.classList.toggle("dark");
    sunIcon.className = sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
    moonIcon.className = moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";

});
  