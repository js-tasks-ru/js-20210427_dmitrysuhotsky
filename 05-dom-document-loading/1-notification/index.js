
export default class NotificationMessage {
  timerID = null;
  element
  constructor(text = "", {duration = 1000, type = "success"} = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;
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
    if (NotificationMessage.timerID) {
      clearTimeout(NotificationMessage.timerID);
      document.querySelector('.notification').remove();
    } 
    document.body.append(this.element);
    this.remove();
  }

  remove() {
    NotificationMessage.timerID = setTimeout(() => {
      this.element.remove();
      NotificationMessage.timerID = null;
    }, this.duration);
  }

  destroy() {
    this.element = null;
  }
}
