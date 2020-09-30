class Database {
  constructor(db) {
    this.db = db;
  }

  getId(key) {
    return new Promise((resolve, reject) => {
      this.db.incr(key, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.db.get(key, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(res));
      });
    });
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      this.db.set(key, JSON.stringify(value), (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}

module.exports = Database;
