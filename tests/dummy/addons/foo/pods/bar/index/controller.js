import Ember from 'ember';

export default Ember.Controller.extend({
    
    initialized: false,
    
    init: function() {
        this.set('initialized', true);
    }
    
});
