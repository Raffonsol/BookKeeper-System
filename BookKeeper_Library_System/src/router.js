/**
 * Used to switch the file currently loaded into the
 * 'content' section of index page
 * @param pageURL full path to navigation target
 * @param users users that have access to this page
 */
function navigate(pageURL, users = []) {
    if (users && users.length === 0 || hasPermission(users)) {
        $("#content").load(pageURL);
        setTimeout( ()=> {
            loginSection.enableAccessiblePages();
<<<<<<< Updated upstream
            if (pageURL.includes('bookSearch'))viewBooks();
=======
>>>>>>> Stashed changes

            if (pageURL.includes('home')) home.load()
        }, 200);
    }
}