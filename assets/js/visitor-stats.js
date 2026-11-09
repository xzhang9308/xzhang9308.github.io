(() => {
  const root = document.querySelector('.visitor-stats');
  if (!root) return;
  const status = root.querySelector('.stats-status');
  const retry = root.querySelector('.stats-retry');
  const number = new Intl.NumberFormat('en');
  const names = new Intl.DisplayNames(['en'], { type: 'region' });
  let stats;
  let selected = 'week';

  function row(parent, values) {
    const tr = document.createElement('tr');
    values.forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value;
      tr.append(td);
    });
    parent.append(tr);
  }

  function renderRegions() {
    const tbody = root.querySelector('.stats-regions tbody');
    tbody.replaceChildren();
    const countries = stats.countries.filter((country) => country[selected] > 0)
      .sort((a, b) => b[selected] - a[selected] || a.country.localeCompare(b.country));
    countries.forEach((country) => row(tbody, [
      /^[A-Z]{2}$/.test(country.country) ? names.of(country.country) : 'Unknown',
      number.format(country[selected]),
    ]));
    root.querySelectorAll('[data-period]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.period === selected)));
    root.querySelector('.stats-region-summary').textContent = countries.length
      ? `${number.format(stats.periods[selected])} page views · ${countries.filter((country) => country.country !== 'Unknown').length} countries / regions`
      : 'No visits recorded in this period.';
    root.querySelector('.stats-regions').hidden = !countries.length;
  }

  async function load() {
    retry.hidden = true;
    status.textContent = 'Loading visitor statistics…';
    try {
      const response = await fetch(root.dataset.endpoint, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error('Statistics unavailable');
      stats = await response.json();
      if (!stats.periods || !Array.isArray(stats.daily) || !Array.isArray(stats.countries)) throw new Error('Invalid statistics');
      root.querySelectorAll('[data-value]').forEach((element) => { element.textContent = number.format(stats.periods[element.dataset.value]); });
      root.querySelector('.stats-yesterday').textContent = `Yesterday: ${number.format(stats.periods.yesterday)} page views`;
      const chart = root.querySelector('.stats-chart');
      const dailyTable = root.querySelector('.stats-daily-table tbody');
      chart.replaceChildren();
      dailyTable.replaceChildren();
      const maximum = Math.max(1, ...stats.daily.map((entry) => entry.views));
      stats.daily.forEach((entry) => {
        const bar = document.createElement('div');
        bar.className = 'stats-bar';
        bar.style.height = `${entry.views / maximum * 100}%`;
        bar.title = `${entry.date}: ${number.format(entry.views)} page views`;
        chart.append(bar);
      });
      [...stats.daily].reverse().forEach((entry) => row(dailyTable, [entry.date, number.format(entry.views)]));
      root.querySelector('.stats-start').textContent = stats.daily[0]?.date || '';
      root.querySelector('.stats-end').textContent = stats.daily[stats.daily.length - 1]?.date || '';
      renderRegions();
      status.textContent = `Updated ${new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Shanghai', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(stats.updated_at))} (Beijing time)`;
      root.querySelector('.stats-content').hidden = false;
    } catch (error) {
      status.textContent = 'Statistics are temporarily unavailable. Please try again.';
      retry.hidden = false;
    }
  }
  root.querySelectorAll('[data-period]').forEach((button) => button.addEventListener('click', () => {
    selected = button.dataset.period;
    if (stats) renderRegions();
  }));
  retry.addEventListener('click', load);
  load();
})();
