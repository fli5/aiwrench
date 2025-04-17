function validate(e) {
    //	Hides all error elements on the page
    hideAllErrors();

    //	Determine if the form has errors
    if (formHasErrors()) {
        // 	Prevents the form from submitting
        e.preventDefault();
        return false;
    }

    return true;
}

function test(e) {
    e.style.background = "yellow";
}
/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
function resetForm(e) {
    // Confirm that the user wants to reset the form.
    if (confirm('Clear?')) {
        // Ensure all error fields are hidden
        hideAllErrors();

        // Set focus to the first text field on the page
        document.getElementById("full-name").focus();

        // When using onReset="resetForm()" in markup, returning true will allow
        // the form to reset
        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();

    // When using onReset="resetForm()" in markup, returning false would prevent
    // the form from resetting
    return false;
}


/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
    // Code below here
    let errorFlag = false;

    // Text validation
    let inputFields = document.getElementsByTagName('input');
    console.log(inputFields);
    for (let inputField of inputFields) {
        console.log(inputField.id);
        if (!formFieldHasInput(inputField)) {
            document.getElementById(`${inputField.id}_error`).style.display = "block";
            if (!errorFlag) {
                inputField.focus();
                inputField.select();
            }
            errorFlag = true;
        }
    }

    let regexPhone = new RegExp(/^\d{10}$/);
    let phoneNumber = document.getElementById("phone-number").value;
    if (!regexPhone.test(phoneNumber)) {
        document.getElementById("phone-number_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("phone-number").focus();
            document.getElementById("phone-number").select();
        } // Raise the error flag
        errorFlag = true;
    }


    let regexEmail = new RegExp(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)*[^.\W])$/gi);
    let emailAddress = document.getElementById("email-address").value;
    if (!regexEmail.test(emailAddress)) {
        document.getElementById("email-address_error").style.display = "block";
        if (!errorFlag) {
            document.getElementById("email-address").focus();
            document.getElementById("email-address").select();
        } // Raise the error flag
        errorFlag = true;
    }

    return errorFlag;
}


function hideAllErrors() {
    let errorFields = document.getElementsByClassName("field-error");
    for (let errorField of errorFields) {
        errorField.style.display = "none";
    }
}


/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(inputField) {
    // Check if the text field has a value
    if (inputField.value == null || inputField.value.trim() == "") {
        // Invalid entry
        return false;
    }

    // Valid entry

    return true;
}


/**
 * Handles the load event of the document.
 */
function load() {
    document.getElementById("contact-form").addEventListener("submit", validate);

    document.getElementById("contact-form").reset();
    hideAllErrors();

    document.getElementById("contact-form").addEventListener("reset", resetForm);


}

document.addEventListener("DOMContentLoaded", load);
