import Ember from 'ember';

export default Ember.LinkView.reopen({
    
    init: function() {
        console.log('Foo reopen');
    }
    
});
