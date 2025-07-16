export class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const prime = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }
}

// HashMap (capacity = 4)

// +------------+
// | Bucket[0]  | --> [ ['Alice', {...}], ['Eli', {...}] ]
// +------------+
// | Bucket[1]  | --> [ ['Bob', {...}] ]
// +------------+
// | Bucket[2]  | --> [ ['Charlie', {...}] ]
// +------------+
// | Bucket[3]  | --> [ ['Dana', {...}] ]
// +------------+
