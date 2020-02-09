/**
 * post a book
 */
function submitBook() {

    var form = getBookData();
    console.log('submitted', form);
    //TODO: query database to see if this book title already exists
    // var bookid = result
    if (!true) {
        // create book type
    }
    // create array[7] amount of units
}

function editBook() {
    var form = getBookData();

    // find the id of the book being edited

    // update
}

function getBookData() {
    var form = [];
    form.push(document.getElementById('supplier').value);
    form.push(document.getElementById('title').value);
    form.push(document.getElementById('isbn').value);
    form.push(document.getElementById('author').value);
    form.push(document.getElementById('genre').value);
    form.push(document.getElementById('edition').value);
    form.push(document.getElementById('publishDate').value);
    form.push(document.getElementById('units').value);
    return form;
}

function submitSupplier() {
    var form = getSupplierData();
    console.log('submitted', form);

    // supplier
}

function getSupplierData() {
    var form = [];
    form.push(document.getElementById('supplierName').value);
    form.push(document.getElementById('about').value);
    form.push(document.getElementById('website').value);
    return form;
}

function addEvent(node, type, callback) {
    if (node.addEventListener) {
        node.addEventListener(type, function(e) {
            callback(e, e.target);
        }, false);
    } else if (node.attachEvent) {
        node.attachEvent('on' + type, function(e) {
            callback(e, e.srcElement);
        });
    }
}

function shouldBeValidated(field) {
    return (
        (field.getAttribute("pattern") || field.getAttribute("required"))
    );
}