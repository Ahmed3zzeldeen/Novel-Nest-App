import COLORS from "@/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable , Text , StyleSheet } from "react-native";

const CustomButton = ({
  buttonStyle,
  textButtonStyle,
  textButton,
  icon,
  iconName,
  iconColor,
  iconSize,
  functionality
}) => { 
  return (
    <Pressable 
      style={{ ...styles.button , ...buttonStyle }}
      onPress={functionality ? () => functionality() : () => {}}
    >
      <Text style={{ ...styles.text , ...textButtonStyle }}>{textButton? textButton: 'Button'}</Text>
      {icon && <FontAwesome
        name={iconName}
        color={iconColor}
        size={iconSize}
      />}
    </Pressable>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: 113,
    height: 34,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: '700',
    fontSize: 18
  }
})