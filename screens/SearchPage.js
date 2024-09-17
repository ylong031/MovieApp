import React from 'react';
import { Text, View,Dimensions,TextInput,Image, TouchableOpacity,ScrollView, TouchableWithoutFeedback } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from "react-native-safe-area-context";
import {useNavigation} from '@react-navigation/native'
import { useState,useCallback } from 'react';
const {width,height}=Dimensions.get('window');
import Loading from "../components/loading.js";
import { searchMovies,image185 } from '../api/moviedatabase.js';
import debounce from 'lodash.debounce';


export default function SearchPage() {
    const navigation=useNavigation();
    const [results,setResults]=useState([]);
    const [loading,setLoading]=useState(false);

  
    const handleSearch=value=>{
        if(value && value.length>2){
            setLoading(true);
            searchMovies({
                query: value,
                include_adult:'false',
                language:'en-US',
                page:'1'
            }).then(data=>{
                setLoading(false)
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce=useCallback(debounce(handleSearch,400),[])

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: 'orange'}}>
        <View style={{marginHorizontal: 4,marginBottom: 3,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',borderWidth: 1,borderColor: '#888', borderRadius: 999,padding: 10}}>
            <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search Movie"    
                placeholderTextColor={'lightgray'}
                style={{ paddingBottom: 1, paddingLeft: 6, flex: 1, fontSize: 16, fontWeight: 'bold', color: 'white', letterSpacing: 1 }}
            />
            <TouchableOpacity
                onPress={()=>navigation.navigate("Home")}
                style={{ borderRadius: 20, margin: 2, backgroundColor: '#ccc' }}
            >
                <XMarkIcon size="25" color="white"/>
            </TouchableOpacity>
        </View>
        {
            loading?(
                <Loading/>
            ):
            
                results.length>0?(
                    <ScrollView
                    showVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:15}}
                    style={{marginTop:8}}
                 >
                     <Text style={{ color: 'white', fontWeight: 'bold', margin: 10 }}>Results ({results.length})</Text>
                     
                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap',margin:5 }}>
                         {
                             results.map((item,index)=>{
                                 return(
                                     <TouchableWithoutFeedback
                                     key={index}
                                     onPress={()=>navigation.push("Movie",item)}>
                                     
                                     <View style={{ marginBottom: 4, marginTop: 3 }}>
                                         <Image 
                                            source={{uri:image185(item?.poster_path)}}
                                             style={{width:width*0.42,height:height*0.3,borderRadius:30}}
                                         />
                                         <Text style={{ marginLeft: 7, color: '#ccc' }}>
                                         {
                                             item?.title.length>22? item?.title.slice(0,22)+'...':item?.title
                                         }
                                         </Text>
                                     </View>
                             
                                        
                                    </TouchableWithoutFeedback>
         
                                 )
                             })
                         }    
                     </View> 
                 </ScrollView>
                ):(
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/icon.png')}
                                style={{ height: 96, width: 96 }}
                        />
                    </View>
                )
            
            
        }
       



      
    </SafeAreaView>
  );
}