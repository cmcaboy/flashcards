import uuid from 'uuid';

export const addDeck = ({title = 'Random', id = uuid()}) => ({
    type: 'ADD_DECK',
    deck: {
        id,
        title,
        cards: []
    }
});

export const addCard = ({id, question = 'question', answer = 'no answer'}) => ({
    type: 'ADD_CARD',
    card: {
        question,
        answer
    },
    id
});

