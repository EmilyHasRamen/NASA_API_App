import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";

import axios from 'axios';
import { ScreenHeaderBtn } from '../../components'
import { COLORS, icons, } from '../../constants'
import styles from '../../styles/details'

const ImgDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { img, title, desc, date } = params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: "",
        }}
      />
      <>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.container}>
          <Text style={styles.headText}>{title}</Text>
          <Text style={styles.dateText}>{date}</Text>
          <View style={styles.contentBox}>
            <Text style={styles.contextText}>{desc}</Text>
          </View>
        </View>
        </ScrollView>
      </>
    </SafeAreaView>
    
  )
}

export default ImgDetails