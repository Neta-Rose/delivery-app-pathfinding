export class MinPriorityQueue<T> {
    private heap: { item: T; priority: number }[] = [];
  
    constructor(private getPriority: (item: T) => number) {}
  
    isEmpty(): boolean {
      return this.heap.length === 0;
    }
  
    enqueue(item: T): void {
      const priority = this.getPriority(item);
      this.heap.push({ item, priority });
      this.bubbleUp(this.heap.length - 1);
    }
  
    dequeue(): T | null {
      if (this.isEmpty()) return null;
      const minItem = this.heap[0].item;
      const end = this.heap.pop()!;
      if (!this.isEmpty()) {
        this.heap[0] = end;
        this.bubbleDown(0);
      }
      return minItem;
    }
  
    private bubbleUp(index: number): void {
      const element = this.heap[index];
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
        if (element.priority >= parent.priority) break;
        this.heap[index] = parent;
        this.heap[parentIndex] = element;
        index = parentIndex;
      }
    }
  
    private bubbleDown(index: number): void {
      const length = this.heap.length;
      const element = this.heap[index];
      while (true) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let leftChild: typeof element | null = null;
        let rightChild: typeof element | null = null;
        let swapIndex: number | null = null;
  
        if (leftChildIndex < length) {
          leftChild = this.heap[leftChildIndex];
          if (leftChild.priority < element.priority) {
            swapIndex = leftChildIndex;
          }
        }
  
        if (rightChildIndex < length) {
          rightChild = this.heap[rightChildIndex];
          if (
            (swapIndex === null && rightChild.priority < element.priority) ||
            (swapIndex !== null && rightChild.priority < leftChild!.priority)
          ) {
            swapIndex = rightChildIndex;
          }
        }
  
        if (swapIndex === null) break;
        this.heap[index] = this.heap[swapIndex];
        this.heap[swapIndex] = element;
        index = swapIndex;
      }
    }
  }
  