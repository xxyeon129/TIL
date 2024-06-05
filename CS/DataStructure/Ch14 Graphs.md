# ☑️ Graph Definitions

## Graph

nonlinear data structure consisting of **`nodes`** and **`links`** between nodes

- graphs can be empty

## Undirected Graphs

a finite set of `vertices`(nodes) together with a finite set of `edges/arcs`(links between nodes)

- edges have **no directions**
- both vertices and edges could have `labels`

## Directed Graphs

- a finite set of `vertices`(nodes) together with a finite set of `directed edges/arcs`(links between nodes)
- edges have **directions (source → target)**
- both vertices and edges could have `labels`

## More Graph Terminology

- **Loop**
  - an edge that connects a vertex to itself
- **Path**
  - a sequence of vertices
- **Cycle**
  - a path p1, p2, …pm where p1 = pm
  - 경로 시작 vertex, 종료 vertex가 동일한 경우
- **Multiple Edges**
  - two or more edges that connect the same two vertices (in the same direction)
- **Simple Graph**
  - no loops
  - no multiple edges

# ☑️ Graph Implementations

## Representing Graphs with Adjacency Matrix

Square grid of boolean values or weights on the edges

- Cell [i,j] == true
  - → there is an **edge** **from vertex i to vertex j**
- Cell [i,j] == w
  - with weight w

## Representing Graphs with Adjacency Lists

Array of n different linked lists (`n` = the number of vertices)

- each array cell represents a **vertex** in the graph
- each array cell [i] **has a pointer to a linked list** of all vertices directly connected from i

## Graph Class with Weighted Vertices

```cpp
template <class Item>
class graph {
	public:
		...
		static const std::size_t MAX=20;
	private:
		bool edges[MAX][MAX];
		Item labels[MAX];
		std::size_t many_vertices;
}
```

## Public Functions for the Graph Class

- add_vertex(const Item& label)
- add_edge(size_t source, size_t target)
- remove_edge(size_t source, size_t target)
- operator [] (size_t vertex)
- size()
- is_edge(size_t source, size_t target)
- set<size_t> neighbors(size_t vertex) const

### ✔️ constructor

create a graph object with **no vertices, no edges**

### ✔️ operator []

returns a reference to the label of the specified vertex

C++ 코드와 관련된 기능이지, 자료구조와 관련된 내용은 아님

```cpp
template <class Item>
Item& graph<Item>::operator [](std::size_t vertex) {
	assert(vertex < size());

	return labels[vertex];
}

graph<double> g;
g[2] = 7.67
```

### ✔️ add_vertex

```cpp
template <class Item>
void graph<Item>::add_vertex (const Item& label) {
	std::size_t new_vertex_number;
	std::size_t vertex;
	assert(size() < MAX);

	new_vertex_number = many_vertices;
	++many_vertices;

	for(vertex=0; vertex<many_vertices; ++vertex) {
		edges[vertex][new_vertex_number] = false;
		edges[new_vertex_number][vertex] = false;
	}

	labels[new_vertex_number] = label;
}
```

### ✔️ add_edge

```cpp
templat <class Item>
void graph<Item>::add_edge(std::size_t source, std::size_t target) {
	assert(source < size());
	assert(target < size());

	edges[source][target] = true;
}
```

### ✔️ is_edge

```cpp
templat <class Item>
void graph<Item>::is_edge(std::size_t source, std::size_t target) const {
	assert(source < size());
	assert(target < size());

	return edges[source][target];
}
```

### ✔️ neighbors

```cpp
template <class Item>
std::set<std::size_t> graph<Item>::neighbors (std::size_t vertex) const {
	std::set<std::size> answer;
	std::size_t i;

	assert(vertex < size());

	for(i=0; i<size(); ++i) {
		if(edges[vertex][i])
			answer.insert(i);
	}

	return answer;
}
```

### ✔️ remove_edge

