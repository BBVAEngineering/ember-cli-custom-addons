import Ember from 'ember';
import Helper from './_helper';

export default Ember.Component.extend({

    initialized: false,

    init: function() {
        this.set('initialized', true);
    }

});
