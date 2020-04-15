/* global requirejs */
import { module, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | component', (hooks) => {
	setupApplicationTest(hooks);

	skip('component exists', (assert) => {
		assert.ok(requirejs('foo/components/test-component/component'));
	});

	skip('template exists', (assert) => {
		assert.ok(requirejs('foo/components/test-component/template'));
	});
});
