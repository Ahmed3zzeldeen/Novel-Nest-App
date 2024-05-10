import EditUserScreen from "@/screens/Dashboard/EditUserScreen";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Text } from "react-native";

export default function Page() {
  const { id } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => {
            return (
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                Edit User
              </Text>
            );
          },
          presentation: "modal",
        }}
      />
      <EditUserScreen userId={id} />

    </>
  );
}
