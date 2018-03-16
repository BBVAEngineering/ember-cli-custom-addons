/* global requirejs */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bar');

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
