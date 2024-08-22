interface ILinkedList<T> {
    insertInBegin(data: T): LLNode<T>;
    insertAtEnd(data: T): LLNode<T>;
    deleteNode(node: LLNode<T>): void;
    traverse(): T[];
    size(): number;
    search(comparator: (data: T) => boolean): LLNode<T> | null;
}

class LLNode<T> {
    public next: LLNode<T> | null = null;
    public prev: LLNode<T> | null = null;
    constructor(public data: T) {}
}

class LinkedList<T> implements ILinkedList<T> {
    // traverse(): T[] {
    //     throw new Error('Method not implemented.');
    // }
    // size(): number {
    //     throw new Error('Method not implemented.');
    // }
    // search(comparator: (data: T) => boolean): LLNode<T> | null {
    //     throw new Error('Method not implemented.');
    // }
    private head: LLNode<T> | null = null;

    public insertInBegin(data: T): LLNode<T> {
        const node = new LLNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        return node;
    }

    public insertAtEnd(data: T): LLNode<T> {
        const node = new LLNode(data);
        if (!this.head) {
            this.head = node;
        } else {
            const getLast = (node: LLNode<T>): LLNode<T> => {
                return node.next ? getLast(node.next) : node;
            };

            const lastNode = getLast(this.head);
            node.prev = lastNode;
            lastNode.next = node;
        }
        return node;
    }

    public deleteNode(node: LLNode<T>): void {
        if (!node.prev) {
            this.head = node.next;
        } else {
            const prevNode = node.prev;
            prevNode.next = node.next;
        }
    }

    public traverse(): T[] {
        const array: T[] = [];
        if (!this.head) {
            return array;
        }

        const addToArray = (node: LLNode<T>): T[] => {
            array.push(node.data);
            return node.next ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
    }

    public size(): number {
        return this.traverse().length;
    }

    public search(comparator: (data: T) => boolean): LLNode<T> | null {
        const checkNext = (node: LLNode<T>): LLNode<T> | null => {
            if (comparator(node.data)) {
                return node;
            }
            return node.next ? checkNext(node.next) : null;
        };

        return this.head ? checkNext(this.head) : null;
    }
}

interface Post {
    title: string;
}
const linkedList = new LinkedList<Post>();

linkedList.traverse(); // [];

linkedList.insertAtEnd({ title: 'Post A' });
linkedList.insertAtEnd({ title: 'Post B' });
linkedList.insertInBegin({ title: 'Post C' });
linkedList.insertInBegin({ title: 'Post D' });

linkedList.traverse(); // [{ title : "Post D" }, { title : "Post C" }, { title : "Post A" }, { title : "Post B" }];
linkedList.search(({ title }) => title === 'Post A'); // Node { data: { title: "Post A" }, prev: Node, next: Node};
