var home = {

    load: () => {
        home.getBookCount();
        home.getUserCount();
        home.getSupplierCount();
        home.getLoanCount();
        home.showPreviewResults();
    },

    getBookCount: () => {
        $.ajax({
            url: hostUrl + 'books/count',
            type: 'GET',
            success: res => {
                document.getElementById('countBook').innerHTML = '' + res.count;
            },
            error: err => console.log(`Error ${err}`)
        })
    },

    getUserCount: () => {
        $.ajax({
            url: hostUrl + 'users/count',
            type: 'GET',
            success: res => {
                document.getElementById('countUser').innerHTML = '' + res.count;
            },
            error: err => console.log(`Error ${err}`)
        })
    },

    getSupplierCount: () => {
        $.ajax({
            url: hostUrl + 'suppliers/count',
            type: 'GET',
            success: res => {
                document.getElementById('countSupplier').innerHTML = '' + res.count;
            },
            error: err => console.log(`Error ${err}`)
        })
    },

    getLoanCount: () => {
        $.ajax({
            url: hostUrl + 'loans/count',
            type: 'GET',
            success: res => {
                document.getElementById('countLoan').innerHTML = '' + res.count;
            },
            error: err => console.log(`Error ${err}`)
        })
    },

    showPreviewResults: () => {
        setTimeout( () => {
            $("#overdueResults").load('components/previewResults.html');
            $("#historyResults").load('components/previewResults.html');
            $("#trendingResults").load('components/previewResults.html');
            viewLoan('overdue', '#overdueList');
            viewBooks('recentBook', '#historyList');
            viewBooks('popularity:3', '#trendingList');
        }, 200);

    }

};