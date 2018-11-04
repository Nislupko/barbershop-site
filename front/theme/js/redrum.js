/*Functions show and hide 'sign in' and 'sign up' blocks*/
const signInButtons = document.querySelectorAll('.sign-in-mark');
const signUpButtons = document.querySelectorAll('.sign-up-mark');
const signInForm =  document.querySelector('.signInDiv');
const signUpForm =  document.querySelector('.signUpDiv');
signInForm.style.display='none';
signUpForm.style.display='none';
showForm = function(formToShow,formToHide){
    return function(){
        document.querySelector('.signDiv').style.display='none';
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

/*Validation over jQuery Validator*/

$().ready(function() {
    $('.signUpForm').validate({
        rules: {
            email: {
                required: true,
                email: true,
                maxlength:100
            },
            password: {
                required: true,
                minlength:4,
                maxlength:32
            },
            name: {
                required: true,
                minlength:2,
                maxlength:32
            },
            newPassword: {
                required:true,
                equalTo:"password"
            }
        },
        messages:{
            email: {
                required: "Please enter your email",
                email: "This email is invalid. Please try again",
                maxlength: "Email should be 100 symbols or shorter"
            },
            password:{
                required: "Please enter your password",
                minlength: "Password should be 4 symbols or longer",
                maxlength: "Password should be 32 symbols or shorter"
            },
            name: {
                required: "Please enter your name",
                minlength: "Name should be 2 symbols or longer",
                maxlength: "Name should be 32 symbols or shorter"
            },
            newPassword: {
                required: "Enter your password one more time",
                equalTo: "Passwords are not equal. Try again"
            }
        }
    });
    $('.signInForm').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
            },
        },
        messages:{
            email: {
                required: "Please enter your email",
                email: "This email is invalid. Please try again"
            },
            password:{
                required: "Please enter your password"
            }
        }
    });
});

/*$.ajax({
    type: 'post',
    url: 'http://localhost/Barbershop/back/server.php',
    data: 'email=nislupko@gmail.com&password=admin&name=Nikita',
    success: function(result){
        console.log(result);
    }
});*/
$(function() {
    $('form').submit(function(e) {
        var $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            success: function(result){
                console.log(result);
            }
        });
        e.preventDefault();
    });
});