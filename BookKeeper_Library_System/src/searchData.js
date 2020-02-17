/**
 * search for books
 * @param rule
 * @param table
 */
function viewBooks(rule = null, table = '#bookSearchTable') {

    setTimeout(x => {
        const url = hostUrl + 'books';
        $.ajax({
            url: url,
            type: 'GET',
            success: res => {

                if(rule) res = runRule(rule, res);

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
            if (res[0].id === undefined) {
                return;
            }

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

            if (res[0].id === undefined) {
                return;
            }

            var docs = document.getElementById('userSearchTable');
            for (var i = 0; i < res.length; i++) {
                var idt = res[i].id;
                var element = htmlToElements('<tr><td>' + res[i].id +
                    '</td><td>' + res[i].createdBy +
                    '</td><td>' + res[i].name +
                    '</td><td>' + res[i].email +
                    '</td><td>' + res[i].phoneNumber +
                    '</td><td>' + `<button onclick="openLoanForm()" class='material-icons'>bookmark_border</button>` +
                    '</td><td><button onclick="" class="material-icons">edit</button> ' +
                    '<button onclick="" class="material-icons">delete_outline</button>' +
                    '</td></tr>');
                element[0].onmouseenter = () => theHoverShit(idt);

                for (var j = 0; j < element.length; j++) {
                    docs.appendChild(element[i])
                }

            }


        },
        error: err => console.log(`Error ${err}`)
    });
}

function openLoanForm() {

    dataType='loan';
    navigate('components/loanForm.html#'+ hoveredId, ['admin', 'librarian']);

}

var hoveredId = null;

function theHoverShit(id) {
    hoveredId = id;
}

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

function viewLoan(rule = null, table = '#loanSearchTable') {

    const url = hostUrl + 'loans';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => {

            if (res.length < 1) {
                return;
            }
            if(rule) res = runRule(rule, res);

            $(table).append(
                $.map(res, function (ignore, index) {
                    return '<tr><td>' + res[index].id +
                        '</td><td>' + res[index].isbn +
                        '</td><td>' + res[index].dueDate +
                        '</td><td>' + res[index].extensions +
                        '</td></tr>';
                }).join());

        },
        error: err => console.log(`Error ${err}`)
    })
}

function editBookForm() {

    navigate('components/loanForm.html', ['admin', 'librarian']);

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

function populateDropDown() {

    const url = hostUrl + 'books';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => {

            if (res[0].id === undefined) {
                return;
            }

            $('#loanisbn').append(
                $.map(res, function (ignore, index) {
                    return '<a>' + res[index].title + '<a/>' +
                        '<a hidden="hidden">' + res[index].isbn + '<a/>'
                }).join());

        },
        error: err => console.log(`Error ${err}`)
    })
}

function runRule(rule, list) {
    sessionStorage.setItem('recentBook', 1); //TODO : move to book visit
    if (rule === 'overdue') {
        return list.filter(loan => {
            return new Date(loan.dueDate) > new Date();
        })
    }
    if (rule === 'recentBook') {
        return list.filter(book => {
            console.log(book.id.toString(), sessionStorage.getItem('recentBook'));
            return book.id.toString() === sessionStorage.getItem('recentBook');
        })
    }

    return list.filter(item => {
        return item[rule.substr(0, rule.indexOf(':'))].toString() === rule.substr( rule.indexOf(':')+1);
    });

    return rule;
}