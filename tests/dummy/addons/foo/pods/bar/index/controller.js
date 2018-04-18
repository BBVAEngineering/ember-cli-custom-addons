import Ember from 'ember';

export default Ember.Controller.extend({
	initialized: false,

	init: () => {
		this.set('initialized', true);
	}
});
