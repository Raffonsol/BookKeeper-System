/**
 * search for books
 * @param table
 */
function viewBooks(table = '#bookSearchTable') {

    setTimeout( x => {
        const url = hostUrl + 'books';
        $.ajax({
            url: url,
            type: 'GET',
            success: res => {

                console.log((res));
                console.log(JSON.stringify(res[0].isbn));

                $(table).append(
                    $.map(res, function (ignore, index) {
                        return '<tr><td>' + res[index].isbn +
                            '</td><td>' + res[index].title +
                            '</td><td>' + res[index].author +
                            '</td><td>' + res[index].genre +
                            '</td><td>' + res[index].publishDate +
                            '</td></tr>';
                    }).join());

            },
            error: err => console.log(`Error ${err}`)
        })
    }, 200);

}

function viewSuppliers() {

    const url = hostUrl + 'suppliers';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => {

            console.log((res));
            console.log(JSON.stringify(res[0].id));
            if(res[0].id === undefined){
                return;
            }

            // $.forEach(res.id, function (i, item) {
            //     trHTML += '<tr><td>' + res.id[i] + '</td><td>'+ '</td>'
            // })
            // writeBooks();

            $('#supplierSearchTable').append(
                $.map(res, function (ignore, index) {
                    return '<tr><td>' + res[index].id +
                        '</td><td>' + res[index].name +
                        '</td><td>' + res[index].about +
                        '</td><td>' + res[index].website +
                        '</td></tr>';
                }).join());

        },
        error: err => console.log(`Error ${err}`)
    })
}

function viewUser() {

    const url = hostUrl + 'users';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => {

            console.log((res));
            console.log(JSON.stringify(res[0].id));
            if(res[0].id === undefined){
                return;
            }

            // $.forEach(res.id, function (i, item) {
            //     trHTML += '<tr><td>' + res.id[i] + '</td><td>'+ '</td>'
            // })
            // writeBooks();

            $('#supplierSearchTable').append(
                $.map(res, function (ignore, index) {
                    return '<tr><td>' + res[index].id +
                        '</td><td>' + res[index].createdBy +
                        '</td><td>' + res[index].name +
                        '</td><td>' + res[index].email +
                        '</td><td>' + res[index].phoneNumber +
                        '</td></tr>';
                }).join());

        },
        error: err => console.log(`Error ${err}`)
    })
}

function filterData() {

    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}