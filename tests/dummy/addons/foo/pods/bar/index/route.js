import Ember from 'ember';

export default Ember.Route.extend({

	initialized: false,

	init: () => {
		this.set('initialized', true);
	}
});
