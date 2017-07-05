# Break the Chain #

## MVP ##

Break the Chain is a [Zuma-inspired](https://en.wikipedia.org/wiki/Zuma_(video_game)) matching game.  A chain of colored balls rolls along a curving track toward a drain, which will swallow the entire chain and end the game if the leading ball reaches it.  To prevent this. the player eliminates balls by firing balls from the center of the board into the chain, exploding balls and scoring points when groups of three or more of the same color are created.  To implement the game, I will need:

1. a set of balls in various colors, which increases by one at a fixed interval.
2. ability for the player to aim and fire balls into the chain.
3. balls are eliminated when the player forms groups of 3+.
4. balls are eliminated in a chain reaction if new groups of 3+ are formed by elimination above.

## Technical Implementation ##

I plan to implement a linked list for fast insertion / deletion of balls in the chain.  Rendering clean, aesthetically pleasing graphics will definitely be a challenge, and I'll likely need to employ a library.  I'm currently looking at PixiJS, but may consider others over the next day.

## Wireframes ##

[Game View](game_view.png)
[Instructions Modal](modal.png)

## Implementation Timeline ##

### Phase I: The Chain ###

* a fully styled container, with a chain of balls following a curving path
* number of balls increases at a fixed interval
* game ends if leading end of chain reaches the drain

### Phase II: The Player ###

* a mouse-controlled "cannon" rotates in the center of the board
* user fires balls from the cannon into the chain

### Phase III: Chain Elimination ###

* groups of 3+ including ball fired by user are destroyed on contact
* chain reactions

### Phase IV: Odds & Ends ###

* instructions
* speed of balls increases as game goes on
* scorekeeping
