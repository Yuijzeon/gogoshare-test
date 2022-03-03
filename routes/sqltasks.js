var db = require('better-sqlite3')('./team2.db');

module.exports = new function () {
  this.insert = function (tablename, items) {
    var query = `
      INSERT INTO ${tablename} (${Object.keys(items).join(', ')})
      VALUES (@${Object.keys(items).join(', @')})
    `;
    return db.prepare(query).run(items);
  };
  this.selectMany = function (tablename, items) {
    var query = `SELECT * FROM ${tablename}`;
    
    if (items) {
      query += `WHERE (@${Object.keys(items).join(', @')})`;
      
      return db.prepare(query).all(items);
    }
    return db.prepare(query).all();
  };
}();

/*
module.exports.insert = function (tablename, items) {
  var query = `
    INSERT INTO ${tablename} (${Object.keys(items).join(', ')})
    VALUES (@${Object.keys(items).join(', @')})
  `;
  
  return db.prepare(query).run(items);
};

module.exports.select = function (tablename, items) {
  var query = `
    SELECT * FROM ${tablename}
  `;
  
  if (items) {
    query += `
      WHERE (@${Object.keys(items).join(', @')})
    `;
    
    return db.prepare(query).get(items);
  }
  
  return db.prepare(query).get();
};

function selectMany (tablename, items) {
  var query = `SELECT * FROM ${tablename}`;
  
  if (items) {
    query += `WHERE (@${Object.keys(items).join(', @')})`;
    
    return db.prepare(query).all(items);
  }
  
  return db.prepare(query).all();
};

module.exports.selectMany = selectMany;

*/