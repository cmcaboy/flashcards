import React from 'react';
import {View, Slider, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { gray, green, white, black,blue } from '../utils/colors';
import selectDeck from '../selectors/selectDeck';
import {connect} from 'react-redux';

function DeckDetail (props) {
    const addCard = () => {
        console.log('add card');
        props.navigation.navigate('NewCard',{id:props.deck.id});
    }
    const startQuiz = () => {
        console.log('start quiz');
        props.navigation.navigate('Quiz',{id:props.deck.id});
    }

    return (
        <View style={styles.deck}>
            <View>
                <Text style={styles.deckTitle}>{props.deck.title}</Text>
                <Text style={styles.deckSubTitle}>{props.deck.cards.length} cards</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.androidAddCard}
                    onPress={addCard}
                >
                    <Text style={styles.androidAddCardBtn}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.androidStartQuiz}
                    onPress={startQuiz}
                >
                    <Text style={styles.androidStartQuizBtn}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    deckTitle: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: '500',
        
    },
    deckSubTitle: {
        fontSize: 24,
        opacity: .4,
        textAlign: 'center'
    },
    iosSubmitBtn: {
        
        backgroundColor: "green",
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidAddCard: {
        marginTop:25,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1
    },
    androidAddCardBtn: {
        color: black,
        fontSize: 24
    },
    androidStartQuiz: {
        marginTop:25,
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1
    },
    androidStartQuizBtn: {
        color: "white",
        fontSize: 24
    }
})

const mapStateToProps = (state, ownProps) => {
    
    return {
        deck: selectDeck(state,ownProps.navigation.state.params.id)
    }
}

export default connect(mapStateToProps)(DeckDetail);