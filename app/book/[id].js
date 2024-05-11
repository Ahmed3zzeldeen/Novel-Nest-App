import ROUTES from "@/constants/routes";
import { BookScreen } from "@/screens";
import { Stack , useRouter , useLocalSearchParams} from "expo-router";
import { View , StyleSheet , Image , Pressable } from "react-native";
import COLORS from "@/constants/colors";
import { CartIconCounter } from "@/components";
import { useState , useLayoutEffect } from "react";
import { findBookById } from "@/firebase/apis/books";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Page() {

  const [user , setUser] = useState({
    avatar: '',
  });

  const router = useRouter();
  const { id } = useLocalSearchParams();
  

  const fetchCurrentUser = async () => {
    const userData = await AsyncStorage.getItem('user');
    const userObj = JSON.parse(userData);
    setUser(userObj);
  }

  useLayoutEffect(() => {
    fetchCurrentUser();
  } , [])

  return (
    <>
      <Stack.Screen
        options={{ 
          headerTitle: "Book", 
          presentation: "modal",
          headerRight: () => (
            <View  style={styles.rightHeader}>
              <CartIconCounter
                counterBoxStyle={{backgroundColor: COLORS.secondary}}
                counterTextStyle={{color: COLORS.primary}}
              />
              <Pressable onPress={() => router.navigate(ROUTES.PUBLIC.EDIT_PROFILE)}>
                  <Image 
                      source={user.avatar ? {uri: user.avatar} : require('../../assets/images/icons/profile.png')}
                      style={{width: 40 , height: 40 , borderRadius: 50}}
                  />
              </Pressable>
            </View>
          )
        }}
      />
      <BookScreen id={id}/>
    </>
  );
};

const styles = StyleSheet.create({
  counterText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700'
  },
  counter: {
    width: 21.43,
    height: 21.43,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    right: 25,
    bottom: 20
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20
  },
});
