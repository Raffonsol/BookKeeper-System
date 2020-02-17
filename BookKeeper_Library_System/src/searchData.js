var hoveredId = null;
var hoveredItem = null;

/**
 * search for books
 * @param rule
 * @param table
 */
function viewBooks(rule = null, table = 'bookSearchTable') {

    setTimeout(x => {
        const url = hostUrl + 'books';
        $.ajax({
            url: url,
            type: 'GET',
            success: res => {

                if (res.length < 1) {
                    return;
                }
                if (rule) res = runRule(rule, res);

                var docs = document.getElementById(table);
                for (var i = 0; i < res.length; i++) {
                    var result = res[i];
                    var element = htmlToElements('<tr><td>' + res[i].isbn +
                        '</td><td>' + res[i].title +
                        '</td><td>' + res[i].author +
                        '</td><td>' + res[i].genre +
                        '</td><td>' + res[i].publishDate +
                        '</td><td><button onclick="openEditForm(\'book\', [\'admin\', \'librarian\'])" class="material-icons">edit</button> ' +
                        '<button onclick="deleteItem(\'books\')" class="material-icons">delete_outline</button>' +
                        '</td></tr>');
                    element[0].onmouseenter = () => detectHoveredItem(result);

                    for (var j = 0; j < element.length; j++) {
                        if (docs) docs.appendChild(element[j])
                    }

                }


            },
            error: err => console.log(`Error ${err}`)
        })
    }, 200);

}

function viewSuppliers(rule = null, table = '#supplierSearchTable') {

    const url = hostUrl + 'suppliers';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => {

            if (res.length < 1) {
                return;
            }
            if (rule) res = runRule(rule, res);

            $(table).append(
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

function viewUser(rule = null, table = 'userSearchTable') {

    const url = hostUrl + 'users';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => {

            if (res.length < 1) {
                return;
            }
            if (rule) res = runRule(rule, res);

            var docs = document.getElementById(table);
            for (var i = 0; i < res.length; i++) {
                var result = res[i];
                var element = htmlToElements(
                    '<tr><td>' + res[i].name +
                    '</td><td>' + res[i].email +
                    '</td><td>' + res[i].phoneNumber +
                    '</td><td>' + `<button onclick="openLoanForm()" class='material-icons'>bookmark_border</button>` +
                    '</td><td><button onclick="openEditForm(\'user\', [\'admin\', \'support\'])" class="material-icons">edit</button> ' +
                    '<button onclick="deleteItem(\'users\')" class="material-icons">delete_outline</button>' +
                    '</td></tr>');
                element[0].onmouseenter = () => detectHoveredItem(result);

                for (var j = 0; j < element.length; j++) {
                    if (docs) docs.appendChild(element[j]);
                }

            }


        },
        error: err => console.log(`Error ${err}`)
    });
}

function viewLoan(rule = null, table = 'loanSearchTable') {

    const url = hostUrl + 'loans';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => {

            if (res.length < 1) {
                return;
            }
            if (rule) res = runRule(rule, res);


            var docs = document.getElementById(table);
            for (var i = 0; i < res.length; i++) {
                var result = res[i];
                var element = htmlToElements(
                    '<tr><td>' + res[i].isbn +
                    '</td><td>' + res[i].dueDate +
                    '</td><td>' + res[i].extensions +
                    '</td><td>' + `<button onclick="deleteItem('loans')" class='material-icons'>delete_outline</button>` +
                    '</td></tr>');
                element[0].onmouseenter = () => detectHoveredItem(result);

                for (var j = 0; j < element.length; j++) {
                    if (docs) docs.appendChild(element[j]);
                }

            }
        },
        error: err => console.log(`Error ${err}`)
    })
}

function openLoanForm() {

    changeType = 'create';
    dataType = 'loan';
    navigate('components/loanForm.html', ['admin', 'librarian']);

}

function openEditForm(type, permissions) {

    changeType = 'edit';
    dataType = type;
    dataId = hoveredId;
    navigate('pages/editData.html', permissions);

}

function detectHoveredItem(res) {
    console.log(res);
    hoveredId = res.id;
    hoveredItem = res;
}

function deleteItem(data) {
    $.ajax({
        url: hostUrl + data + '/' + hoveredId,
        type: 'DELETE',
        success: res => console.log(res),
        error: err => console.log(`Error ${err}`)
    });
    window.location.reload();
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
    if (list.length <1) return;
    sessionStorage.setItem('recentBook', 1); //TODO : move to book visit
    if (rule === 'overdue') {
        return list.filter(loan => {
            return new Date(loan.dueDate) > new Date();
        })
    }
    if (rule === 'recentBook') {
        return list.filter(book => {
            return book.id.toString() === sessionStorage.getItem('recentBook');
        })
    }

    return list.filter(item => {
        if (!item[rule.substr(0, rule.indexOf(':'))]) return;
        return item[rule.substr(0, rule.indexOf(':'))].toString() === rule.substr(rule.indexOf(':') + 1);
    });

    return rule;
}