const toggleBtn = document.querySelector('.navbar_toggle');
const menu = document.querySelector('.navbar_menu');
const login = document.querySelector('.navbar_login');

toggleBtn.addEventListener('click', function(){
    menu.classList.toggle('active');
    login.classList.toggle('active');
});