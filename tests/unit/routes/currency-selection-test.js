import { module, test } from 'qunit';
import { setupTest } from 'finance-ui-ember/tests/helpers';

module('Unit | Route | currency-selection', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:currency-selection');
    assert.ok(route);
  });
});
