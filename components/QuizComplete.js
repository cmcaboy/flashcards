import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
//import {connect} from 'react-redux';
import { gray, green, white, black,blue } from '../utils/colors';

const QuizComplete = (props) => {
    const questionVar = (props.numCorrect === 1) ? 'question' : 'questions';
    return (
        <View style={styles.quizCompleteView}>
            <View>
                <Text style={styles.title}>Quiz Complete</Text>
                <Text style={styles.deckName}>{props.deckTitle}</Text>
                <Text style={styles.stats}>You answered {props.numCorrect} / {props.numQuestion} {questionVar} correctly.</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.finishBtn}
                    onPress={props.finishQuiz}
                >
                    <Text style={styles.finishBtnText}>Finish</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.retakeBtn}
                    onPress={props.resetQuiz}
                >
                    <Text style={styles.retakeBtnText}>Retake Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    quizCompleteView: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    title: {
        fontSize: 48,
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '500'
    },
    stats: {
        fontSize: 20,
        textAlign: 'center',
        opacity: 0.8
    },
    deckName: {
        fontSize: 32,
        textAlign: 'center',
        opacity: 0.8,
        marginBottom: 5

    },
    answerTextBtn: {
        color: "red",
        fontSize: 12,
        textAlign: "center"
    },
    finishBtn: {
        marginTop:25,
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        marginBottom: 5
    },
    finishBtnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center'
    },
    retakeBtn: {
        marginTop:25,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5
    },
    retakeBtnText: {
        color: white,
        fontSize: 24,
        textAlign: 'center'
    }
})

export default QuizComplete;