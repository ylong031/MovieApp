import { Text,TouchableWithoutFeedback,View,Dimensions, Image,StyleSheet} from "react-native";
import React from 'react'
import Carousel from 'react-native-new-snap-carousel';

var {width,height}=Dimensions.get('window');
import {useNavigation} from '@react-navigation/native'
import { image500 } from "../api/moviedatabase.js";


export default function FeaturedMovies({data}){

    const navigation=useNavigation();
    const handleClick=(item)=>{
        navigation.navigate('MovieInfo',item);
    }

    const ImageList=({item,handleClick})=>{
        return(
            <TouchableWithoutFeedback onPress={()=>handleClick(item)}>
                <Image
               
                    source={{uri:image500(item.poster_path)}}
                    style={styles.imagestyle}
                  
                    />
    
            
            </TouchableWithoutFeedback>
        )
    }
    
    return(
        <View style={{marginBottom:8}}>
            <Text style={styles.textstyle}>Featured</Text>
            
            <Carousel
                data={data}
                renderItem={({item})=> <ImageList item={item} handleClick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width*0.82}
                slideStyle={{display:'flex',alignItems:'center'}}
                
            />
        </View>
    )

    
}
const styles = StyleSheet.create({
    textstyle: {
        color: 'black',fontWeight:'bold',fontSize: 24, marginHorizontal: 10, marginBottom: 20, 
    },
    imagestyle:{
        width:width*0.85,height:height*0.7,
    }
   
  });
