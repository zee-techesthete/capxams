export default class SelectBoxOption {
  /**
   *
   * @param {int} id
   * @param {string} name
   * @param {string} value
   * @param {[SelectBoxOption]} items
   */
  constructor(name, value, items = [], id = 0) {
    this.id = id
    this.name = name
    this.value = value
    this.items = items
  }
}
