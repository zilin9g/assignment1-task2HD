class Node{
	constructor (element) {
		this.element = element;
		this.next = null;
		this.previous = null;
	}
};

class LList{
	constructor() {
		this.head = new Node('head');
	}
	
	find(item) {
		var currNode = this.head;
		while(currNode.element != item) {
			currNode = currNode.next;
		}
	
		return currNode;
	}
	
	insert(newElement, item) {
		var newNode = new Node(newElement);
		var current = this.find(item);
	
		newNode.next = current.next;
		newNode.previous = current;
		current.next = newNode;
	
		if(!(newNode.next == null)) {
			newNode.next.previous = newNode;
		}
	}
	
	display() {
		var currNode = this.head;
	
		while(currNode.next != null) {
			console.log(currNode.next.element);
			currNode = currNode.next;
		}
	}
	
	remove(item) {
		var currNode = this.find(item);
	
		if(!(currNode.next == null)) {
			currNode.previous.next = currNode.next;
			currNode.next.previous = currNode.previous;
			currNode.next = null;
			currNode.previous = null;
		} else {
			if(currNode.previous!=null){
				currNode.previous.next = null;
			currNode.previous = null;
			}
			
		}
	}
	
	dislayReverse() {
		var currNode = this.findLast();
	
		while(!(currNode.previous == null)) {
			console.log(currNode.element);
			currNode = currNode.previous;
		}
	}
	
	findLast() {
		var currNode = this.head;
	
		while(!(currNode.next == null)) {
			currNode = currNode.next;
		}
	
		return currNode;
	}
};
module.exports = new LList();
