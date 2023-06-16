import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, TouchableOpacity, View, Text, SafeAreaView  } from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import axios from 'axios'

import { ScreenHeaderBtn } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import styles from '../../styles/search'

const ImageSearch = () => {
    const params = useSearchParams();
    const router = useRouter();

    const [images, setImages] = useState([]);
    const [searchLoader, setSearchLoader] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const handleSearch = async () => {
        setSearchLoader(true);

        try {
            const response = await axios.get('https://images-api.nasa.gov/search', {
                params: {
                    q: params.id,
                    media_type: 'image'
                }
            });

            const collection = response.data.collection;
            const items = collection.items.slice(0, 100); // Limiting to 100 images for display
      
            setImages(items);
        } catch (error) {
            setSearchError(error);
            console.error('Error occurred while searching for images:', error.message);

        } finally {
            setSearchLoader(false);
        }
    };

    const renderImageItem = ({ item }) => (

            <TouchableOpacity style={styles.cardContainer} onPress={() => handleCardPress(item)}>
                <Image source={{ uri: item.links[0].href }} style={styles.image} />
                <Text style={styles.title}>{item.data[0].title}</Text>
            </TouchableOpacity>
      );
    
    const handleCardPress = (item) => {
        router.push({
            pathname: `/image-details/${item.data[0].nasa_id}`,
             params: {
                img: item.links[0].href,
                title: item.data[0].title,
                desc: item.data[0].description,
                date: item.data[0].date_created
            }
        });
    };
      

    useEffect(() => {
        handleSearch()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: params.id,
                    headerTitleStyle: styles.searchTitle,
                    headerTitleAlign: 'center'
                    
                }}
            />

            <FlatList
                data={images}
                keyExtractor={item => item.data[0].nasa_id}
                renderItem={renderImageItem}
                contentContainerStyle={{ 
                    padding: SIZES.medium,
                    rowGap: SIZES.medium,
                    flexGrow: 1,
                    justifyContent: 'center' }}
                ListHeaderComponent={() => (
                    <>
                        <View style={styles.loaderContainer}>
                            {searchLoader ? (
                                <ActivityIndicator size='large' color={COLORS.primary} />
                            ) : searchError && (
                                <Text>Oops something went wrong</Text>
                            )}
                        </View>
                    </>
                )}
            />
        </SafeAreaView>
    )
}

export default ImageSearch