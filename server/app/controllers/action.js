'use strict';

var Models = require('../models');

exports.list = function(req, res) {
  Models.Action.findAll().then(function(actions){
    res.json(actions);
  });
};

exports.create = function(req, res) {
  Models.Action.build(req.body)
    .save()
    .then(function(new_action){
        res.json(new_action);
    });
};

exports.for_node = function(req, res) {
    Models.Node.findOne({
        where: {
            id: req.params.nodeId,
        }
    }).then(function(node, err) {
        Models.Batch.findById(node.BatchId).then(function(batch, err){
            Models.Action.findOne({
                attributes: ['type', 'phone_number', 'amount', 'duration', 'content'],
                where: {
                    index: req.params.actionIndex,
                    BatchId: batch.id
                }
            }).then(function(action, err){
                if(action){
                    if(action['type'] == 'CALL'){
                        action['type'] = 1;
                    } else {
                        action['type'] = 2;
                    }
                    res.json(action);
                } else {
                    res.json();
                }
            });
        });
        //if (err){
        //    res.json(err);
        //};
    });
};

exports.view = function(req, res) {
    Models.Action.findOne({
        where: {
            id: req.params.actionId
        }
    }).then(function(action, err) {
        if (err){
            res.send(err);
        }
        res.json(action);
    });
};

exports.update = function(req, res){
    Models.Action.findById(req.params.actionId).then(function(action, err) {
        action.updateAttributes(req.body);
        res.json(action);
    });
};
