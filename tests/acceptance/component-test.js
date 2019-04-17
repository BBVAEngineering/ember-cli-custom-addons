/* global requirejs */
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | component', (hooks) => {
	setupApplicationTest(hooks);

	test('component exists', (assert) => {
		assert.ok(requirejs('foo/components/test-component/component'));
	});

	test('template exists', (assert) => {
		assert.ok(requirejs('foo/components/test-component/template'));
	});
});
