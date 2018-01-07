import React from 'react';
import {View, Slider, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { gray, green, white, black,blue } from '../utils/colors';
import selectDeck from '../selectors/selectDeck';
import {connect} from 'react-redux';

class DeckDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonDisabled: this.startQuizDisabled(),
            buttonOpacity: this.startQuizDisabled() ? 0.5:1
        }
    }
    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.title}`,
        headerRight: (<View></View>),
        headerTitleStyle: 
            {
                alignSelf: 'center',
                textAlign: 'center',
                fontWeight:'normal',
                fontSize: 22,
                color: '#606060'
            }
    })
    addCard = () => {
        console.log('add card');
        this.props.navigation.navigate('NewCard',
            {
                id:this.props.deck.id,
                updateQuizButton:this.updateQuizButton
                
            });
    }
    startQuiz = () => {
        console.log('start quiz');
        this.props.navigation.navigate('Quiz',{id:this.props.deck.id,title:this.props.deck.title});
    }

    updateQuizButton = (newState) => {
        console.log('current state: ',this.state.buttonDisabled);
        console.log('update quiz button state',newState);
        this.setState(() => ({buttonDisabled:newState,buttonOpacity:0.5}));

    }

    startQuizDisabled = () => this.props.deck.cards.length === 0;

    render() {

    return (
        <View style={styles.deck}>
            <View>
                <Text style={styles.deckTitle}>{this.props.deck.title}</Text>
                <Text style={styles.deckSubTitle}>{this.props.deck.cards.length} cards</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.androidAddCard}
                    onPress={this.addCard}
                >
                    <Text style={styles.androidAddCardBtn}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.androidStartQuiz,{opacity: this.state.buttonOpacity}]}
                    onPress={this.startQuiz}
                    disabled={this.state.buttonDisabled}
                >
                    <Text 
                        style={styles.androidStartQuizBtn} 
                    >Start Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    }
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
    androidStartQuizDisable: {
        marginTop:25,
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        opacity: 0.4
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