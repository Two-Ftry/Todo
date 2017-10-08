
//
let version = localStorage.getItem('dbversion');
if (!version) {
  localStorage.setItem('dbversion',  '1');
} else {
  version = parseInt(version) + 1;
  localStorage.setItem('dbversion',  version + '');
}


// 1、获取indexedDB对象
const indexedDB = window.indexedDB || window.msIndexedDb || window.mozIndexedDB || window.webkitIndexedDB;
const IDBTransaction = window.IDBTransaction || window.WebkitIDBTransaction || { READ_WRITE: 'readwrite'};

// 2、建立数据库连接
let database = null;
const databaseName = 'record';
const storeName = 'record-item';
const request = indexedDB.open(databaseName, version + '.0');

request.onsuccess = (event) => {
  database = event.target.result;
  // alert(`open database ${databaseName} success`);

  database.onversionchange = () => {
    database.close();
    console.log('close database');
  }

  // 3、设置版本号
  // const request2 = database.setVersion('1.0');
  // request2.blocked = (event) => {
  //   alert(`setVersion error, errorCode: ${event.target.errorCode}`)
  // }
  // request2.onsuccess = () => {
  //   alert(`setVersion success`);
  // }

  database.transaction(storeName, 'readwrite').objectStore(storeName).add({
    id: Date.now() + '',
    name: '000000',
    age: 8888
  });
  // 删除
  database.transaction(storeName, 'readwrite').objectStore(storeName).delete('0001');
  // 修改
  database.transaction(storeName, 'readwrite').objectStore(storeName).put({
    id: '1506934056416',
    name: '1111',
    age: 27
  });
  // 获取
  const req1 = database.transaction(storeName, 'readwrite').objectStore(storeName).get('1506934056416');
  req1.onerror = () => {
    alert('did not get the object')
  };
  req1.onsuccess = (event) => {
      console.log(event.target.result.name)
  };
  // 清空
  // database.transaction(storeName, 'readwrite').objectStore(storeName).clear();

  const s = database.transaction(storeName, 'readwrite').objectStore(storeName);
  // s.createIndex('nameindex', 'name', { unique: false});
  const req = s.openCursor();
  req.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      console.log('value:', JSON.stringify(cursor.value));
      cursor.continue();
    } else {
      console.log('Done');
    }
  };
  req.onerror = () => {
    alert('openCursor error');
  }

  // 索引
  const nameIndex = s.index('nameindex');
  const indexReq = nameIndex.openCursor();
  indexReq.onsuccess = (event) => {
    const cursor = event.target.result;
    if (cursor) {
      console.log('index value:', JSON.stringify(cursor.value));
      cursor.continue();
    } else {
      alert('Done');
    }
  }
  indexReq.onerror = () => {
    alert('open index Cursor error');
  }

}
request.onupgradeneeded = (e) => {
  database = e.target.result;
  let store = null;
  if(!database.objectStoreNames.contains(storeName)){
    // this.store = this.db.createObjectStore(storeName, { keyPath: 'key'});
    store = database.createObjectStore(storeName, { keyPath: 'id'});
    store.createIndex('nameindex', 'name', { unique: false});
  } else {
    // database.deleteObjectStore(storeName);
    // store.deleteIndex('nameindex');
  }

  if (store){
    store.createIndex('nameindex', 'name', { unique: false});
    store.add({
      id: '0001',
      name: 'jianfeng_huang',
      age: 27
    });
  }
}

request.onerror = (event) => {
  alert(`open error errorCode:${event.target.errorCode}`)
};

export default {};
