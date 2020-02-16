
var hostUrl = 'http://localhost:3000/';

// validators
var validators = {
    book: {
        supplier: {required: false, regex: null, touched: false},
        title: {required: true, regex: null, touched: false},
        isbn: {required: true, regex: '^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$', touched: false},
        author: {required: true, regex: '^[a-zA-Z\\s]*$', touched: false},
        genre: {required: true, regex: '^[a-zA-Z\\s]*$', touched: false},
        edition: {required: false, regex: null, touched: false},
        publishDate: {required: false, regex: null, touched: false},
        shelf: {required: false, regex: null, touched: false},
        popularity: {required: false, regex: null, touched: false},
        units: {required: true, regex: null, touched: false},
    },
    supplier: {
        supplierName: {required: true, regex: null, touched: false},
        about: {required: false, regex: null, touched: false},
        website: {
            required: false,
            regex: '^(https?:\\/\\/)?(www\\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\\.)+[\\w]{2,}(\\/\\S*)?$',
            touched: false
        },
    },
    user: {
        name: {required: true, regex: '^[a-zA-Z\\s]*$', touched: false},
        email: {required: false, regex: '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$', touched: false},
        phone: {required: false, regex: '^\\(?([0-9]{3})\\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$', touched: false},
    },
    loan: {
        loan_isbn: {required: true, regex: '^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$', touched: false},

    }
};

function bookData() {
    var form = {};
    form.supplier = (document.getElementById('supplier').value);
    form.title = (document.getElementById('title').value);
    form.isbn = (document.getElementById('isbn').value);
    form.author = (document.getElementById('author').value);
    form.genre = (document.getElementById('genre').value);
    form.edition = (document.getElementById('edition').value);
    form.publishDate = (document.getElementById('publishDate').value);
    form.shelf = (document.getElementById('shelf').value);
    form.popularity = (document.getElementById('popularity').popularity);
    form.units = (document.getElementById('units').value);
    return form;
}

function supplierData() {
    var form = {};
    form.supplierName = (document.getElementById('supplierName').value);
    form.about = (document.getElementById('about').value);
    form.website = (document.getElementById('website').value);
    return form;
}

function userData() {
    var form = {};
    form.name = (document.getElementById('name').value);
    form.email = (document.getElementById('email').value);
    form.phone = (document.getElementById('phone').value);
    form.createdBy = user.user;
    return form;
}

/**
 * post a book
 */
function submitData() {
    var formData = window[`${dataType}Data`]();
    if (validateAllFields(formData)) {
        return;
    }

    console.log('submitted', formData);
    const url= hostUrl + dataType + 's';
    $.ajax({
        url: url,
        data: formData,
        type: 'POST',
        success: res => console.log(res),
        error: err => console.log(`Error ${err}`)
    })
}

function getData() {
    var formData = window[`${dataType}Data`]();
    if (validateAllFields(formData)) {
        return;
    }

    console.log('submitted', formData);
    const url= hostUrl + dataType + 's';
    $.ajax({
        url: url,
        type: 'GET',
        success: res => console.log(res),
        error: err => console.log(`Error ${err}`)
    })
}




/**
 * Runs on update of any field
 * Validates each filled out field
 */
function updateForm() {

    // prevents validation from running
    // when dropdown is selected
    if (!dataType) return;

    var data = window[`${dataType}Data`]();

    Object.keys(data).forEach(key => {
        validate(key, data[key]);
    });
}

/**
 * Marks a field as touched
 * so that it can be safely validated
 * @param element element just focused out of
 */
function markAsTouched(element) {
    validators[dataType][element.id].touched = true;
}

/**
 * Validates a value against a regular expression
 * and if invalid it highlights the invalid field
 * @param field the id of the field being validator
 * @param value the value being tested
 * @param submitting if true, the user is trying to submit
 */
function validate(field, value, submitting = false) {
    // get the field being evaluated
    var validatorObject = validators[dataType][field];

    // check that this field was even touched in the first place
    if (!validatorObject || !validatorObject.touched && !submitting) {
        return false;
    }

    // get the regex validators for that field
    var regex = new RegExp(validatorObject.regex);


    // check if its not set
    if (value === '') {
        // check if its required
        if (validatorObject.required) {
            // not set so failed
            setErrorMessage(field, 'Required', true, 'red');
            return true;
        }
        // not required so success
        return false;
    }
    // test regex
    if (!validatorObject.regex || regex.test(value)) {
        // success
        setErrorMessage(field, '✔', false, 'green');
        return false;
    } else {
        // failed
        setErrorMessage(field, 'Not valid', true, 'red');
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
    Object.keys(data).forEach(key => {
        if (validate(key, data[key], true)) success = false;
    });
    return !success;
}

function findLablelForControl(idVal) {
    labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor === idVal)
            return labels[i];
    }
}

/**
 * set error message on label for element matching
 * passed in id, if label does not exist, sets
 * message on the element matching given id
 * @param fieldID
 * @param message
 * @param failed
 * @param color
 */
function setErrorMessage(fieldID, message, failed, color = null) {
    var label = findLablelForControl(fieldID);
    if (!label) {console.log(fieldID); label = document.getElementById(fieldID);}
    label.innerHTML = message;
    if (color) label.style.color = color;
    document.getElementById(fieldID).setAttribute('aria-invalid', failed);
}