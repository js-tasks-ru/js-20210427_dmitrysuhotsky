let timerID = null;

export default class NotificationMessage {
  constructor(text = "", {duration = 1000, type = "success"} = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;
    this.element = null;
    this.render();
  }

  get templateAlert() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration}ms">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.text}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const createElem = document.createElement('div');
    createElem.innerHTML = this.templateAlert;
    this.element = createElem.firstElementChild;
  }

  show(wrapper) {
    if (wrapper) {
      wrapper.innerHTML = this.element;
      this.element = wrapper;
    }
    if (timerID) {
      clearTimeout(timerID);
      document.querySelector('.notification').remove();
    } 
    document.body.append(this.element);
    this.remove();
  }

  remove() {
    timerID = setTimeout(() => {
      document.querySelector('.notification').remove();
      this.element = null;
      timerID = null;
    }, this.duration);
  }

  destroy() {
    this.element = null;
  }
}
