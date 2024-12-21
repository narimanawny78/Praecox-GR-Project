

const toggler = document.querySelector('.toggler');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

const showFull = () => {
  toggler.addEventListener('click', () => {
    toggler.classList.toggle('active2');
    sidebar.classList.toggle('active2');
    mainContent.classList.toggle('active2');
  });
};

showFull();