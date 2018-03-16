import Controller from '@ember/controller';

export default Controller.extend({

	initialized: false,

	init() {
		this._super(...arguments);

		this.set('initialized', true);
	}

});
