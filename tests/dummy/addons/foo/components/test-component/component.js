import Component from '@ember/component';

export default Component.extend({

	initialized: false,

	init() {
		this._super(...arguments);

		this.set('initialized', true);
	}

});
