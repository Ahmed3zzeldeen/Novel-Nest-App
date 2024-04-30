import { StyleSheet, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import COLORS from "@/constants/colors";

export default function CustomLink({ href, text , style}) {
  return (
    <Link href={href} style={{...styles.LinkStyle,...style}}>
      <Text style={{...styles.Text , ...style }}>{text}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  LinkStyle: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 10,
    alignSelf: "center",
  },
  Text: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
