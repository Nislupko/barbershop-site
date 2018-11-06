/*Functions show and hide 'sign in' and 'sign up' blocks*/
const signInButtons = document.querySelectorAll('.sign-in-mark');
const signUpButtons = document.querySelectorAll('.sign-up-mark');
const signInForm =  document.querySelector('.signInDiv');
const signUpForm =  document.querySelector('.signUpDiv');
const currentUser={id:0,userName:'Guest'};
signInForm.style.display='none';
signUpForm.style.display='none';
document.querySelector('.cabinetDiv').style.display='none';
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

//Sends data from sign in and sign up form
$(function() {
    $('.signForm').submit(function(e) {
        let $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            success: function(response){
                $('.sectionOrder').find('.p-error').remove();
                let result = JSON.parse(response);
                //Sets user's name and id, hide log in/up blocks, show cabinet
                if (result['success']) {
                    currentUser["id"]=result["message"]["id"];
                    currentUser["name"]=result["message"]["name"];
                    document.querySelector('.cabinetDiv').style.display='block';
                    signInForm.style.display='none';
                    signUpForm.style.display='none';
                    $('.greeting').innerHTML="Welcome, "+currentUser['name'];
                    get_visits();
                } else {
                    $('.sectionOrder').find('.p-error').remove();
                    $('.sectionOrder').append('<p class="p-error text-center m-2">'+result['message']+'</p>');
                }
            }
        });
        e.preventDefault();
    });
});

/**
*Sends ajax describing new visit and status of this query (success/error)
*/
$(function() {
    $('.addVisitForm').submit(function(e) {
        let $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize()+'&id='+currentUser['id'],
            success: function(response){
                let result = JSON.parse(response);
                get_visits();
            }
        });
        e.preventDefault();
    });
});
/**
 * Sends ajax and gets associative array of dates with available times: {status:1, message: [21-01-2018:[15:00:00,16:00:00],22-01-2018:[10:00:00]]}
 * Every 'date' is pasted into <select> of day input as available option, for every selected option all its "times" are pasted into <select> for time input
 * */
$.ajax({
    type: 'GET',
    url: '../../back/get_time.php',
    success: function(result){
        const Dates=JSON.parse(result);
        const arrDates = Object.keys(Dates).map(function(key) {
            return [String(key), JSON.parse(result)[key]];
        });
        //paste dates
        arrDates.forEach(function(item) {
            $('.visitDay').append('<option>'+item[0]+'</option>')
        });
        let selectedDate;
        $(".bookedVisitsDiv")
        $(".visitDay")
            .change(function () {
                //for every time new select has been chosen
                $( ".visitDay option:selected" ).each(function() {
                    selectedDate = $( this ).text();
                });
                const timeSelect=$('.visitTime');
                //remove old hours
                timeSelect.find('option').remove();
                //past new hours
                Dates[selectedDate].forEach(function(item){
                    timeSelect.append('<option>'+item+'</option>')
                })
            })
            .change();
    }
});

/**
 * Sends ajax and gets  status of response and array 'date'-'time'-'typeOfService': {status:1, message: [["2018-11-11", "22:00:00", "cutting"]]}
 * Every set is pasted into div as <p></p> string describing next scheduled visit
 * In case of error or no visits print such message for user
 * */
const get_visits = function() {
    $.ajax({
        type: 'GET',
        url: '../../back/show_visits.php?',
        data:'user='+currentUser['id'],
        success: function(response){
            $(".bookedVisitsDiv").find('p.toVisit').remove();
            const result=JSON.parse(response);
            if (result["status"]>0) {
                if (result["message"].length>0 ) {
                    result["message"].forEach(function(item){
                        $(".bookedVisitsDiv").append("<p class='m1 toVisit'>Your service '"+ item[2]+"' is scheduled on "+item[0]+" at "+item[1] +".</p>");
                    });
                } else {
                    $(".bookedVisitsDiv").append("<p class='m1 toVisit'>There are no scheduled visits yet</p>");
                }
            } else {
                $(".bookedVisitsDiv").append("<p class='m1 toVisit'>"+result['message']+"</p>");
            }

        }
    });
};
