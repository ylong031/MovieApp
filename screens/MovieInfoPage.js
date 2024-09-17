import { StyleSheet,StatusBar,Text,TouchableOpacity,View,ScrollView,Dimensions, Platform ,Image} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {HeartIcon} from 'react-native-heroicons/solid'
import { SafeAreaView } from "react-native-safe-area-context";
import {useRoute} from '@react-navigation/native'
import React,{useEffect} from 'react'
import {useNavigation} from '@react-navigation/native'
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Actor from'../components/actor.js';
import MovieCard from "../components/movieCard.js";
import Loading from "../components/loading.js";
import { image500 } from "../api/moviedatabase.js";
import { retrieveMovieDetails,retrieveMovieActor,retrieveSimilarMovies } from "../api/moviedatabase.js";



var {width,height}=Dimensions.get('window');


export default function MovieInfoPage(){
  
    const {params:item}=useRoute();
    const navigation=useNavigation();
    const [actor,setActor]=useState([])
    const [relatedMovies,setRelatedMovies]=useState([])

    const [isFavourite,toggleFavourite]=useState(false);
    const [loading,setLoading]=useState(false);
    const [movie,setMovie]=useState({})

 
    useEffect(()=>{
    
       
        setLoading(true);
        getMovieDetails(item.id)
        getMovieActor(item.id)
        getRelatedMovies(item.id)
    },[item]);

    const getMovieDetails=async id=>{
        const info=await retrieveMovieDetails(id);
        if(info) setMovie(info)
        setLoading(false);
    }

    const getMovieActor=async id=>{
        const info=await retrieveMovieActor(id);
        if(info&& info.cast) setActor(info.cast)
        
    }

    const getRelatedMovies=async id=>{
        const info=await retrieveSimilarMovies(id);
        if(info&& info.results) setRelatedMovies(info.results)
        
    }

  return(
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
                    <Image
                       
                        source={{uri:image500(movie?.poster_path)}}
                        style={styles.image1}
                        
                    />
                    <LinearGradient
                        colors={['transparent','orange']}
                        style={styles.gradient}
                    />
                  
                </View>

                )
            }



           
        </View>

        <View style={styles.movieInfo}>
            <Text style={ styles.text1 }>
                {movie?.title}
            </Text>
            {
                movie?.id?(
                <Text style={styles.text2}>
                    {movie?.status} · {movie?.release_date?.split('-')[0]} · {movie?.runtime}min
                </Text>
                ):null
            }
            
        
            
            
            <View style={styles.movieGenre}>
                {
                    movie?.genres?.map((genre,index)=>{
                        let showDot=index+1 !=movie.genres.length;
                       return(
                        <Text key={index} style={styles.text3}>                    
                            {genre?.name} {showDot?"· ":null}
                        </Text>
                       ) 
                    })
                }
              
               
              
            </View>
            <Text style={styles.text4}>
                 {
                    movie?.overview
                 }   
            </Text>
        
        </View>

        <Actor navigation={navigation} actor={actor}/>

        <MovieCard title="Related Movies" hideSeeAll={true} data={relatedMovies}/>
   
        
   
       


    </ScrollView>
  );
}

const styles = StyleSheet.create({
    box: {backgroundColor:"blue",borderRadius: 8, padding: 2 },
    image1:{width,height:height*0.7},
    safearea:{ position: 'absolute', zIndex: 20,width:'100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 3 },
    gradient:{position: 'absolute', width: '100%', height: '100%'},
    background:{flex: 1, backgroundColor: "orange" },
    movieInfo:{flex: 1, justifyContent: 'center', alignItems: 'center'},
    text1:{color: 'black', textAlign: 'center', fontSize: 24, fontWeight: 'bold', letterSpacing: 1},
    text2:{color: 'black', fontWeight: '600', fontSize: 14, textAlign: 'center'},
    text3:{ color: 'black', fontWeight: '600', fontSize: 14, textAlign: 'center'},
    text4:{color: 'black', letterSpacing: 1 ,margin:10},
    movieGenre:{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 4, marginVertical: 2}
  });