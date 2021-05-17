export default class SortableTable {
  constructor(headerConfig = [], {data = []} = {}) {
    this.data = data;
    this.headerConfig = headerConfig;
    this.element = null;

    this.currentField = null;
    this.currentType = null;

    this.render();
  }

  get rootTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this.headTable}
          ${this.bodyTable}
        </div>
      </div>
    `;
  }

  get headTable() {
    const nameColumn = this.headerConfig.map(({ id, title, sortable }) => {
      const isShow = id === this.currentField;
      return `
        <div class="sortable-table__cell" data-id="$${id}" data-sortable="${sortable}" data-order="${isShow ? this.currentType : ''}">
          <span>${title}</span>
            ${ isShow ? `
                <span data-element="arrow" class="sortable-table__sort-arrow">
                  <span class="sort-arrow"></span>
                </span>
                ` : `` }
        </div>
      `;
    }).join('');

    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${nameColumn}
      </div>
    `;
  }

  get bodyTable() {
    const contentColumns = this.data.map(({ images = [], title = '', quantity = '', price = '', sales = '' }) => {
      return `
        <a class="sortable-table__row">
        ${ images.length ? `
          <div class="sortable-table__cell">
          <img class="sortable-table-image" alt="${title}" src="${images[0].url}">
        </div>
        ` : ''}

          <div class="sortable-table__cell">${title}</div>

          ${quantity && `<div class="sortable-table__cell">${quantity}</div>`}
          
          <div class="sortable-table__cell">${price}</div>
          <div class="sortable-table__cell">${sales}</div>
        </a>
      `;
    }).join('');

    return `
      <div data-element="body" class="sortable-table__body">
        ${contentColumns}
      </div>
    `;
  }

  get subElements() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.bodyTable;
    return { body: wrapper.firstElementChild };
  }


  sort(field, typeSort) {

    this.currentField = field;
    this.currentType = typeSort;
    document.querySelector('.sortable-table__header').remove();
    document.querySelector('.sortable-table__body').remove();
    
    const newData = Object.assign([], this.data);
    const type = this.headerConfig.filter(elem => elem.id === field);
    const sortType = type[0].sortType;

    if (typeSort === 'asc') {
      if (sortType === 'string') this.data = newData.sort((a, b) => a[field].localeCompare(b[field], 'ru-RU-u-kf-upper'));
      if (sortType === 'number') this.data = newData.sort((a, b) => a[field] - b[field]);
    } 
    if (typeSort === 'desc') {
      if (sortType === 'string') this.data = newData.sort((a, b) => b[field].localeCompare(a[field], 'ru-RU-u-kf-upper'));
      if (sortType === 'number') this.data = newData.sort((a, b) => b[field] - a[field]);
    }

    [this.headTable, this.bodyTable].forEach(elem => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = elem;
      document.querySelector('.sortable-table').append(wrapper.firstElementChild);
    });
  }


  render() {
    const element = document.createElement('div');
    element.innerHTML = this.rootTemplate;
    this.element = element.firstElementChild;
  }

  remove() {
    document.querySelector('.products-list__container').remove();
  }

  destroy() {
    this.element = null;
  }

}

