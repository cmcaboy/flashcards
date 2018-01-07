const deckReducerDefaultState = [];

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