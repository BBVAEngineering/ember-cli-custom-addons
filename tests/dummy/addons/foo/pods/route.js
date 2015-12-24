import Ember from 'ember';
import LinkViewReopen from '../reopens/link-view';

export default Ember.Route.extend({
    
    init: function() {
        console.log('Foo route');
    }
    
});
