import React, {Component} from 'react';
import {View, 
    Text, 
    TouchableOpacity, 
    Platform, 
    StyleSheet, 
    TextInput,
    Button
} from 'react-native';
import { gray, green, white, black,blue } from '../utils/colors';
import {connect} from 'react-redux';
import { addDeck } from './../actions/index';

class NewDeck extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }

    onPress = () => {
        this.props.dispatch(addDeck({title:this.state.title}));
        this.setState(() => ({title:''}));
        this.props.navigation.goBack();
    }

    render() {
        return (
                <View style={styles.deck}>
                        <Text style={styles.question}>What is the title of your new deck?</Text>
                        <TextInput 
                            style={styles.title}
                            onChangeText={(title) => this.setState({title})}
                            value={this.state.title}
                            maxLength={40}
                            placeholder={"Deck Name"}
                        />
                        <TouchableOpacity
                            style={styles.androidSubmitBtn}
                            onPress={this.onPress}
                        >
                            <Text style={styles.submitBtn}>SUBMIT</Text>
                        </TouchableOpacity>
                 </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    deck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        
        fontSize: 40,
        marginBottom: 20,
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 50
    },
    title: {
        width: 200,
        height: 50,
        borderRadius: 2,
        borderColor: gray,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 25
    },
    iosSubmitBtn: {
        
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        marginTop:25,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5
    },
    submitBtn: {
        color: white,
        fontSize: 24
    }
});

export default connect()(NewDeck);