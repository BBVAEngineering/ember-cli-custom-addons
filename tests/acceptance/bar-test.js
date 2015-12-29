import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | bar');

test('route exists', function(assert) {
    assert.ok(requirejs.entries['foo/pods/bar/route']);
});

test('index route exists', function(assert) {
    assert.ok(requirejs.entries['foo/pods/bar/index/route']);
});

test('index controller exists', function(assert) {
    assert.ok(requirejs.entries['foo/pods/bar/index/controller']);
});

test('index template exists', function(assert) {
    assert.ok(requirejs.entries['foo/pods/bar/index/template']);
});
