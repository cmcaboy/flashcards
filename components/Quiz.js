// I could change the state instead of using stack navigator

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import selectDeck from '../selectors/selectDeck';
import {connect} from 'react-redux';
import QuizComplete from './QuizComplete';

class Quiz extends React.Component {

    state = {
        currentQuestion: 0,
        numCorrect: 0,
        quizComplete: false
    }

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title} quiz`,
        headerRight: (<View></View>),
        headerLeft: (<View></View>),
        headerTitleStyle: 
            {
                alignSelf: 'center',
                textAlign: 'center',
                fontWeight:'normal',
                fontSize: 22,
                color: '#606060'
            }
    })
    flipAnswer = () => {
        console.log('flip to answer');
    }

    onCorrect = () => {
        this.setState((prevState) => ({
            ...prevState,
            numCorrect: this.state.numCorrect + 1
        }));
        console.log(this.state);
        if(this.completeCheck()) {
            this.navigateToComplete();
        } else {
            this.setState((prevState) => ({
                ...prevState,
                currentQuestion: this.state.currentQuestion + 1
            }));
        }
    }

    onIncorrect = () => {
        if(this.completeCheck()) {
            this.navigateToComplete();
        } else {
            this.setState((prevState) => ({
                ...prevState,
                currentQuestion: prevState.currentQuestion + 1
            }));
        }
    }

    completeCheck = () => {
        return ((this.state.currentQuestion + 1) === this.props.deck.cards.length) 
    }

    navigateToComplete = () => {
        this.setState((prevState) => ({
            ...prevState,
            quizComplete: true
        }))
    }

    resetQuiz = () => {
        this.setState(() => ({
            currentQuestion: 0,
            numCorrect: 0,
            quizComplete: false
        }))
    }

    finishQuiz = () => {
        this.props.navigation.goBack();
    }

    render() {

        console.log('this state at render--- ',this.state);

        if(this.state.quizComplete) {
            return (
                <QuizComplete 
                    numCorrect={this.state.numCorrect}
                    numQuestion={this.props.deck.cards.length}
                    deckTitle={this.props.deck.title}
                    resetQuiz={this.resetQuiz}
                    finishQuiz={this.finishQuiz}
                />
            )
        } else {

        return (
            <View style={styles.questionView}>
                <Text style={styles.questionTracker}>
                    {`${this.state.currentQuestion + 1} / ${this.props.deck.cards.length}`}
                </Text>
                
                <View style={styles.questionContent}>
                    <View>
                        <Text style={styles.question}>
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
                            onPress={this.onIncorrect}
                        >
                            <Text style={styles.androidIncorrectBtn}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>     
        )
    }
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
