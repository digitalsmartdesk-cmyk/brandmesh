// Plain web component: renders India outline (real TopoJSON geometry) with
// pins for BrandMesh's coverage regions. Assumes d3 + topojson-client are
// already loaded globally (pinned CDN tags in the host page's <helmet>).
if (customElements.get('india-coverage-map')) {
  // already defined (helmet script re-executed) — skip re-registration
} else {
class IndiaCoverageMap extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.render();
  }

  async render() {
    const pins = [
      { name: 'Delhi NCR', lat: 28.6139, lon: 77.2090 },
      { name: 'Haryana', lat: 29.3919, lon: 76.3500 },
      { name: 'West Uttar Pradesh', lat: 28.6, lon: 79.0 },
      { name: 'Uttarakhand', lat: 30.0668, lon: 79.0193 }
    ];

    const width = this.getAttribute('width') ? +this.getAttribute('width') : 700;
    const height = this.getAttribute('height') ? +this.getAttribute('height') : 700;
    const land = this.getAttribute('land-color') || '#1e293b';
    const stroke = this.getAttribute('stroke-color') || '#334155';
    const pinColor = this.getAttribute('pin-color') || '#F97316';
    const labelColor = this.getAttribute('label-color') || '#F8FAFC';

    try {
      const topology = await (await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json')).json();
      const countries = topojson.feature(topology, topology.objects.countries);
      const india = countries.features.find(f => f.id === '356' || (f.properties && f.properties.name === 'India'));

      const projection = d3.geoMercator().fitSize([width, height * 0.94], india);
      const path = d3.geoPath(projection);

      const svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);

      svg.append('path')
        .attr('d', path(india))
        .attr('fill', land)
        .attr('stroke', stroke)
        .attr('stroke-width', 1.5);

      pins.forEach(p => {
        const [x, y] = projection([p.lon, p.lat]);
        const g = svg.append('g').attr('transform', `translate(${x},${y})`);
        g.append('circle').attr('r', 14).attr('fill', pinColor).attr('opacity', 0.18);
        g.append('circle').attr('r', 6).attr('fill', pinColor);
      });

      this.innerHTML = '';
      this.appendChild(svg.node());
    } catch (e) {
      this.innerHTML = `<div style="color:${labelColor};font-family:sans-serif;font-size:18px;">Map unavailable</div>`;
      console.error('IndiaCoverageMap failed', e);
    }
  }
}
customElements.define('india-coverage-map', IndiaCoverageMap);
}
