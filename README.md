***LRU Cache Simulator***
Interactive LRU Cache Simulator built with HTML, CSS, and JavaScript to visualize how a Least Recently Used (LRU) Cache works.

->Features:
Initialize Cache: Set the cache size to define its capacity.
Insert Key-Value Pairs: Add new entries to the cache.
Retrieve Values: Fetch values by providing keys. If the key is not in the cache, it returns a "not found" message.
Real-Time Visualization: Displays the current state of the cache, including all stored key-value pairs.
Responsive Design: Clean and modern UI with animations and interactive elements.

->How It Works:
Initialize Cache: Enter the cache size and click "Initialize Cache."
Insert Data: Provide a key and value, then click "Put" to add it to the cache.
Retrieve Data: Enter a key and click "Get" to fetch the corresponding value.
Cache Behavior: The simulator automatically evicts the least recently used item when the cache reaches its capacity.

->Technologies Used:
Frontend: HTML, CSS (with animations and gradients), JavaScript.
Backend Logic: JavaScript-based LRU Cache implementation using a Circular Doubly Linked List (CDLL) and a Map for efficient operations.

->Why This Project?
This project is a great way to understand the LRU caching mechanism, a common algorithm used in system design for optimizing memory usage. It’s also a practical example of combining data structures (CDLL and Map) with a responsive frontend for an interactive learning experience.
