import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomePage from '../screens/HomePage';
import MovieInfoPage from '../screens/MovieInfoPage';
import MovieStarPage from '../screens/MovieStarPage';
import SearchPage from '../screens/SearchPage';
const Stack=createNativeStackNavigator();

export default function AppNavigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown:false}} component={HomePage}/>
                <Stack.Screen name="MovieInfo" options={{headerShown:false}} component={MovieInfoPage}/>
                <Stack.Screen name="MovieStar" options={{headerShown:false}} component={MovieStarPage}/>
                <Stack.Screen name="Search" options={{headerShown:false}} component={SearchPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}