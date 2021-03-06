var walk = require('css-tree').walkUp;
var handlers = {
    Atrule: require('./Atrule'),
    Rule: require('./Rule'),
    Declaration: require('./Declaration'),
    TypeSelector: require('./TypeSelector'),
    Comment: require('./Comment'),
    Operator: require('./Operator'),
    WhiteSpace: require('./WhiteSpace')
};

module.exports = function(ast, options) {
    walk(ast, function(node, item, list) {
        if (handlers.hasOwnProperty(node.type)) {
            handlers[node.type].call(this, node, item, list, options);
        }
    });
};
