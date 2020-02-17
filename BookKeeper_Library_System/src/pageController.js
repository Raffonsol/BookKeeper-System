/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("myDropdown").style.display =
        document.getElementById("myDropdown").style.display === 'flex' ?
    'none' : 'flex';
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        document.getElementById("myDropdown").style.display = 'none';
        var dropdowns = document.getElementsByClassName("dropdown-content");
    }
};