import { Text,TouchableWithoutFeedback,View,Dimensions, Image, TouchableOpacity,ScrollView} from "react-native";
import React from 'react'
var {width,height}=Dimensions.get('window');
import {useNavigation} from '@react-navigation/native'
import { image185 } from "../api/moviedatabase.js";


export default function MovieCard({title,data,hideSeeAll}){
   
    const navigation=useNavigation();
    return(
        <View style={{ marginBottom: 8, paddingVertical: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                <Text style={{ color: 'black', fontSize: 22,fontWeight:'bold'}}>{title}</Text>
               
            </View>
            <ScrollView
                horizontal
                showHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}

            >
                {
                    data.map((item,index)=>{
                        return(
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={()=>navigation.push('MovieInfo',item)}
                            >
                                <View style={{ marginVertical: 8, marginRight: 20 }}>
                                    <Image
                                        source={{uri:image185(item.poster_path)}}
                                        
                                        className="rounded-3xl"
                                        style={{width:width*0.33,height:height*0.22}}
                                    
                                    />
                                    <Text style={{ color: 'black', marginLeft: 1 ,fontWeight:"bold"}}>
                                        {item.title.length>14? item.title.slice(0,14)+"...":item.title}
                                    </Text>
                                </View>
                              
                            </TouchableWithoutFeedback>


                        )

                    })

                }            
            </ScrollView>
        </View>
    )

}
