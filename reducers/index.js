const deckReducerDefaultState = [];

// redux-persist will not work unless I name a const here. It did not work when I 
// put export default without the const deckReducer.
const deckReducer = (state = deckReducerDefaultState, action = {}) => {
  switch(action.type) {
    case 'ADD_DECK':
      return [...state, action.deck]
    case 'ADD_CARD':
      return state.map((deck) => {
        if(deck.id === action.id) {
          return {
            ...deck,
            cards:[ ...deck.cards,action.card ]
          }
        } else {
          return deck;
        }
      });
    default:
      return state;
  }
}

export default deckReducer;