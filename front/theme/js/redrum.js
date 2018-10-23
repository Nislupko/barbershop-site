const signInButtons = document.querySelectorAll('.sign-in-mark');
const signUpButtons = document.querySelectorAll('.sign-up-mark');
const signInForm =  document.querySelector('.signInForm');
const signUpForm =  document.querySelector('.signUpForm');
signInForm.style.display='none';
signUpForm.style.display='none';
showForm = function(formToShow,formToHide){
    return function(){
        document.querySelector('.signForm').style.display='none';
        formToShow.style.display="block";
        formToHide.style.display="none";
    }
}
for (let i = 0; i < signInButtons.length; i++) {
    signInButtons[i].addEventListener('click',showForm(signInForm,signUpForm));
}
for (let i = 0; i < signUpButtons.length; i++) {
    signUpButtons[i].addEventListener('click',showForm(signUpForm,signInForm));
}