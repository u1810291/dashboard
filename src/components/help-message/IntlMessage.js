/**
 * Auxiliary class for
 * - helper methods for KVP path builders
 * - creation 2d array for making table
 * from flat list of translation KVPs
 * KVP {
 * "...namespace.table.1.1": "value11",
 * "...namespace.table.1.2": "value12",
 * "...namespace.table.2.1": "value21",
 * "...namespace.table.2.2": "value22",
 * } transforms into
 * [["value11","value12"], ["value21", "value22"]]
 *
 * @class IntlMessage Helper class for react-intl lang_source.json interaction
 */
class IntlMessage {
  /**
   *
   * @param {string} namespace Default namespace for module
   * @param {string} id Prefix in case of multiple subcomponents
   * @param {string} intl Reference to react-intl messages {{"key":"val"}, ...}
   */
  constructor(namespace = '', id = '', messages = {}) {
    this.id = id;
    this.messages = messages;
    this.namespace = namespace;
  }

  /**
   * Get string value by key
   * @param {string} name key name
   * @param {string} id additional prefix (for module within namespace)
   */
  getNode(name, id) {
    id = this.id || id;
    const nsArray = [this.namespace, id, name];
    return nsArray.filter((item) => item !== undefined).join('.');
  }

  /**
   * Get array of all string matching pattern (withing given namespace)
   * @param {string} pattern Regexp pattern
   */
  getNodeArrayByPattern(pattern) {
    if (typeof pattern === 'string') {
      pattern = new RegExp(pattern);
    }

    return Object.keys(this.messages)
      .filter((name) => pattern.test(name))
      .map((key) => ({ [key]: this.messages[key] }));
  }

  /**
   * Create 2d array for tables
   * @param {string} name prefix for table (default = "table")
   */
  getTable(name = 'table') {
    const table = [];

    const data = this.getNodeArrayByPattern(`^${this.getNode()}.${name}`);
    if (data.length === 0) {
      return table;
    }

    const addToTable = (x, y, val) => {
      x -= 1; y -= 1;
      table[x] = table[x] || [];
      table[x][y] = val;
    };

    const getCoords = (str) => (str.match(/(\.\d+)+$/)[0] || '')
      .split('.')
      .filter((el) => el !== '')
      .slice(0, 2);

    data.forEach((element) => {
      const [key, val] = Object.entries(element).pop();
      const [x, y] = getCoords(key);
      addToTable(x, y, val);
    });

    return table;
  }
}

export default IntlMessage;
