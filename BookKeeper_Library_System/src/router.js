
var currentURL = 'home';
/**
 * Used to switch the file currently loaded into the
 * 'content' section of index page
 * @param pageURL full path to navigation target
 * @param users users that have access to this page
 */
function navigate(pageURL, users = []) {
    if (users && users.length === 0 || hasPermission(users)) {
        $("#content").load(pageURL);
        currentURL = pageURL;
        setTimeout( ()=> {
            loginSection.enableAccessiblePages();

            if (pageURL.includes('home')) home.load();
            if (pageURL.includes('bookSearch')) viewBooks();
            if (pageURL.includes('supplierSearch')) viewSuppliers();
            if (pageURL.includes('userSearch')) viewUser();

        }, 200);
    }
}