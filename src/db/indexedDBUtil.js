
const indexedDBUtil = {
  database: null,
  store: null,
  // 获取对象
  __indexedDB: window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB,
  __IDBTransaction: { READ_WRITE: 'readwrite', READ_ONLY: 'readonly'},
  // 打开数据库连接
  __open: function (databaseName, successCb, upgradeCb, errorCb) {
    if (!databaseName) {
      console.warn('databaseName is empty');
      return;
    }
    const version = this.__getVersion();
    const req = this.__indexedDB.open(databaseName, version);

    req.onsuccess = (event) => {
      this.database = event.target.result;
      this.database.onversionchange = () => {
        if (this.database) {
          this.database.close();
        }
      };
      successCb && successCb(event);
    };
    req.onupgradeneeded = (event) => {
      this.database = event.target.result;
      // resolve(event);
      upgradeCb && upgradeCb(event);
    };
    req.onerror = (event) => {
      console.error('error on open indexedDB', event);
      errorCb && errorCb(event);
    };
  },
  // 获取indexedDB数据库版本号
  __getVersion: function () {
    let dbVersion = window.localStorage.getItem('dbversion');
    if (!dbVersion) {
      dbVersion = 0;
    } else {
      dbVersion = parseInt(dbVersion);
    }
    dbVersion ++;
    window.localStorage.setItem('dbversion', dbVersion);
    return dbVersion;
  },
  // 获取对象存储空间
  __getObjectStore: function (databaseName, storeName, keyPath, readwrite) {
    return new Promise((resolve, reject) => {
      this.__open(databaseName, () => {
        // success
        const store = this.database.transaction(storeName, readwrite || this.__IDBTransaction.READ_WRITE).objectStore(storeName);

        resolve(store);
      }, () => {
        // upgrade
        let store = null;
        if (!this.database.objectStoreNames.contains(storeName)) {
          store = this.database.createObjectStore(storeName, { keyPath: keyPath || 'id'});
        }

        if (store){
          resolve(store);
        }
      }, (event) => {
        //error

        reject(event);
      });
    });
  },
  __action: function (action, databaseName, storeName, data, keyPath) {
    if (!data) {
      console.warn('data is empty');
      return;
    }
    return new Promise((resolve, reject) => {
      this.__getObjectStore(databaseName, storeName, keyPath).then((store) => {
        if (store) {
          const req = data ? store[action](data) : store[action]();
          req.onsuccess = (event) => {
            // success
            resolve(event);
          };
          req.onerror = (event) => {
            console.log(`${action} data error`, event)
            reject(event);
          };
        } else {
          console.log(`${action} data store is null`);
        }
      }, (event) => {
        console.warn(`${action} data error`, event);
      });
    });
  },
  // 添加数据
  add: function (databaseName, storeName, data, keyPath) {
    return this.__action('add', databaseName, storeName, data, keyPath);
  },
  // 根据key值获取对象
  get: function (databaseName, storeName, key, keyPath) {
    return this.__action('get', databaseName, storeName, key, keyPath);
  },
  // 修改
  put: function (databaseName, storeName, data, keyPath) {
    return this.__action('put', databaseName, storeName, data, keyPath);
  },
  // 清空
  clear: function (databaseName, storeName) {
    return this.__action('clear', databaseName, storeName);
  },
  // 根据列来查询数据
  getListByText: function (databaseName, storeName, key, value) {
    return new Promise((resolve, reject) => {
      this.__getObjectStore(databaseName, storeName).then((store) => {
        if (store) {
          const req = store.openCursor();
          const list = [];
          req.onsuccess = (event) => {
            // success
            const cursor = event.target.result;
            if (cursor) {
              if (!value || (cursor.value[key] && cursor.value[key].indexOf(value) !== -1)) {
                list.push(cursor.value);
              }
              cursor.continue();
            } else {
              resolve(list);
            }
          };
          req.onerror = (event) => {
            console.log(`getListByText data error`, event)
            reject(event);
          };
        } else {
          console.log(`getListByText data store is null`);
        }
      }, (event) => {
        console.warn(`getListByText data error`, event);
      });
    });
  }
};

export default indexedDBUtil;
