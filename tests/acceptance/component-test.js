import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | component');

test('component exists', function(assert) {
    assert.ok(requirejs.entries['foo/components/test-component/component']);
});

test('template exists', function(assert) {
    assert.ok(requirejs.entries['foo/components/test-component/template']);
});
