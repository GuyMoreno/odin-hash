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

  resize() {
    // Double the capacity
    this.capacity *= 2;

    // Store current data temporarily
    const oldBuckets = this.buckets;

    // Create new empty buckets
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    // Reset size (will be recalculated as we insert again)
    this.size = 0;

    // Re-insert all existing pairs into the new buckets
    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value); // This will hash them again into new buckets
      }
    }
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

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, value] = bucket[i];

      if (existingKey === key) {
        return value;
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) return true;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket.splice(i, 1); // remove the [key, value] pair
        return true;
      }
    }

    return false;
  }
  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const allKeys = [];

    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        allKeys.push(key);
      }
    }

    return allKeys;
  }

  values() {
    const allValues = [];

    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        allValues.push(value);
      }
    }
    return allValues;
  }

  entries() {
    const allEntries = [];

    for (let bucket of this.buckets) {
      for (let entry of bucket) {
        allEntries.push(entry);
      }
    }
    return allEntries;
  }
}
