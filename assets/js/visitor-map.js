(() => {
  const root = document.querySelector('.visitor-map');
  if (!root) return;
  const disclosure = root.querySelector('.visitor-map-disclosure');
  const status = root.querySelector('.visitor-map-status');
  const retry = root.querySelector('.visitor-map-retry');
  const assets = root.dataset.assets;
  let loading = false;
  let loaded = false;
  let libraries;
  const number = new Intl.NumberFormat('en');
  const names = new Intl.DisplayNames(['en'], { type: 'region' });
  const regionName = (code) => /^[A-Z]{2}$/.test(code) ? names.of(code) : 'Unknown';

  function script(file) {
    return new Promise((resolve, reject) => {
      const element = document.createElement('script');
      element.src = assets + file;
      element.onload = resolve;
      element.onerror = () => { element.remove(); reject(new Error('Library unavailable')); };
      document.head.append(element);
    });
  }

  async function json(url) {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error('Data unavailable');
    return response.json();
  }

  async function load() {
    if (loading || loaded) return;
    loading = true;
    retry.hidden = true;
    status.textContent = 'Loading visitor map…';
    try {
      libraries ||= script('d3-array.min.js').then(() => script('d3-geo.min.js')).catch((error) => {
        libraries = null;
        throw error;
      });
      const [, world, stats] = await Promise.all([libraries, json(assets + 'countries.json'), json(root.dataset.endpoint)]);
      if (!Array.isArray(stats.countries) || !Number.isFinite(stats.total)) throw new Error('Invalid statistics');
      const rows = stats.countries.filter((row) => typeof row.country === 'string' && Number.isFinite(row.views) && row.views > 0);
      const count = rows.filter((row) => /^[A-Z]{2}$/.test(row.country)).length;
      status.textContent = stats.total
        ? `${number.format(stats.total)} page views · ${number.format(count)} countries / regions`
        : 'No visits recorded yet.';
      drawGlobe(world, rows);
      loaded = true;
    } catch (error) {
      status.textContent = 'Visitor map is temporarily unavailable.';
      retry.hidden = false;
    } finally {
      loading = false;
    }
  }

  function drawGlobe(world, rows) {
    const d3 = window.d3;
    const ns = 'http://www.w3.org/2000/svg';
    const make = (tag, attributes, parent) => {
      const node = document.createElementNS(ns, tag);
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
      if (parent) parent.append(node);
      return node;
    };
    const svg = make('svg', { viewBox: '0 0 480 430', role: 'img', 'aria-label': 'Visitor locations by country or region. Use the rotation buttons or drag to explore.' });
    const projection = d3.geoOrthographic().translate([240, 215]).scale(195).rotate([-105, -20]);
    const path = d3.geoPath(projection);
    make('path', { class: 'visitor-map-ocean', d: path({ type: 'Sphere' }) }, svg);
    const grid = make('path', { class: 'visitor-map-grid' }, svg);
    const land = make('path', { class: 'visitor-map-land' }, svg);
    const dots = make('g', {}, svg);
    const regions = new Map(world.features.map((feature) => [feature.properties.code, feature.properties.center]));
    // Tiny regions may be absent from the low-resolution boundary dataset.
    regions.set('SG', [103.82, 1.35]);
    regions.set('HK', [114.17, 22.32]);
    regions.set('MO', [113.54, 22.2]);
    const points = rows.filter((row) => regions.has(row.country)).map((row) => {
      const circle = make('circle', { class: 'visitor-map-dot', r: Math.min(11, 3 + Math.log2(row.views + 1)) }, dots);
      make('title', {}, circle).textContent = `${regionName(row.country)}: ${number.format(row.views)} page views`;
      return { circle, coordinates: regions.get(row.country) };
    });
    const graticule = d3.geoGraticule10();
    function render() {
      grid.setAttribute('d', path(graticule));
      land.setAttribute('d', path(world));
      const center = projection.invert([240, 215]);
      points.forEach(({ circle, coordinates }) => {
        const [x, y] = projection(coordinates);
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.style.display = d3.geoDistance(center, coordinates) < Math.PI / 2 ? '' : 'none';
      });
    }
    let drag;
    svg.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      drag = { x: event.clientX, y: event.clientY, rotation: projection.rotate() };
      svg.setPointerCapture(event.pointerId);
    });
    svg.addEventListener('pointermove', (event) => {
      if (!drag) return;
      const scale = 180 / svg.getBoundingClientRect().width;
      projection.rotate([
        drag.rotation[0] + (event.clientX - drag.x) * scale,
        Math.max(-75, Math.min(75, drag.rotation[1] - (event.clientY - drag.y) * scale)),
      ]);
      render();
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((name) => svg.addEventListener(name, () => { drag = null; }));
    root.querySelectorAll('[data-turn]').forEach((button) => {
      button.onclick = () => {
        const rotation = projection.rotate();
        rotation[0] += Number(button.dataset.turn);
        projection.rotate(rotation);
        render();
      };
    });
    root.querySelector('.visitor-map-globe').replaceChildren(svg);
    root.querySelector('.visitor-map-controls').hidden = false;
    render();
  }

  disclosure.addEventListener('toggle', () => { if (disclosure.open) load(); });
  retry.addEventListener('click', load);
})();
