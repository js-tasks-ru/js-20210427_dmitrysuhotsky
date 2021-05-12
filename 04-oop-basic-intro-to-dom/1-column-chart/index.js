export default class ColumnChart {
  chartHeight = 50;
  constructor({ data = [], label = '', value = '', link = '', formatHeading = value => value } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.formatHeading = formatHeading;
    this.render();
  }

  isShowLink = () => this.link && `<a class="column-chart__link" href="${this.link}">View all</a>`;
  isShowLoader = () => !this.data.length ? 'column-chart_loading' : ''

  renderTemplateDiagram = data => {
    let str = '';
    this.getColumnProps(data).forEach(({percent, value}) => str = str + `<div style="--value: ${value}" data-tooltip="${percent}"></div>`)
    return str;
  }
  
  getColumnProps = data => {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;
  
    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createTemplate = () => {
    return `
      <div class="column-chart ${this.isShowLoader()}" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.isShowLink()}
        </div>
        <div class="column-chart__container ">
          <div class="column-chart__header">${this.formatHeading(this.value)}</div>
          <div class="column-chart__chart">
            ${this.renderTemplateDiagram(this.data)}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();
    this.element = element.firstElementChild;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  update(newData) {
    this.data = newData;
    this.render();
  }
}
