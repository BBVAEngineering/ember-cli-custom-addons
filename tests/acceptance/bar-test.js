/* global requirejs */
import { module, skip } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bar', (hooks) => {
	setupApplicationTest(hooks);

	skip('route exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/route'));
	});

	skip('index route exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/index/route'));
	});

	skip('index controller exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/index/controller'));
	});

	skip('index template exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/index/template'));
	});
});
