import { Text, View,ScrollView,TouchableOpacity,Image } from 'react-native';
import { image185 } from "../api/moviedatabase.js";

export default function Actor({actor,navigation}) {
  
    return (
        <View style={{ marginVertical: 6 }}>
           <Text style={{ color: 'black', fontSize: 18, marginLeft: 10, marginBottom: 5 ,fontWeight:'bold'}}>Actors</Text>
            <ScrollView
            horizontal
            showHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    actor.map((moviestar, index) => {
                        return(
                            <TouchableOpacity 
                                key={index}
                                style={{ marginRight: 4, alignItems: 'center' }}
                                onPress={()=> navigation.navigate('MovieStar',moviestar)}
                            >
                                <View style={{overflow: 'hidden',borderRadius: 50,height: 100,width: 80,alignItems: 'center',borderWidth: 1,borderColor:"yellow"}}>
                                    <Image
                                        style={{borderRadius: 2, aspectRatio: 1, height: 100, width: 50}}
                                      
                                        source={{uri:image185(moviestar?.profile_path)}}
                                    
                                    />
                                </View>
                               
                                <Text style={{ color: 'black', fontSize: 12, marginLeft: 4 }}>
                                    {
                                        moviestar?.character.length>10? moviestar?.character.slice(0,10)+'...':moviestar?.character
                                    }
                                </Text>
                                <Text style={{ color: 'black', fontSize: 12, marginLeft: 4 }}>
                                    {
                                        moviestar?.original_name.length>10? moviestar?.original_name.slice(0,10)+'...':moviestar?.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
  }