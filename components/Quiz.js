// I could change the state instead of using stack navigator

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import selectDeck from '../selectors/selectDeck';
import {connect} from 'react-redux';

class Quiz extends React.Component {

        state = {
            currentQuestion: 0,
            numCorrect: 0
        }

    flipAnswer = () => {
        console.log('flip to answer');
    }

    onCorrect = () => {

        this.completeCheck();

        this.setState(() => ({
            numCorrect: this.state.numCorrect + 1,
            currentQuestion: this.state.currentQuestion + 1
        }));

        
    }

    onIncorrect = () => {

        this.completeCheck();

        this.setState((prevState) => ({
            ...prevState,
            currentQuestion: prevState.currentQuestion + 1
        }));

        
    }

    completeCheck = () => {
        if((this.state.currentQuestion + 1) === this.props.deck.cards.length) {
           this.navigateToComplete(); 
        }
    }

    navigateToComplete = () => {
        this.props.navigation.navigate('QuizComplete',{
            numCorrect: this.state.numCorrect,
            numQuestions: this.props.deck.cards.length,
            deckTitle: this.props.deck.title
        })
    }

    render() {
        return (
            <View style={styles.questionView}>
                <Text style={styles.questionTracker}>
                    {`${this.state.currentQuestion + 1} / ${this.props.deck.cards.length}`}
                </Text>
                
                <View style={styles.questionContent}>
                    <View>
                        <Text style={styles.question}>
                            {console.log('state--- ',this.state)}
                            {this.props.deck.cards[this.state.currentQuestion].question}
                        </Text>
                        <TouchableOpacity
                            onPress={this.flipAnswer}
                        >
                            <Text style={styles.answerTextBtn}>answer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.androidCorrect}
                            onPress={this.onCorrect}
                        >
                            <Text style={styles.androidCorrectBtn}>Correct</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.androidIncorrect}
                            onPress={() => onIncorrect}
                        >
                            <Text style={styles.androidIncorrectBtn}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>     
        )
    }
}

const styles = StyleSheet.create({
    questionTracker: {
        padding: 10
    },
    questionContent: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    question: {
        fontSize: 48,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 50
    },
    answerTextBtn: {
        color: "red",
        fontSize: 24,
        textAlign:'center'
    },
    buttons: {
        padding: 10
    },
    androidCorrect: {
        marginTop:25,
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1
    },
    androidIncorrect: {
        marginTop:25,
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1
    },
    androidCorrectBtn: {
        color: "white",
        fontSize: 24,
        textAlign: 'center'
    },
    androidIncorrectBtn: {
        color: "white",
        fontSize: 24
    }

})

const mapStateToProps = (state, ownProps) => {
    return {
        deck: selectDeck(state,ownProps.navigation.state.params.id)
    }
}

export default connect(mapStateToProps)(Quiz);
