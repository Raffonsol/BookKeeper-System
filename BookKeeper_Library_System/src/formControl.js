// validators
var validators = {
    book: [
        {field: 'supplier', required: false, regex: null, touched: false},
        {field: 'title', required: true, regex: null, touched: false},
        {field: 'isbn', required: false, regex: '^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$', touched: false},
        {field: 'author', required: true, regex: '^[a-zA-Z\\s]*$', touched: false},
        {field: 'genre', required: true, regex: '^[a-zA-Z\\s]*$', touched: false},
        {field: 'edition', required: false, regex: null, touched: false},
        {field: 'publishDate', required: false, regex: null, touched: false},
        {field: 'units', required: true, regex: null, touched: false},
    ],
    supplier: [
        {field: 'supplierName', required: true, regex: null, touched: false},
        {field: 'about', required: false, regex: null, touched: false},
        {
            field: 'website',
            required: false,
            regex: '^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\\.)+[\\w]{2,}(\\/\\S*)?, touched: false$'
        },
    ],
    user: [
        {field: 'firstName', required: true, regex: '^[A-Za-z]+$', touched: false},
        {field: 'lastName', required: true, regex: '^[A-Za-z]+$', touched: false},
        {field: 'email', required: false, regex: '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$', touched: false},
        {
            field: 'phone',
            required: false,
            regex: '^\\(?([0-9]{3})\\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$',
            touched: false
        },
    ]
};

function bookData() {
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

function supplierData() {
    var form = [];
    form.push(document.getElementById('supplierName').value);
    form.push(document.getElementById('about').value);
    form.push(document.getElementById('website').value);
    return form;
}

function userData() {
    var form = [];
    form.push(document.getElementById('firstName').value);
    form.push(document.getElementById('lastName').value);
    form.push(document.getElementById('email').value);
    form.push(document.getElementById('phone').value);
    return form;
}

/**
 * post a book
 */
function submitData() {
    console.log(dataType);
    var formData = window[`${dataType}Data`]();
    if (validateAllFields(formData)) {
        return;
    }

    console.log('submitted', formData);
    //TODO: query database to see if this book title already exists
    // var bookid = result
    if (!true) {
        // create book type
    }
    // create array[7] amount of units
}

function editBook() {
    var form = bookData();

    // find the id of the book being edited

    // update
}

/**
 * Runs on update of any field
 * Validates each filled out field
 */
function updateForm() {

    // prevents validation from running
    // when dropdown is selected
    if (!dataType) return;
    var validatingForm = dataType;

    var data = window[`${validatingForm}Data`]();
    for (let i = 0; i < data.length; i++) {
        validate(i, data[i])
    }
}

/**
 * Marks a field as touched
 * so that it can be safely validated
 * @param element element just focused out of
 */
function markAsTouched(element) {
    validators[dataType].find(x => x.field === element.id).touched = true;
}

/**
 * Validates a value against a regular expression
 * and if invalid it highlights the invalid field
 * @param fieldNumber the id of the field being validator
 * @param value the value being tested
 * @param submitting if true, the user is trying to submit
 */
function validate(fieldNumber, value, submitting = false) {
    // get the field being evaluated
    var fieldObject = validators[dataType][fieldNumber];

    // check that this field was even touched in the first place
    if (!fieldObject.touched && !submitting) {
        return false;
    }

    // get the regex validators for that field
    var regex = new RegExp(fieldObject.regex);


    // check if its not set
    if (value === '') {
        // check if its required
        if (fieldObject.required) {
            // not set so failed
            setErrorMessage(fieldObject.field, 'Required', true, 'red');
            return true;
        }
        // not required so success
        return false;
    }
    // test regex
    if (!fieldObject.regex || regex.test(value)) {
        // success
        setErrorMessage(fieldObject.field, '✔', false, 'green');
        return false;
    } else {
        // failed
        setErrorMessage(fieldObject.field, 'Not valid', true, 'red');
        return true;
    }
}

/**
 * checks all fields to make sure data is valid
 * @param data
 * @returns {boolean}
 */
function validateAllFields(data) {
    var success = true;
    for (let i = 0; i < data.length; i++) {
        if (validate(i, data[i], true)) success = false;
    }
    return !success;
}

function findLableForControl(idVal) {
    labels = document.getElementsByTagName('label');
    for( var i = 0; i < labels.length; i++ ) {
        if (labels[i].htmlFor === idVal)
            return labels[i];
    }
}

function setErrorMessage(fieldID, message, failed, color = null) {
    var label = findLableForControl(fieldID);
    label.innerHTML = message;
    if (color) label.style.color = color;
    document.getElementById(fieldID).setAttribute('aria-invalid', failed);
}