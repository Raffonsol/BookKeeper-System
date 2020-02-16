/**
 * search for books
 * @param formData
 */

function searchData() {

    var formData = window[`${dataType}Data`]();
    if (validateAllFields(formData)) {
        return;
    }

    function viewBooks(formData) {

        const url = hostUrl + 'books';
        $.ajax({
            url: url,
            data: formData,
            type: 'GET',
            success: res => console.log(res),
            error: err => console.log(`Error ${err}`)
        })
    }
}