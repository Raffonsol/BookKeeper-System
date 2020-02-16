var Supplier = require('../models/supplierModel.js');

exports.list_all_suppliers = function(req, res) {
    Supplier.getAllSuppliers(function(err, supplier) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', supplier);
        res.send(supplier);
    });
};
exports.count_suppliers = function(req, res) {
    Supplier.countAllSuppliers(function(err, supplier) {

        console.log('controller');
        if (err)
            res.send(err);
        console.log('res', supplier);
        res.send(supplier);
    });
};

exports.create_a_supplier = function(req, res) {
    var new_supplier = new Supplier(req.body);
    Supplier.createSupplier(new_supplier, function(err, task) {

        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_a_supplier = function(req, res) {
    Supplier.getSupplierById(req.params.supplierId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.update_a_supplier = function(req, res) {
    Supplier.updateById(req.params.supplierId, new Supplier(req.body), function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_supplier = function(req, res) {


    Supplier.remove( req.params.supplierId, function(err, supplier) {
        if (err)
            res.send(err);
        res.json({ message: 'Supplier successfully deleted' });
    });
};