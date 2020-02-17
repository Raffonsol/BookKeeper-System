'supplier strict';
var sql = require('../../server.js');

var Supplier = function (supplier) {
    this.name = supplier.supplierName;
    this.about = supplier.about;
    this.website = supplier.website;
};


Supplier.createSupplier = function (newSupplier, result) {
    var supplierID;
    console.log('newSupplier:', newSupplier);

    sql.query("INSERT INTO supplier set ?", newSupplier, function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log('supplier id:', res.insertId);
            result(null, res);
        }
    });
};
Supplier.getSupplierById = function (supplierId, result) {
    sql.query("SELECT * from supplier where id = ? ", supplierId, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};
Supplier.getAllSuppliers = function (result) {
    sql.query("Select * from supplier", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('suppliers : ', res);
            result(null, res);
        }
    });
};
Supplier.countAllSuppliers = function (result) {
    sql.query("SELECT COUNT(*) from supplier", function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('suppliers : ', res);
            result(null, {...res, count: res[0]['COUNT(*)']});
        }
    });
};
Supplier.updateById = function (id, supplier, result) {
    sql.query("UPDATE supplier SET name = ? WHERE id = ?", [supplier.name, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Supplier.remove = function (id, result) {
    sql.query("DELETE FROM supplier WHERE id = ?", [id], function (err, res) {

        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {

            result(null, res);
        }
    });
};

module.exports = Supplier;