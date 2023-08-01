import { module, test } from 'qunit';
import { setupTest } from 'finance-ui-ember/tests/helpers';

module('Unit | Service | authentication', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:authentication');
    assert.ok(service);
  });
});
