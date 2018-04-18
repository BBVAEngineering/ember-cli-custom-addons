import Ember from 'ember';

export default Ember.Component.extend({

	initialized: false,

	init: () => {
		this.set('initialized', true);
	}
});
