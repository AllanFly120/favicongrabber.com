const channels = [];

function Controller(name) {
  if (!(this instanceof Controller)) return new Controller(name);
  this.name = name;
}

Controller.prototype.$on = function (channel, fn) {
  channels[channel] = channels[channel] || [];
  channels[channel].push(fn);
};

Controller.prototype.$emit = function (event, ...args) {
  const channel = `${this.name}:${event}`;
  if (channels[channel]) {
    channels[channel].forEach(fn => fn(...args));
  }
};

Controller.prototype.$proxy = function (fn, ...args) {
  return fn.bind(this, ...args);
};

Controller.prototype.$load = function (fn) {
  const live = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  window.addEventListener('load', this.$proxy(fn, { live }), false);
};

module.exports = Controller;
