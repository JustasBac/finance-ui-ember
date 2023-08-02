import { module, test } from 'qunit';
import { setupRenderingTest } from 'finance-ui-ember/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module(
  'Integration | Component | modals/add-or-edit-finance-data-entry',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await render(hbs`<Modals::AddOrEditFinanceDataEntry />`);

      assert.dom(this.element).hasText('');

      // Template block usage:
      await render(hbs`
      <Modals::AddOrEditFinanceDataEntry>
        template block text
      </Modals::AddOrEditFinanceDataEntry>
    `);

      assert.dom(this.element).hasText('template block text');
    });
  }
);