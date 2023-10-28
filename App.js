import Home from './components/Home';
import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from './style/style';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'rgb(0, 0, 0)' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name == 'Home') {
              iconName = focused ? 'information' : 'information-outline';
            } 
            else if (route.name == 'Gameboard') {
              iconName = focused ? 'dice-multiple' : 'dice-multiple-outline';
            } 
            else if (route.name == 'Scoreboard') {
              iconName = focused ? 'view-list' : 'view-list-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color}/>
          },

          tabBarActiveTintColor: 'rgb(226, 21, 21)',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'rgb(0, 0, 0)' },
          headerStyle: { backgroundColor: 'rgb(0, 0, 0)'},
          headerTintColor: 'rgb(255, 255, 255)',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ tabBarStyle: { display: 'none' }}} />
        <Tab.Screen name="Gameboard" component={GameBoard} />
        <Tab.Screen name="Scoreboard" component={ScoreBoard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}