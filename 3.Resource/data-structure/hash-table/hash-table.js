const defaultSize = 32;

class HashTable {
  #buckets;
  #size;
  constructor(initialSize = defaultSize) {
    this.#buckets = Array.from(Array(initialSize), () => []);
    this.#size = initialSize;
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (acc, cur) => acc + cur.charCodeAt(0),
      0
    );
    return hash % this.#size;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const index = this.#buckets[hashCode].findIndex((item) => key === item.key);

    if (index > -1) {
      this.#buckets[hashCode][index] = { key, value };
      return;
    }
    this.#buckets[hashCode].push({ key, value });
  }

  get(key) {
    const hashCode = this.hash(key);
    const item = this.#buckets[hashCode].find((item) => item.key === key);
    if (!item) {
      console.log(`The value of key "${key}" do not exist`);
      return;
    }
    return item.value;
  }

  delete(key) {
    const hashCode = this.hash(key);
    const index = this.#buckets[hashCode].findIndex((item) => item.key === key);

    if (index > -1) {
      this.#buckets[hashCode].splice(index, 1);
    }
  }
}

const hashTable = new HashTable();

hashTable.set('a', 1);
hashTable.set('a', 2);
hashTable.set('b', 10);
hashTable.set('ba', 11);
hashTable.set('a', 100);

console.log(hashTable.get('a'));
console.log(hashTable.get('b'));
console.log(hashTable.get('ba'));

hashTable.delete('a');

console.log(hashTable.get('a'));
console.log(hashTable.get('b'));
console.log(hashTable.get('ba'));
