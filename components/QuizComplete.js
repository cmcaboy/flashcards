import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import {connect} from 'react-redux';

const QuizComplete = (props) => {


    const finish = () => {
        console.log('finish');
    }

    return (
        <View>
            <Text>Question Complete</Text>
            <Text>{props.deckTitle}</Text>
            <Text>Questions answered correctly: {props.numCorrect}</Text>
            <Text>Total number of questions: {props.numQuestions}</Text>
            <TouchableOpacity
                style={styles.answerTextBtn}
                onPress={finish}
            >
                <Text>Home</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    answerTextBtn: {
        color: "red",
        fontSize: 12,
        textAlign: "center"
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        deckTitle: ownProps.navigation.state.params.deckTitle,
        numCorrect: ownProps.navigation.state.params.numCorrect,
        numQuestions: ownProps.navigation.state.params.numQuestions
    }
}

export default connect(mapStateToProps)(QuizComplete);