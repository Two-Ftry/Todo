// 数据库对象
const indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;

// 事物对象标记
const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;

const dbUtil = {
    db: null,
    open (dbName, cb) {
        const request = indexedDB.open(dbName);
        request.onerror = (event) => {
            console.log('open db error', event);
        };
        request.onsuccess = (event) => {
            this.db = event.target.result;
            cb && cb();
        }
    },
    __transaction (tableNames, flag) {
        console.log('@@@', this.db);
        if (!this.db) {
            return;
        }
        const transaction = this.db.transaction(tableNames, flag);
        transaction.onerror = (event) => {
            console.log('transaction error', event);
        };
        transaction.oncomplete = (event) => {
            console.log('transaction oncomplete', event);
        };
        return transaction;
    },
    // 创建数据库
    createObjectStore (tableName, keyPath, cb) {

        if (!this.db) {
            return;
        }
        const request = this.db.createObjectStore(tableName, { keyPath });
        request.onerror = (event) => {
            console.log('createObjectStore onerror', event);
        };
        request.onsuccess = (event) => {
            console.log('createObjectStore onsuccess', event);
            cb && cb();
        };
    },
    get (tableName, key, flag = IDBTransaction.READ_ONLY) {

        const transaction = this.__transaction(tableName, flag);
        if (!transaction) {
            return;
        }
        const store = transaction.objectStore(tableName);
        const request = store.get(key);
        request.onerror = (event) => {
            console.log('get onerror', event);
        };
        request.onsuccess = (event) => {
            console.log('get onsuccess', event);
        };
    },
    add (tableName, key, flag = IDBTransaction.READ_WRITE) {
        const transaction = this.__transaction(tableName, flag);
        if (!transaction) {
            return;
        }
        const store = transaction.objectStore(tableName);
        const request = store.add(key);
        request.onerror = (event) => {
            console.log('add onerror', event);
        };
        request.onsuccess = (event) => {
            console.log('add onsuccess', event);
        };
    }
};

dbUtil.open('users', () => {
    dbUtil.createObjectStore('users', { keyPath: 'id' }, () => {
        dbUtil.add('users', {
            id: '001',
            name: '888'
        });
        console.log('@@@@', dbUtil.get('001'));
    });
});

export default dbUtil;