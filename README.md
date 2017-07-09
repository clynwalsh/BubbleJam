# Bubble Jam #

[Bubble Jam live](https://clynwalsh.github.io/BubbleJam/)

Bubble Jam is a [Zuma-inspired](https://en.wikipedia.org/wiki/Zuma_(video_game)) matching game.  A chain of colored bubbles travels along a curving track.  The player eliminates bubbles and scores points by firing at the chain from the center of the track.  If the fired bubble strikes a group of bubbles of the same color, the fired bubble and all members of the group disappear from the chain--otherwise the fired bubble is inserted into the chain.  The player loses points by allowing bubbles to reach the end of the track and "escape."

## Technical Implementation ##

Bubble Jam is built in JavaScript using HTML5's Canvas API for animation.  

The chain of bubbles is implemented as a doubly-linked list, allowing for constant time insertion and deletion of bubbles.  

```JavaScript
insert(prevLink) {
  this.prev = prevLink
  this.next = prevLink.next;
  prevLink.next.prev = this;
  prevLink.next = this;

  this.percent = prevLink.percent;
  this.curve = prevLink.curve;
}

remove() {
  this.prev.next = this.next;
  this.next.prev = this.prev;
}
```

Upon collision with the chain, a bubble recursively searches up and down the chain for bubbles of the same color; all are removed if there are three or more matches.

```JavaScript
class Missile {
  checkForMatches() {
    return [this.bubble].concat(
      this.bubble.checkForward(),
      this.bubble.checkBack()
    );
  }
}

class Bubble {
  checkForward() {
    if (this.prev.color !== this.color) return [];
    return [this.prev].concat(this.prev.checkForward());
  }
}
```
