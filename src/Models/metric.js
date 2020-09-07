export default class Metric {
  /**
   *
   * @param {int} id
   * @param {string} name
   * @param {string} value
   * @param {boolean} percentage
   * @param {boolean} currency
   */
  constructor(id, name, value, percentage = false, currency = false) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.percentage = percentage;
    this.currency = currency;
  }
}
