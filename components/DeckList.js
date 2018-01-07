import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, ScrollView} from 'react-native';
import DeckSummary from './DeckSummary';
import { connect } from 'react-redux';
import { addDeck, addCard } from '../actions';

class DeckList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const decks = [
            {
                id: 0,
                title: 'Udacicards',
                cards: [
                  { 
                    question: "What is the Udacity Website?",
                    answer: "www.udacity.com"
                  },
                  { 
                    question: "How many Udacity Nanodegrees have you taken?",
                    answer: "2"
                  },
                  { 
                    question: "What is your favorite nanodegree?",
                    answer: "FEND"
                  }
                ]
            },
            {
                id: 1,
                title: 'Math',
                cards: [
                  { 
                    question: "What is 2+2?",
                    answer: "4"
                  },
                  { 
                    question: "What are the first 3 digits of pi?",
                    answer: "3.14"
                  },
                  { 
                    question: "What was your GMAT quant score?",
                    answer: "49"
                  },
                  { 
                    question: "What is (10+10)*9?",
                    answer: "180"
                  }
                ]
            },
            {
                id: 2,
                title: 'Learning',
                cards: [
                  { 
                    question: "Who is the best instructor?",
                    answer: "Andrew Mead of Udemy"
                  },
                  { 
                    question: "Which learning platform is better? Udacity or Treehouse",
                    answer: "Udacity"
                  }
                ]
            },
            {
                id: 3,
                title: 'Science',
                cards: []
            }
          ]
          decks.map((deck) => {
            this.props.dispatch(addDeck({title:deck.title,id:deck.id}));
            deck.cards.map((card) => {
              this.props.dispatch(addCard({id:deck.id,question:card.question,answer:card.answer}));
            });
          });
    }

    render() {
        return (
            <View style={styles.list}>
                <ScrollView>
                {console.log('persist check')}
                {this.props.decks.map((deck) => (
                        <DeckSummary key={deck.id} numCards={deck.cards.length} {...deck} {...this.props.origProps}/>
                ))}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        justifyContent: 'center',
        alignItems: 'stretch'
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        decks: state,
        origProps: ownProps
    }
}



export default connect(mapStateToProps)(DeckList);