/*
// full website control
'admin',
// full control over books and users but
// only read access to suppliers
'librarian',
// full control over users and suppliers
// only read access to books
'support',
// only read access to books and suppliers
// no access to users
'guest'
*/

var user = {
    activeRole: 'guest',
    loggedIn: false,
};

/**
 * All header links are loaded but not displayed.
 * This checks if the current user has access to them
 * then changes their style to be displayed
 */
function enableAccessiblePages() {
    // delay enabling of sections to make sure the page is fully loaded
    setTimeout(() => {
        var forbiddenElements = document.getElementsByClassName(user.activeRole);
        for (let i = 0; i < forbiddenElements.length; i++) {
            forbiddenElements[i].style.display = 'flex';
        }
    }, 100);
}

/**
 * Checks if current user role is contained
 * within user roles
 * @param permittedRoles array or roles
 * @returns {boolean} authentication success
 */
function hasPermission(permittedRoles) {
    return (permittedRoles.includes(user.activeRole));
}

var loginSection = {

    load: () => {
        setTimeout(() => {
            loginSection.displayHiddenSection();
        }, 100);
    },

    displayHiddenSection: () => {
        var loggedUser = sessionStorage.getItem('loggedUser');
        if (loggedUser) {
            // already logged in, show interface
            document.getElementById('screen_welcome').style.display = 'flex';
        } else {
            // not logged in, show login/register menu
            document.getElementById('screen_login').style.display = 'flex';
        }
    },



};