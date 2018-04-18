/* global requirejs */
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | component');

test('component exists', (assert) => {
	assert.ok(requirejs('foo/components/test-component/component'));
});

test('template exists', (assert) => {
	assert.ok(requirejs('foo/components/test-component/template'));
});
