import { Text, View,Dimensions, ScrollView,TouchableOpacity,StatusBar,Image,StyleSheet} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {HeartIcon} from 'react-native-heroicons/solid'
import {useNavigation} from '@react-navigation/native'

import { useState } from 'react';
import MovieCard from "../components/movieCard.js";
import Loading from "../components/loading.js";
import {useRoute} from '@react-navigation/native'
import React,{useEffect} from 'react'
import { retrieveMovieStar,retrieveTheirMovies,image342 } from '../api/moviedatabase.js';
var {width,height}=Dimensions.get('window');

export default function MovieStarPage() {
    const {params:item}=useRoute();
    const navigation=useNavigation();
    const [isFavourite,toggleFavourite]=useState(false);
    const [moviestar,setMovieStar]=useState({})
    const [theirMovies,setTheirMovies]=useState([])
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        setLoading(true)
        getMovieStar(item.id)
        getTheirMovies(item.id)
    },[item])

    const getMovieStar=async id=>{
        const data=await retrieveMovieStar(id)
        if(data) setMovieStar(data)
        setLoading(false);
    }

    const getTheirMovies=async id=>{
        const data=await retrieveTheirMovies(id)
        if(data&&data.cast) setTheirMovies(data.cast)
        setLoading(false);
    }

    return (
        <ScrollView
        contentContainerStyle={{paddingBottom:20}}
        style={styles.background}
        >
            <View>
                <StatusBar translucent={true} backgroundColor={'transparent'} />
                <SafeAreaView style={styles.safearea}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.box}>
                        <ChevronLeftIcon size="28" stokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite? "red":"white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
                {
                loading?(
                    <Loading/>
                ):(
                <View>
                    <View style={styles.imageborder1 }>
                        <View style={styles.imageborder2 }>
                            <Image                          
                                source={{uri:image342(moviestar?.profile_path)}}
                                style={styles.image}
                                
                            />
                        </View>
                    </View>

                    <View style={styles.section1}>
                        <Text style={styles.text1}>
                            {moviestar?.name}
                        </Text>
                        <Text style={styles.text2}>
                            {moviestar?.place_of_birth}
                        </Text>
    
                    </View>

                    <View style={styles.section2}>
                        <View style={styles.section3}>
                            <Text style={styles.text3}>Gender</Text>
                            <Text style={styles.text4}>{moviestar?.gender==1?'Female':'Male'}</Text>
                        </View>     
                        
                     <View style={styles.section3}>
                            <Text style={styles.text3}>Birthday</Text>
                            <Text style={styles.text4}>{moviestar?.birthday}</Text>
                        </View> 
                        
                       <View style={styles.section3}>
                            <Text style={styles.text3}>Known for</Text>
                            <Text style={styles.text4}>{moviestar?.known_for_department}</Text>
                        </View> 
                        
                      <View style={styles.section3}>
                            <Text style={styles.text3}>Popularity</Text>
                            <Text style={styles.text4}>{moviestar?.popularity?.toFixed(2)}%</Text>
                        </View>            
                    </View>

                    <View style={styles.section4}>
                        <Text style={styles.text5}>Biography</Text>
                        <Text style={styles.text6}>
                            {
                                moviestar?.biography||'N/A'
                            }
                        </Text> 
                    </View>
    
                    <MovieCard title={'Movies'} hideSeeAll={true} data={theirMovies}/>
                   
                </View>

                )}
            </View>
           
           
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    background:{flex: 1, backgroundColor: "orange" },
    box: {backgroundColor:"blue",borderRadius: 8, padding: 2 },
    safearea:{ zIndex: 20,width:'100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 3 },
    imageborder1:{flexDirection: 'row', justifyContent: 'center',marginTop:20},
    imageborder2:{alignItems: 'center', borderRadius: 200, overflow: 'hidden', height: 272, width: 272, borderWidth: 1, borderColor: '#ccc' },
    image:{width:width*0.74,height:height*0.43},
    section1:{marginTop:6},
    section2:{backgroundColor: 'white', marginHorizontal: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 900 },
    section3:{margin:15, alignItems: 'center'},
    section4:{marginVertical: 20, marginHorizontal: 20, flexDirection: 'column'},
    text1:{fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center' },
    text2:{fontWeight:"bold",fontSize: 14, color: 'black', textAlign: 'center' },
    text3:{color: 'black', fontWeight: 'bold'},
    text4:{color: 'black', fontSize: 12 },
    text5:{fontSize: 18, fontWeight: 'bold', color: 'black'},
    text6:{fontSize: 16, fontStyle: 'italic', color: 'black',marginTop:10}

});