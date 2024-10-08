// Define a node in the linked list
class ListNode<T> {
    value: T;
    next: ListNode<T> | null = null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

// Define the linked list class
class LinkedList<T> {
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
            if (this.tail) this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
    }

    // Remove the first word from the linked list (useful if you want to remove words during gameplay)
    removeFirst() {
        if (!this.head) return null;
        const removedValue = this.head.value;
        this.head = this.head.next;
        this.size--;

        if (!this.head) {
            this.tail = null;
        }

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

export default LinkedList;
