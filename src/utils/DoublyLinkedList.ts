// Define a node in the doubly linked list
class ListNode<T> {
    value: T;
    next: ListNode<T> | null = null;
    prev: ListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
    }
}

// Define the doubly linked list class
class DoublyLinkedList<T> {
    head: ListNode<T> | null = null;
    tail: ListNode<T> | null = null;
    size: number = 0;

    // Add a word to the end of the linked list
    append(value: T) {
        const newNode = new ListNode(value);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
        }

        this.size++;
    }

    // Remove the last word from the linked list
    removeLast(): T | null {
        if (!this.tail) return null;

        const removedValue = this.tail.value;

        if (this.tail.prev) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        this.size--;
        return removedValue;
    }

    // Get all words in the linked list as an array
    toArray(): T[] {
        let current = this.head;
        const result: T[] = [];

        while (current) {
            result.push(current.value);
            current = current.next;
        }

        return result;
    }

    // Clear the linked list
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}

export default DoublyLinkedList;
