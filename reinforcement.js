(function () {
  const analysis = document.getElementById('reinforcement-analysis');
  const buttons = [...document.querySelectorAll('.states button')];
  const layers = [...document.querySelectorAll('.map-layer')];
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  let currentTheme = 'dark';
  let currentState = 'diff';

  const data = {
    baseline: {
      population: 'Före',
      label: 'referensnät utan ny länk',
      context: 'Nåbarhetsytan inom 30 minuter i det befintliga kollektivtrafik- och gångnätet.',
      eyebrow: 'REFERENSLÄGE / 30 MIN',
      mapLabel: 'Förstärkningsanalys Gävle – före ny förbindelse'
    },
    after: {
      population: 'Efter',
      label: 'nät med ny förbindelse',
      context: 'Nåbarhetsytan med kollektivtrafik och gång inom 30 minuter efter att länken mellan A och B lagts till.',
      eyebrow: 'FÖRSTÄRKT NÄT / 30 MIN',
      mapLabel: 'Förstärkningsanalys Gävle – efter ny förbindelse'
    },
    diff: {
      population: '+2 389',
      label: 'fler invånare nås',
      context: 'inom 30 minuter med kollektivtrafik och gång genom den nya förbindelsen mellan Gävle och delområde Lund.',
      eyebrow: 'TILLKOMMEN NÅBARHET / 30 MIN',
      mapLabel: 'Förstärkningsanalys Gävle – tillkommen tillgänglighet'
    }
  };

  function applyData(info) {
    document.getElementById('population').textContent = info.population;
    document.getElementById('population-label').textContent = info.label;
    document.getElementById('stat-context').textContent = info.context;
    document.getElementById('stat-eyebrow').textContent = info.eyebrow;
  }

  function activateMap(info) {
    const activeKey = `${currentTheme}-${currentState}`;
    layers.forEach(layer => {
      const active = layer.dataset.mapKey === activeKey;
      layer.classList.toggle('is-active', active);
      layer.setAttribute('aria-hidden', String(!active));
      layer.alt = active ? info.mapLabel : '';
    });
  }

  function render() {
    const info = data[currentState];
    const light = currentTheme === 'light';

    document.body.classList.toggle('theme-light', light);
    analysis.dataset.theme = currentTheme;
    analysis.dataset.state = currentState;
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.state === currentState));
    });

    themeIcon.textContent = light ? '◐' : '☼';
    themeText.textContent = light ? 'Mörk karta' : 'Ljus karta';
    applyData(info);
    activateMap(info);
    requestAnimationFrame(reportHeight);
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (!data[button.dataset.state] || currentState === button.dataset.state) return;
      currentState = button.dataset.state;
      render();
    });
  });

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    render();
  });

  window.addEventListener('message', event => {
    if (event.source !== parent || event.data?.type !== 'restidsanalys-set-theme') return;
    if (event.data.theme !== 'dark' && event.data.theme !== 'light') return;
    currentTheme = event.data.theme;
    render();
  });

  function reportHeight() {
    const height = Math.ceil(document.body.getBoundingClientRect().height) + 4;
    parent.postMessage({ type: 'restidsanalys-reinforcement-height', height }, '*');
  }

  new ResizeObserver(reportHeight).observe(document.body);
  window.addEventListener('load', reportHeight);
  window.addEventListener('resize', reportHeight);

  render();
})();
