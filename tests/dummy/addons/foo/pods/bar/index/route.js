import Route from '@ember/routing/route';

export default Route.extend({

	initialized: false,

	init() {
		this._super(...arguments);

		this.set('initialized', true);
	}

});
