(function () {
  const STEPS = [
    { label: 'Step 1', title: 'On the Shelf', body: 'Every product pack carries a scannable BrandMesh code, placed during production or retail packing.' },
    { label: 'Step 2', title: 'Consumer Scans', body: 'A quick phone scan at home or in-store instantly opens the linked campaign experience.' },
    { label: 'Step 3', title: 'Instant Offer', body: 'The consumer unlocks a cashback, coupon, or bundle offer tied to that specific product and brand.' },
    { label: 'Step 4', title: 'Tracked Automatically', body: 'The scan and redemption are logged in real time to the brand\'s campaign dashboard.' },
  ];

  let step = 0;

  const panels = document.querySelectorAll('.phone-panel');
  const dots = document.querySelectorAll('.dot');
  const stepLabelEl = document.querySelector('[data-bind="stepLabel"]');
  const stepTitleEl = document.querySelector('[data-bind="stepTitle"]');
  const stepBodyEl = document.querySelector('[data-bind="stepBody"]');

  function render() {
    panels.forEach((panel) => {
      panel.classList.toggle('is-active', Number(panel.dataset.panel) === step);
    });
    dots.forEach((dot) => {
      dot.classList.toggle('is-active', Number(dot.dataset.dot) === step);
    });
    stepLabelEl.textContent = STEPS[step].label;
    stepTitleEl.textContent = STEPS[step].title;
    stepBodyEl.textContent = STEPS[step].body;
  }

  document.getElementById('nextStep').addEventListener('click', () => {
    step = (step + 1) % STEPS.length;
    render();
  });

  document.getElementById('prevStep').addEventListener('click', () => {
    step = (step - 1 + STEPS.length) % STEPS.length;
    render();
  });

  render();

  // Contact form: simulated submit (no backend wired up yet)
  const form = document.getElementById('contactForm');
  const success = document.getElementById('contactSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.hidden = true;
    success.hidden = false;
  });
})();
