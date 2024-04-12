class MaxHeap {
  #heap;
  constructor(heap = []) {
    this.#heap = [];
    heap.forEach((x) => this.add(x));
  }

  size() {
    return this.#heap.length;
  }

  add(num) {
    this.#heap.push(num);
    this.#bubbleUp();
  }

  top() {
    return this.#heap[0];
  }

  pop() {
    if (this.isEmpty()) return undefined;
    const top = this.#heap[0];
    this.#heap[0] = this.#heap[this.#heap.length - 1];
    this.#heap.pop();
    this.#bubbleDown();
    return top;
  }

  isEmpty() {
    return this.#heap.length === 0;
  }

  toString() {
    return this.#heap.join(',');
  }

  #bubbleUp() {
    let nodeIndex = this.#heap.length - 1;
    while (nodeIndex > 0) {
      const parentIndex = this.getParentIndex(nodeIndex);
      if (this.#heap[parentIndex] >= this.#heap[nodeIndex]) break;
      this.swap(parentIndex, nodeIndex);
      nodeIndex = parentIndex;
    }
  }

  #bubbleDown() {
    let i = 0;

    while (
      (this.hasLeftChild(i) &&
        this.#heap[i] < this.#heap[this.getLeftChildIndex(i)]) ||
      (this.hasRightChild(i) &&
        this.#heap[i] < this.#heap[this.getRightChildIndex(i)])
    ) {
      const leftChildIndex = this.getLeftChildIndex(i);
      const rightChildIndex = this.getRightChildIndex(i);
      const left = this.#heap[leftChildIndex];
      const right = this.#heap[rightChildIndex];

      if (this.hasLeftChild(i) && this.hasRightChild(i)) {
        if (left >= right) {
          this.swap(leftChildIndex, i);
          i = leftChildIndex;
        } else {
          this.swap(rightChildIndex, i);
          i = rightChildIndex;
        }
      } else if (this.hasLeftChild(i)) {
        this.swap(leftChildIndex, i);
        i = leftChildIndex;
      }
    }
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  hasLeftChild(i) {
    return this.getLeftChildIndex(i) < this.size();
  }

  hasRightChild(i) {
    return this.getRightChildIndex(i) < this.size();
  }

  swap(index1, index2) {
    let temp = this.#heap[index1];
    this.#heap[index1] = this.#heap[index2];
    this.#heap[index2] = temp;
  }
}
