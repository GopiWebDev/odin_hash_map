class HashMap {
  constructor(size = 16) {
    this.keyMap = new Array(size);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < Math.min(100, key.length); i++) {
      let char = key[i];
      let value = char.charCodeAt(0);
      hashCode = (hashCode * primeNumber + value) % this.keyMap.length;
    }

    return hashCode;
  }

  set(key, value) {
    let indexValue = this.hash(key);

    if (!this.keyMap[indexValue]) {
      this.keyMap[indexValue] = [];
    }
    this.keyMap[indexValue].push([key, value]);
  }

  get(key) {
    let indexValue = this.hash(key);
    if (this.keyMap[indexValue]) {
      for (let i = 0; i < this.keyMap[indexValue].length; i++) {
        if (this.keyMap[indexValue][i][0] === key) {
          return this.keyMap[indexValue][i][1];
        }
      }
    } else {
      return null;
    }
  }
}

let hashMap = new HashMap();
hashMap.set('Carlos', 'I am the old value.');
hashMap.set('Carlos', 'I am the new value.');
hashMap.set('john', 'wick');
console.log(hashMap.keyMap);
