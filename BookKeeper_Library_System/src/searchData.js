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

function writeBooks(res) {

    var books = [];

    var i;
    for (i = 0; i < res.toString().length; i++) {
        books[i] = new Array(res);

        console.log(books+"  woof woof");

        var tr = document.createElement('TR');


        for (j = 0; j < books[i].length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(books[i][j]));
            tr.appendChild(td)
        }
    }

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