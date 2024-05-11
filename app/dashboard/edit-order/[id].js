import ROUTES from "@/constants/routes";
import { BookScreen } from "@/screens";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Text,
} from "react-native";
import EditOrderScreen from "@/screens/Dashboard/EditOrderScreen";

export default function Page() {
  const { id, number } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => {
            return (
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                Order {number}
              </Text>
            );
          },
          presentation: "modal",
        }}
      />
      <EditOrderScreen orderId={id} number={number} />
      
    </>
  );
}
