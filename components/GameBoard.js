import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT, SCOREBOARD_KEY } from '../constants/Game';
import styles from '../style/style';
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';

let board = []

let day = new Date().getDate()
let month = new Date().getMonth() + 1
let year = new Date().getFullYear()
let hours = new Date().getHours()
let minutes = new Date().getMinutes()
let seconds = new Date().getSeconds()

export default GameBoard = ({ navigation, route }) => {

    const [playerName, setPlayerName] = useState('')
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS)
    const [status, setStatus] = useState('Throw dices')
    const [isPressed, setIsPressed] = useState(false);
    const [gameEndStatus, setGameEndStatus] = useState(false)
    // Ovatko nopat lukittu
    const [lockDices, setLockDices] = useState(new Array(NBR_OF_DICES).fill(false))
    // Noppien silmäluvut
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0))
    // Onko silmäluvulle valittu pisteet
    const [selectDicepoints, setSelectDicePoints] = useState(new Array(MAX_SPOT).fill(false))
    // Kerätyt pisteet
    const [points, setPoints] = useState(new Array(MAX_SPOT).fill(0))
    // Tulostaulun pisteet
    const [scores, setScores] = useState([])

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboardData()
        });
        return unsubscribe;
    }, [navigation]);

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const dicesRow = []
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                    key={"dice" + dice}
                    onPress={() => selectDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        key={"dice" + dice}
                        size={50}
                        color={getDiceColor(dice)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const pointsRow = []
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                <Text style={styles.text} key={"pointsRow" + spot}>{getSpotTotal(spot)}

                </Text>
            </Col>
        )
    }

    const PointsToSelectRow = []
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        PointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                    key={"buttonsRow" + diceButton}
                    onPress={() => selectDicePoints(diceButton)}
                >
                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                    >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectDicepoints]
            let points = [...points]
            if (!selectedPoints[i]) {
                selectedPoints[i] = true
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)  // change to for loop
                points[i] = (i + 1) * nbrOfDices
            } else {
                setStatus('You have already selected points for this spot')
                return points[i]
            }
            setPoints(points)
            setSelectDicePoints(selectedPoints)
            return points[i]
        } else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times first')
        }
    }

    const savePlayerPoints = async () => {
        const newKey = scores.length + 1
        const playerPoints = {
            key: newKey,
            name: playerName,
            date: day + '/' + month,
            time: hours + ':' + minutes,
            points: points,
        }
        try {
            const newScore = [...scores, playerPoints]
            const jsonValue = JSON.stringify(newScore)
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue)
        } catch (e) {
            console.log('Save error: ' + e)
        }
    }

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue != null) {
                let tempScores = JSON.parse(jsonValue)
                setScores(tempScores)
            }
        } catch (e) {
            console.log('Get error: ' + e)
        }
    }

    const throwDices = () => {
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus('No throws left')
            return
        } else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false)
            diceSpots.fill(0)
            points.fill(0)
        }
        let spots = [...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!lockDices[i]) {
                spots[i] = Math.floor(Math.random() * 6) + 1
                board[i] = "dice-" + spots[i]
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft - 1)
        setDiceSpots(spots)
        setStatus('Select and throw dices again')
    }

    function getSpotTotal(i) {
        return points[i]
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            let dices = [...lockDices]
            dices[i] = lockDices[i] ? false : true
            setLockDices(dices)
        } else {
            setStatus('You have to throw dice first')
        }
    }

    function getDiceColor(i) {
        return lockDices[i] ? 'rgb(255, 0, 0)' : 'rgb(216, 30, 173)'
    }

    function getDicePointsColor(i) {
        return (selectDicepoints[i] && !gameEndStatus) ? 'rgb(255, 0, 0)' : 'rgb(216, 30, 173)'
    }

    return (
        <>
            <Header />
            <ScrollView style={styles.excludeFooter}>
                <Text style={styles.text}>Gameboard</Text>
                <Container>
                    <Row>
                        {dicesRow}
                    </Row>
                </Container>
                <Text style={styles.text}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.text}>{status}</Text>
                <Pressable style={styles.container}
                    onPress={throwDices}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    {({ pressed }) => (
                        <View style={[styles.button, { backgroundColor: pressed ? 'rgb(255, 0, 0)' : 'rgb(216, 30, 173)' }]}>
                            <Text style={[styles.buttonText, { color: pressed ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }]}>THROW DICES</Text>
                        </View>
                    )}
                </Pressable>
                
                <View style={styles.giveSpace}>
                <Container>
                    <Row>
                        {pointsRow}
                    </Row>
                </Container>

                <Container>
                    <Row>
                        {PointsToSelectRow}
                    </Row>
                </Container>
                </View>
                <Pressable style={styles.container}
                    onPress={savePlayerPoints}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    {({ pressed }) => (
                        <View style={[styles.button, { backgroundColor: pressed ? 'rgb(255, 0, 0)' : 'rgb(216, 30, 173)' }]}>
                            <Text style={[styles.buttonText, { color: pressed ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }]}>SAVE POINTS</Text>
                        </View>
                    )}
                </Pressable>
                <Text style={styles.text}>Player: {playerName}</Text>
            </ScrollView>
            <Footer />
        </>
    )
}