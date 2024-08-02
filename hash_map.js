class HashMap {
  constructor(bucketSize = 16) {
    this.bucketSize = bucketSize;
    this.buckets = new Array(bucketSize).fill(null).map(() => []);
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

  set(key, value) {
    if (!key || !value) return;

    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Index is inaccessible');
    }

    let bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket[i].value = value;
        return true;
      }
    }

    bucket.push({ key, value });
    this.size++;
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
        return bucket[i].value;
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
}

let hashMap = new HashMap();
hashMap.set('Carlos', 'I am the old value.');
hashMap.set('Carlos', 'I am the new value.');
hashMap.set('john', 'wick');
