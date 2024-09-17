import { Text, View,Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import {styles, theme} from '../theme';

var {width,height}=Dimensions.get('window');

export default function Loading(){
    return(
        <View style={{height,width,position: 'absolute', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
            <Progress.CircleSnail thickness={12} size={160} color={theme.background}/>

        </View>
      
    )
}