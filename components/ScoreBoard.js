import { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from '../constants/Game';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../style/style';

export default Gameboard = ( {navigation} ) => {

    const [scores, setScores] = useState([])
    const [isPressed, setIsPressed] = useState(false);

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

    const getScoreboardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
            if (jsonValue != null) {
                let tempScores = JSON.parse(jsonValue)
                setScores(tempScores)
            }
        } catch(e) {
            console.log('Get error: ' + e)
        }
    }

    const clearScoreboardData = async () => {
        try {
            await AsyncStorage.clear()
            setScores([])
        } catch(e) {
            console.log('Clear error: ' + e)
        }
    }

    const sortedScores = scores.slice().sort((a, b) => a.date - b.date)

    return(
        <>
            <Header />
            <ScrollView>
                <DataTable.Row>
                    <DataTable.Cell><Text style={styles.text}>Position</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.text}>Name</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.text}>Date</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.text}>Time</Text></DataTable.Cell>
                    <DataTable.Cell><Text style={styles.text}>Points</Text></DataTable.Cell>
                </DataTable.Row>
                { scores.length === 0 ? 
                    <Text style={styles.text}>No scores</Text> : sortedScores.map((player, index) => (
                        index < NBR_OF_SCOREBOARD_ROWS && 
                        <DataTable.Row key={player.key}>
                            <DataTable.Cell><Text style={styles.text}>{index + 1}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.text}>{player.name}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.text}>{player.date}</Text></DataTable.Cell>
                            <DataTable.Cell><Text style={styles.text}>{player.time}</Text></DataTable.Cell>
                            <ScrollView>
                            <DataTable.Cell><Text style={styles.text}>{player.points}</Text></DataTable.Cell>
                            </ScrollView>
                        </DataTable.Row>
                    ))
                }
            </ScrollView>
            <View style={styles.container}>
                <Pressable 
                    onPress={clearScoreboardData}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    {({ pressed }) => (
                        <View style={[styles.button, { backgroundColor: pressed ? 'rgb(255, 0, 0)' : 'rgb(216, 30, 173)' }]}>
                            <Text style={[styles.buttonText, { color: pressed ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }]}>CLEAR SCOREBOARD</Text>
                        </View>
                    )}
                </Pressable>
            </View>
            <Footer />
        </>
    )
}