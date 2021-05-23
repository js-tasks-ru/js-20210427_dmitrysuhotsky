import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {
  element = null;
  subElements = {};
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    link = '',
    value = 0,
    url = '',
    range = { from: new Date(), to: new Date()},
    formatHeading = value => value
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;
    this.url = url;
    this.range = range;
    this.formatHeading = formatHeading;

    this.getData();
    this.render();
  }

  getColumnBody(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data
      .map(item => {
        const percent = (item / maxValue * 100).toFixed(0);

        return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
  }

  getLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label} ${this.getLink()}
        </div>
        <div class="column-chart__container">
           <div data-element="header" class="column-chart__header">
           ${this.formatHeading(this.value)}
            
           </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumnBody(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  getData = async (from, to) => {
    const dateFrom = from ? from : this.range.from;
    const dateTo = to ? to : this.range.to;
    let request;
    await fetchJson(`${BACKEND_URL}/${this.url}?from=${dateFrom.toISOString()}&to=${dateTo.toISOString()}`)
      .then(response => {
        const data = Object.values(response);
        this.value = data.reduce((acc, item) => acc + item, 0);
        this.subElements.header.innerHTML = this.formatHeading(this.value);
        if (data.length) {
          this.element.classList.remove('column-chart_loading');
        }
        request = response;
        this.setData(data);
      });
    return request;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }

    this.subElements = this.getSubElements(this.element);

  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  setData(data) {
    this.subElements.body.innerHTML = this.getColumnBody(data);
  }

  update = async (from, to) => {
    const request = await this.getData(from, to);
    return request;
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.element = null;
    this.subElements = {};
  }
}