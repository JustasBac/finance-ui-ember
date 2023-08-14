import { module, test } from 'qunit';
import { setupRenderingTest } from 'finance-ui-ember/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | hero-section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<HeroSection />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <HeroSection>
        template block text
      </HeroSection>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
