// Backend: LRU Cache Implementation
class CDLLNode {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class CDLL {
    constructor() {
        this.head = null;
    }

    insAtBeg(key, val) {
        const nn = new CDLLNode(key, val);
        if (this.head === null) {
            nn.next = nn;
            nn.prev = nn;
            this.head = nn;
        } else {
            const last = this.head.prev;
            nn.next = this.head;
            this.head.prev = nn;
            nn.prev = last;
            last.next = nn;
            this.head = nn;
        }
        return nn;
    }

    delAtEnd() {
        if (this.head === null) return -1;
        const last = this.head.prev;
        if (this.head === last) {
            this.head = null;
        } else {
            const secondLast = last.prev;
            secondLast.next = this.head;
            this.head.prev = secondLast;
        }
        return last.key;
    }

    moveAtFront(node) {
        if (node === this.head) return;
        const bef = node.prev;
        const aft = node.next;
        bef.next = aft;
        aft.prev = bef;
        const last = this.head.prev;
        node.next = this.head;
        this.head.prev = node;
        node.prev = last;
        last.next = node;
        this.head = node;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.size = 0;
        this.mp = new Map();
        this.list = new CDLL();
    }

    get(key) {
        if (!this.mp.has(key)) return -1;
        const node = this.mp.get(key);
        this.list.moveAtFront(node);
        return node.val;
    }

    put(key, value) {
        if (this.mp.has(key)) {
            const node = this.mp.get(key);
            node.val = value;
            this.list.moveAtFront(node);
        } else {
            if (this.size < this.capacity) {
                const node = this.list.insAtBeg(key, value);
                this.mp.set(key, node);
                this.size++;
            } else {
                const removedKey = this.list.delAtEnd();
                this.mp.delete(removedKey);
                const node = this.list.insAtBeg(key, value);
                this.mp.set(key, node);
            }
        }
    }
}

// Frontend Logic
let cache;

function initializeCache() {
    const cacheSize = parseInt(document.getElementById('cacheSizeInput').value);
    if (isNaN(cacheSize)) {
        alert("Please enter a valid cache size.");
        return;
    }
    cache = new LRUCache(cacheSize);
    alert(`Cache initialized with size ${cacheSize}.`);
    updateCacheDisplay();
}

function putValue() {
    if (!cache) {
        alert("Please initialize the cache first.");
        return;
    }
    const key = parseInt(document.getElementById('keyInput').value);
    const value = parseInt(document.getElementById('valueInput').value);
    if (isNaN(key) || isNaN(value)) {
        alert("Please enter valid key and value.");
        return;
    }
    cache.put(key, value);
    updateCacheDisplay();
    document.getElementById('operationResult').innerText = `Put: Key=${key}, Value=${value}`;
}

function getValue() {
    if (!cache) {
        alert("Please initialize the cache first.");
        return;
    }
    const key = parseInt(document.getElementById('keyInput').value);
    if (isNaN(key)) {
        alert("Please enter a valid key.");
        return;
    }
    const value = cache.get(key);
    if (value === -1) {
        alert(`Key ${key} not found in the cache.`);
    } else {
        document.getElementById('operationResult').innerText = `Get: Key=${key}, Value=${value}`;
    }
    updateCacheDisplay();
}

function updateCacheDisplay() {
    const cacheContents = document.getElementById('cacheContents');
    cacheContents.innerHTML = '';
    if (!cache || !cache.list.head) {
        const li = document.createElement('li');
        li.innerText = "Cache is empty.";
        cacheContents.appendChild(li);
        return;
    }
    let current = cache.list.head;
    do {
        const li = document.createElement('li');
        li.innerText = `Key: ${current.key}, Value: ${current.val}`;
        cacheContents.appendChild(li);
        current = current.next;
    } while (current !== cache.list.head);
}