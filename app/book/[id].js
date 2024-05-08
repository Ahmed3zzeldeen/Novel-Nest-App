import ROUTES from "@/constants/routes";
import { BookScreen } from "@/screens";
import { Stack , useRouter } from "expo-router";
import { View , StyleSheet , ImageBackground , Image , Pressable , Text} from "react-native";
import COLORS from "@/constants/colors";
import { CartIconCounter } from "@/components";


export default function Page() {

  const router = useRouter();

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
                      source={require('../../assets/images/icons/profile.png')}
                      style={{width: 40 , height: 40}}
                  />
              </Pressable>
            </View>
          )
        }}
      />
      <BookScreen/>
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
