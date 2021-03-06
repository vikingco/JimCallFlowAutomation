'use strict';

const Models = require('../models');

exports.list = function(req, res) {
  Models.Batch.findAll().then(function(batches){
    res.json(batches);
  });
};

exports.create = function(req, res) {
  Models.Batch.build(req.body)
    .save()
    .then(function(newBatch){
        res.json(newBatch);
    });
};

exports.view = function(req, res) {
    Models.Batch.findOne({
        where: {
            id: req.params.batchId,
        },
        include: [Models.Action]
    }).then(function(batch, err) {
        if (err){
            res.send(err);
        }
        res.json(batch);
    });
};

exports.update = function(req, res){
    Models.Batch.findById(req.params.batchId).then(function(batch, err) {
        batch.updateAttributes(req.body);
        res.json(batch);
    });
};

exports.destroy = function(req, res){
    Models.Batch.findById(req.params.batchId).then(function(batch, err) {
        batch.destroy();
        res.json("");
    });
};
