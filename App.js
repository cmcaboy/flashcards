import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import NewDeck from './components/NewDeck';
import { createStore } from 'redux';
import { Provider, dispatch } from 'react-redux';
import reducer from './reducers';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import QuizComplete from './components/QuizComplete';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { setLocalNotification } from './services/local_notifications';

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail
  },
  NewCard: {
    screen: NewCard
  },
  Quiz: {
    screen: Quiz
  },
  QuizComplete: {
    screen: QuizComplete
  }
})

export default class App extends React.Component {
  // Set Local notifications right here
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>       
          <View style={{flex: 1}}>
            <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}