```cpp
template <class Item>
void graph<Item>::remove_edge(std::size_t source, std::size_t target) {
	assert(source < size());
	assert(target < size());

	edges[source][target] = false;
}
```

<br />

# ☑️ Graph Traversals

- graph에 cycles(경로 시작 vertex, 종료 vertex가 동일한 경우)가 있을 수 있기 때문에 tree traversals과는 다름
- need to mark each vertex as it is processed → in order to avoid repetitive visits
- two common ways:
  - depth-first search
  - breadth-first search

## Depth-First Search

한 vertex의 한 이웃을 방문, 더 갈 수 없다면 back up

from the start vertex to **one** of its neighbors → then to one of the neighbor’s neighbors, and so on

- search **has to back up** if it cannot proceed futher
- **stack** or **recursively**

### Implementation

- depth_first(processFunction, aGraph, startingVertex)
  - use boolean array `marked[aGraph.MAX]` to keep track of the visited vertices
  - `depth_first(…)` will call a recursive function `rec_dfs` to actually carry out the search

```cpp
template <class Process, class Item, class SizeType>
void depth_first(Process f, graph<Item>& g, SizeType start) {
	bool marked[g.MAX]; // to keep track of the visited vertices

	// 1. Check the start vertex is a valid vertex number of the graph
	assert(start < g.size());

	// 2. Set all the components of marked[] to false
	std::fill_n(marked, g.size(), false);

	// 3. Call a separate recursive function rec_dfs
	// to actually carry out the search
	rec_dfs(f, g, start, marked);
}
```

```cpp
template <class Process, class Item, class SizeType>
void rec_dfs(Process f, graph<Item>& g, SizeType v, bool marked[]) {
	std::set<std::size_t> connections = g.neighbors(v);
	std::set<std::size_t>::iterator it // v의 neighbor vertex 반복자

	marked[v] = true; // 현재 vertex v를 방문 처리
	f(g[v]); // 현재 vertex v에서 수행할 작업 실행

	// 모든 neighbor vertex를 순회
	for (it=connections.begin(); it != connections.end(); ++it) {
		if(!marked[*it]) // 현재 neighbor vertex가 아직 방문되지 않았을 경우
			rec_dfs(f, g, *it, marked); // 해당 (방문되지 않은) neighbor vertex에 대해 rec_dfs 호출
	}
}
```

## Breadth-First Search

해당 vertex의 모든 neighbor들을 다 방문한 후 neighbor의 neighbor 방문

- search proceeds from the start vertex to **_each_** of its **_neighbors_**
- after processing all neighbors, search proceeds to **_the neighbors’ neighbors_**, and so on.
- search ends when all reachable vertices have been processed
- could be implemented using a **_queue_**

### Implementation

breadth_first(processFunction, aGraph, startingVertex)

```cpp
template <class Process, class Item, class SizeType>
void breadth_first(Process f, graph<Item>& g, SizeType start) {
	bool marked[g.MAX]; // to keep track of the visited vertices

	std::set<std::size_t> connections;
	std::set<std::size_t>::iterator it;
	std::queue<std::size_t> vertex_queue;

	// 1. Check the start vertex is a valid vertex number of the graph
	assert(start < g.size());

	// 2. Set all the components of marked[] to false
	std::fill_n(marked, g.size(), false);

	// 3. Process the start vertex, mark it, and place it in the queue
	marked[start] = true;
	f(g[start]);
	vertex_queue.push(start);

	// 4. Repeat the following steps
	// until the queue is empty
	do {
		connections = g.neighbors(vertex_queue.front());

		// 4-1. Remove a vertex v from the queue
		vertex_queue.pop();

		// 4-2. For each unmarked neighbor u of v do:
		for(it=connections.begin(); it!=connections.end(); ++it) {
			if(!marked[*it]) {
				// 4-2-1. Process u, mark u, and then place u in the queue
				marked[*it] = true;
				f(g[*it]);
				vertex_queue.push(*it);
			}
		}

	} while(!vertex_queue.empty());

}
```
