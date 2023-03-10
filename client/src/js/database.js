import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

///// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const textPutDb = await openDB('jate',1);
  const tx = textPutDb.transaction('jate','readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ text: content });
  const result = await request;
  console.log('putDB Data Saved:', result);
}

///// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const textGetDb = await openDB('jate', 1);
  const tx = textGetDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('getDb Data:', result);
}

initdb();
