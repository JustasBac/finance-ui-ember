import { module, test } from 'qunit';
import { setupRenderingTest } from 'finance-ui-ember/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | currency-info', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CurrencyInfo />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <CurrencyInfo>
        template block text
      </CurrencyInfo>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
