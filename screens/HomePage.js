import { StyleSheet,Text,TouchableOpacity,View,ScrollView,Dimensions} from "react-native";
import { useEffect, useState } from 'react';
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {StatusBar} from 'expo-status-bar'
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import FeaturedMovies from'../components/featuredMovies.js';
import MovieCard from'../components/movieCard.js';
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading.js";
import { retrieveFeaturedMovies,retrieveComingSoonMovies,retrieveHighestRatedMovies } from "../api/moviedatabase.js";





export default function HomePage(){
    const [featured,setFeatured]=useState([])
    const [comingSoon,setComingSoon]=useState([])
    const [highestRated,setHighestRated]=useState([])
    const [loading,setLoading]=useState(true);
    

    const navigation=useNavigation(true);

    useEffect(()=>{
        getFeaturedMovies();
        getComingSoonMovies();
        getHighestRatedMovies();
    },[])

    const getComingSoonMovies=async()=>{
        const info=await retrieveComingSoonMovies();
        if(info && info.results) setComingSoon(info.results);
       
        
    }

    const getHighestRatedMovies=async()=>{
        const info=await retrieveHighestRatedMovies();
        if(info && info.results) setHighestRated(info.results);
        setLoading(false);
    }

    const getFeaturedMovies=async()=>{
        const info=await retrieveFeaturedMovies();
        if(info && info.results) setFeatured(info.results);
        setLoading(false);
    }
    return(
        <View style={styles.background} >
            <SafeAreaView style={styles.safeArea}>
               <StatusBar style="light"/> 
               <View style={styles.topbar}>
                    
                    <Text style={styles.text1}>
                        <Text style={styles.text2}>
                        M
                        </Text>
                        <Text style={styles.text3}>
                            ovie  
                        </Text>World 
                    </Text>
                   
                    
                    <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                       <MagnifyingGlassIcon size="30" strokeWidth={2} color="black"/>
                    </TouchableOpacity>
               </View>
            </SafeAreaView>

            {
                loading?(
                    <Loading/>
                ):(
                    <ScrollView 
                    showVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom:10}}>
                    
                        {featured.length>0 && <FeaturedMovies data={featured}/>}
        
                        <MovieCard title="Coming Soon" data={comingSoon}/>
        
                        <MovieCard title="Highest Rated" data={highestRated}/>

                    </ScrollView>

                )
            }


          
        </View>
    )
}
const styles = StyleSheet.create({
    background: {flex: 1, backgroundColor:"orange"},
    topbar:{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 4},
    text1:{color: 'white',fontSize: 26,fontWeight: 'bold',padding:10},
    text2:{color:"red"},
    text3:{color:"black"},
    safeArea:{marginBottom:20}
   
   
  });