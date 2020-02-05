
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

var activeRole = 'guest';

/**
 * All header links are loaded but not displayed.
 * This checks if the current user has access to them
 * then changes their style to be displayed
 */
function enableAccessiblePages() {
    setTimeout( () => {
        var forbiddenElements = document.getElementsByClassName(activeRole);
        for (let i = 0; i < forbiddenElements.length ; i++) {
            forbiddenElements[i].style.display = 'block';
        }
    }, 10);
}

/**
 * Checks if current user role is contained
 * within user roles
 * @param permittedRoles array or roles
 * @returns {boolean} authentication success
 */
function hasPermission(permittedRoles) {
    return (permittedRoles.includes(activeRole));
}