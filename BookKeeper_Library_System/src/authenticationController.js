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
    user: null,
    loggedIn: false,

    login: () => {
        var responseMsg = 'Validation not completed';
        var attemptedUsername = document.getElementById('login_username').value;
        var attemptedPassword = document.getElementById('login_password').value;
        var success = false;

        if (attemptedUsername.length < 1 || attemptedPassword.length < 1) {
            responseMsg = 'You must enter your username and password';
            setErrorMessage('login_validation', responseMsg, !success, success ? 'green' : 'red');
            return;
        }

        $.ajax({
            url: hostUrl + 'employeeAccounts/validate/' + attemptedUsername,
            type: 'GET',
            success: res => {
                if (res.length < 1) {
                    responseMsg = 'User does not exist';
                } else {
                    if (res[0].password === attemptedPassword) {
                        responseMsg = 'Authentication Successful';
                        user.activeRole = res[0].roleName;
                        console.log('0', JSON.stringify(this.activeRole));
                        user.user = res[0].username;
                        user.loggedIn = true;
                        success = true;
                        loginSection.displayHiddenLoginSection();
                        loginSection.enableAccessiblePages();
                        document.getElementById('logged_user').innerText = 'logged as '+ user.user
                    } else {
                        responseMsg = 'Invalid password';
                    }
                }
                setErrorMessage('login_validation', responseMsg, !success, success ? 'green' : 'red');
            },
            error: err => {
                console.log(`Error ${err}`);
                responseMsg = 'Server request failed';
            }
        });


    }
};

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
            loginSection.displayHiddenLoginSection();
            loginSection.enableAccessiblePages();
        }, 100);
    },

    /**
     * displays the corner login div as logged in user,
     * or as no one logged in.
     */
    displayHiddenLoginSection: () => {
        var loggedUser = sessionStorage.getItem('loggedUser');
        if ((!user.loggedIn && loggedUser) || user.loggedIn) {
            // already logged in, show interface
            document.getElementById('screen_welcome').style.display = 'flex';
            document.getElementById('screen_login').style.display = 'none';
        } else {
            // not logged in, show login/register menu
            document.getElementById('screen_login').style.display = 'flex';
            document.getElementById('screen_welcome').style.display = 'none';
        }
    },

    /**
     * All header links are loaded but not displayed.
     * This checks if the current user has access to them
     * then changes their style to be displayed
     */
    enableAccessiblePages: () => {
        // delay enabling of sections to make sure the page is fully loaded
            var visibleElements = document.getElementsByClassName(user.activeRole);
            for (let i = 0; i < visibleElements.length; i++) {
                visibleElements[i].style.display = 'flex';
            }
    },
};