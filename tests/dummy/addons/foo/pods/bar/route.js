import Ember from 'ember';

export default Ember.Route.extend({
    
    initialized: false,
    
    init: function() {
        this.set('initialized', true);
    }
    
});
