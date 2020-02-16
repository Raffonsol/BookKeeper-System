/**
 * Used to switch the file currently loaded into the
 * 'content' section of index page
 * @param pageURL full path to navigation target
 * @param users users that have access to this page
 */
function navigate(pageURL, users) {
    if (users && users.length === 0 || hasPermission(users)) {
        $("#content").load(pageURL);
    }

}