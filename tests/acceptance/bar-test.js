/* global requirejs */
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | bar', (hooks) => {
	setupApplicationTest(hooks);

	test('route exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/route'));
	});

	test('index route exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/index/route'));
	});

	test('index controller exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/index/controller'));
	});

	test('index template exists', (assert) => {
		assert.ok(requirejs('foo/pods/bar/index/template'));
	});
});
