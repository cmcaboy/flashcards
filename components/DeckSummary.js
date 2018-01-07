import React from 'react';
import { View, Slider, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DeckDetail from './DeckDetail';

const DeckSummary = (props) => {

    const onPress = () => {
        props.navigation.navigate('DeckDetail', {id:props.id,title:props.title})
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.deck} key={props.id}>
                <Text style={styles.deckTitle}>{props.title}</Text>
                <Text style={styles.deckSubTitle}>{props.numCards} cards</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    deck: {
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomWidth: 1
    },
    deckTitle: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: '500',
        
    },
    deckSubTitle: {
        fontSize: 18,
        opacity: .4,
        textAlign: 'center'
    }
});

export default DeckSummary;