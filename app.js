const wrapper = document.querySelector('.wrapper');
const loginLink =  document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

const btnPopup = document.querySelector('.btnLogin-popup');

const iconClose = document.querySelector('.icon-close');

const signBtn = document.querySelector('sign-btn');
const loginBtn = document.querySelector('login-btn');

registerLink.addEventListener('click', ()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=>{
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=>{
    wrapper.classList.remove('active-popup');
});

signBtn.addEventListener('click',()=>{
    wrapper.classList.add('active-login');
})

loginBtn.addEventListener('click',()=>{
    wrapper.classList.remove('active-login');
})
