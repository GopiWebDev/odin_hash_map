class HashSet {
  constructor(bucketSize = 16, loadFactor = 0.75) {
    this.bucketSize = bucketSize;
    this.buckets = new Array(bucketSize).fill(null).map(() => []);
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < Math.min(100, key.length); i++) {
      let char = key[i];
      let value = char.charCodeAt(0);
      hashCode = (hashCode * primeNumber + value) % this.bucketSize;
    }

    return hashCode;
  }

  checkLoadCapacity() {
    if (this.size / this.bucketSize > this.loadFactor) {
      const oldBucket = this.buckets;
      this.bucketSize *= 2;
      this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
      this.size = 0;
      oldBucket.forEach((bucket) => {
        bucket.forEach((item) => {
          this.set(item.key);
        });
      });
    }
  }

  set(key) {
    if (!key) return;

    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index is inaccessible');
    }

    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return true;
      }
    }

    bucket.push({ key });
    this.size++;
    this.checkLoadCapacity();
    return true;
  }

  get(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index is inaccessible');
    }

    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return bucket[i].key;
      }
    }
    return null;
  }

  has(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index is inaccessible');
    }

    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index is inaccessible');
    }

    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    return (this.buckets = new Array(this.bucketSize).fill(null).map(() => []));
  }

  keys() {
    const keysArray = [];

    this.buckets.forEach((bucket) => {
      bucket.forEach((item) => {
        keysArray.push(item.key);
      });
    });

    return keysArray;
  }

  getLoad() {
    return this.loadFactor;
  }
}

const test = new HashSet();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

test.set('moon', 'silver');
