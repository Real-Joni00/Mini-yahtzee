import { useState } from 'react';
import { Text, View, Pressable, Keyboard, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './Header';
import Footer from './Footer';
import { useFonts } from 'expo-font';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from '../constants/Game';
import styles from '../style/style';

export default Home = ({ navigation }) => {

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const [loaded] = useFonts({
        Oswald: require('../fonts/Oswald-VariableFont_wght.ttf'),
        Fjalla: require('../fonts/FjallaOne-Regular.ttf'),
    })

    if (!loaded) {
        return null
    }

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <MaterialCommunityIcons name='information' size={90} color={'rgb(255, 41, 205)'} />
                {!hasPlayerName ?
                    <>
                        <Text style={styles.text}>For scoreboard enter your name</Text>
                        <TextInput style={styles.inputTextColor} onChangeText={setPlayerName} autoFocus={true} />
                        <Pressable 
                            onPress={() => handlePlayerName(playerName)}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                        >
                            {({ pressed }) => (
                                <View style={[styles.button, { backgroundColor: pressed ? 'rgb(255, 0, 0)' : 'rgb(216, 30, 173)' }]}>
                                    <Text style={[styles.buttonText, { color: pressed ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }]}>OK</Text>
                                </View>
                            )}
                        </Pressable>
                    </>
                    :
                    <>
                        <Text style={styles.text}>Rules of the game</Text>
                        <Text style={styles.text} multiline='true'>
                            THE GAME: Upper section of the classic Yahtzee
                            dice game. You have {NBR_OF_DICES} dices and
                            for the every dice you have {NBR_OF_THROWS}
                            throws. After each throw you can keep dices in
                            order to get same dice spot counts as many as
                            possible. In the end of the turn you must select
                            your points from {MIN_SPOT} to {MAX_SPOT}.
                            Game ends when all points have been selected.
                            The order for selecting those is free.
                        </Text>

                        <Text style={styles.text} multiline='true'>
                            POINTS: After each turn game calculates the sum
                            for the dices you selected. Only the dices having
                            the same spot count are calculated. Inside the
                            game you can not select same points from
                            {MIN_SPOT} to {MAX_SPOT} again.
                        </Text>

                        <Text style={styles.text} multiline='true'>
                            GOAL: To get points as much as possible.
                            {BONUS_POINTS_LIMIT} points is the limit of
                            getting bonus which gives you {BONUS_POINTS}
                            points more.
                        </Text>


                        <Text style={styles.text}>Good luck, {playerName}</Text>
                        <Pressable
                            onPress={() => navigation.navigate('Gameboard', { player: playerName })}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                        >
                            {({ pressed }) => (
                                <View style={[styles.button, { backgroundColor: pressed ? 'rgb(255, 0, 0)' : 'rgb(216, 30, 173)' }]}>
                                    <Text style={[styles.buttonText, { color: pressed ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }]}>PLAY</Text>
                                </View>
                            )}
                        </Pressable>
                    </>
                }
            </View>
            <Footer />
        </>
    )
}

                        