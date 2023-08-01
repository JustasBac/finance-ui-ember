import { module, test } from 'qunit';
import { setupTest } from 'finance-ui-ember/tests/helpers';

module('Unit | Service | requests', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:requests');
    assert.ok(service);
  });
});
