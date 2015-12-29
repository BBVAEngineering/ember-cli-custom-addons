import Ember from 'ember';
import LinkViewReopen from 'foo/reopens/link-view';

export default Ember.Component.extend({
    
    initialized: false,
    
    init: function() {
        this.set('initialized', true);
    }
    
});
