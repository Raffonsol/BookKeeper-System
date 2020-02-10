
var dataType = null;

/**
 * Enables dropdown selections based on user permissions
 */
$(() => {
    setTimeout( () => {
        var forbiddenElements = document.getElementsByClassName(activeRole);
        for (let i = 0; i < forbiddenElements.length ; i++) {
            forbiddenElements[i].style.display = 'inline';
        }
    }, 10);
});

/**
 * loads the selected add form
 * to post entries to the database
 * @param form
 */
function showForm(form) {
    // check if selected options is just the placeholder
    if (form === 'none') {
        return;
    }
    dataType = form;
    $("#form").load('components/' + form + 'Form.html');
}