
var dataType = null;

/**
 * Enables dropdown selections based on user permissions
 */
$(() => {
    setTimeout( () => {
        var forbiddenElements = document.getElementsByClassName(user.activeRole);
        for (let i = 0; i < forbiddenElements.length ; i++) {
            forbiddenElements[i].style.display = 'inline';
        }
    }, 10);
});

/**
 * loads the selected add form
 * to take entries for posting
 * @param form
 */
function showForm(form) {
    // check if selected options is just the placeholder
    if (form === 'none') {
        return;
    }

    // reset open form
    openForm = null;

    // set dataType
    dataType = form;
    $("#form").load('components/' + form + 'Form.html');

    // reset all fields
    resetAllFields();
}

/**
 * marks all fields as untouched
 */
function resetAllFields() {
    for (let i = 0; i < validators[dataType].length; i++) {
        validators[dataType][i].touched = false;
    }
}