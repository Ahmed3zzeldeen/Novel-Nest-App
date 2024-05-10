import COLORS from '@/constants/colors';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CustomButton from './CustomButton';

const { width, height } = Dimensions.get('window');
const CustomPopup = ({
  message,
  textButton1,
  textButton2,
  button1Style,
  button2Style,
  button1Function,
  button2Function,
  popupStyle,
  title,
}) => {
  return (
    <View style={{ ...styles.container, ...popupStyle }}>
      <View style={styles.popup}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.popupContent}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttons}>
            <CustomButton
              buttonStyle={{ ...styles.button, ...styles.save, ...button2Style }}
              functionality={button2Function ? () => button2Function() : () => { }}
              textButton={textButton2}
              textButtonStyle={styles.textButton}
            />
            <CustomButton
              buttonStyle={{ ...styles.button, ...styles.cancel, ...button1Style }}
              functionality={button1Function ? () => button1Function() : () => { }}
              textButton={textButton1}
              textButtonStyle={styles.textButton}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomPopup;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0 , 0 , 0 , 0.5)',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red'
  },
  popup: {
    backgroundColor: COLORS.white,
    width: 350,
    height: 175,
    borderRadius: 15,
  },
  popupContent: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: '5%'
  },
  title: {
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    marginTop: '2%',
  },
  message: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20,
    marginHorizontal: '5%',
    marginTop: '1%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%'
  },
  button: {
    width: 113,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  cancel: {
    backgroundColor: COLORS.danger,
  },
  save: {
    backgroundColor: COLORS.success,
  },
  textButton: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 18,
  }
});