(function () {
  const analysis = document.getElementById('reach-analysis');
  const buttons = [...document.querySelectorAll('.states button')];
  const layers = [...document.querySelectorAll('.map-layer')];
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  let currentTheme = 'dark';
  let currentState = 'diff';

  const data = {
    baseline: {
      population: '412 800',
      label: 'invånare nås inom 15 min',
      context: 'kärnområde och innerstad från Stockholm C till fots och med snabb kollektivtrafik.',
      eyebrow: 'BEFOLKNING / 15 MINUTER',
      schools: '65 st nåbara',
      care: '4 akutsjukhus',
      delta: 'Referenszon'
    },
    after: {
      population: '1 285 400',
      label: 'invånare nås inom 30 min',
      context: 'omfattar närförort, tunnelbanenätet och pendeltåg med anslutande gång.',
      eyebrow: 'BEFOLKNING / 30 MINUTER',
      schools: '175 st nåbara',
      care: '8 sjukhus & vård',
      delta: '+211 % jmf med 15 min'
    },
    diff: {
      population: '1 890 000',
      label: 'invånare nås totalt (45+ min)',
      context: 'omfattar hela regionens huvudsakliga arbets- och bostadsmarknad via kollektivtrafik.',
      eyebrow: 'BEFOLKNING / FULL RÄCKVIDD',
      schools: '240+ st nåbara',
      care: '12 akutsjukhus',
      delta: '+357 % vs 15 min'
    }
  };

  function render() {
    const info = data[currentState];
    const light = currentTheme === 'light';

    document.body.classList.toggle('theme-light', light);
    analysis.dataset.theme = currentTheme;
    analysis.dataset.state = currentState;
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.state === currentState));
    });
    layers.forEach(layer => {
      const active = layer.dataset.mapKey === currentTheme;
      layer.classList.toggle('is-active', active);
      layer.setAttribute('aria-hidden', String(!active));
      layer.alt = active ? `Räckviddsanalys Stockholm – ${light ? 'ljus' : 'mörk'} karta` : '';
    });

    themeIcon.textContent = light ? '◐' : '☼';
    themeText.textContent = light ? 'Mörk karta' : 'Ljus karta';
    document.getElementById('population').textContent = info.population;
    document.getElementById('population-label').textContent = info.label;
    document.getElementById('stat-context').textContent = info.context;
    document.getElementById('stat-eyebrow').textContent = info.eyebrow;
    document.getElementById('schools-val').textContent = info.schools;
    document.getElementById('care-val').textContent = info.care;
    document.getElementById('delta-block').querySelector('b').textContent = info.delta;
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
    parent.postMessage({ type: 'restidsanalys-reach-height', height }, '*');
  }

  new ResizeObserver(reportHeight).observe(document.body);
  window.addEventListener('load', reportHeight);
  window.addEventListener('resize', reportHeight);

  render();
})();
