var _ = require('lodash')
    , assert = require('assert')
;
module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var msg = step.input('text').first()
            , zip, categories, response
        ;
        assert(msg);
        zip = msg.replace(/.*?([\d]*)$/, '$1');
        if(!zip) {
            zip = step.input('zipcode').first();
        }
        categories = msg.replace(zip, '').split(',');
        categories = _.filter(categories, function(category) {
            return category.trim() || false;
        });
        if(categories.length > 0) {
            this.complete(_.map(categories, function(category) {
                return { zipcode: zip, category: category.trim() };
            }));
        } else {
            this.complete({ zipcode: zip, category: null });
        }
    }
};
