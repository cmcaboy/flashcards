import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import selectDeck from '../selectors/selectDeck';
import {connect} from 'react-redux';
import QuizComplete from './QuizComplete';

class Quiz extends React.Component {
    // Keep state of this application
    state = {
        currentQuestion: 0,
        numCorrect: 0,
        quizComplete: false,
        displayAnswer: false
    }
    // format the header
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
 

    onCorrect = () => {
        this.setState((prevState) => ({
            ...prevState,
            numCorrect: this.state.numCorrect + 1
        }));
        if(this.completeCheck()) {
            this.navigateToComplete();
        } else {
            this.setState((prevState) => ({
                ...prevState,
                displayAnswer: false,
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
                displayAnswer: false,
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

    flipAnswer = () => {
        console.log('flip to answer');
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
              toValue: 0,
              friction: 8,
              tension: 10
            }).start();
          } else {
            Animated.spring(this.animatedValue,{
              toValue: 180,
              friction: 8,
              tension: 10
            }).start();
          }
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);

        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
          this.value = value;
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0,180],
            outputRange: ['0deg','180deg']
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0,180],
            outputRange: ['180deg','360deg']
        })
    }

    render() {
        const frontAnimatedStyle = {
            transform: [
                {rotateY: this.frontInterpolate}
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }
        
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
                    <View style={styles.flipCardContainer}>
                            <View>
                                <Text style={styles.question}>{this.props.deck.cards[this.state.currentQuestion].question}</Text>
                            </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.setState((prevState) => ({...prevState,displayAnswer: !prevState.displayAnswer}))}
                        >
                            {this.state.displayAnswer ? (
                                <Text style={styles.answerTextBtn}>{this.props.deck.cards[this.state.currentQuestion].answer}</Text>
                            ) : (
                                <Text style={styles.answerTextBtn}>Press for Answer</Text>
                            )}
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
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    question: {
        fontSize: 44,
        textAlign: 'center',
        fontWeight: '500',
        borderWidth: 0
    },
    flipCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100
    },
    flipCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        height: 50,
        width: 200
    },
    flipCardBack: {
        position: 'absolute',
        top:0
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
        deck: selectDeck(state.reducer,ownProps.navigation.state.params.id)
    }
}

export default connect(mapStateToProps)(Quiz);
