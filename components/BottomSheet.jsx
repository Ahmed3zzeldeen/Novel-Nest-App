import {View , Text , StyleSheet , Pressable} from 'react-native';4
import { useState } from 'react';
import COLORS from '@/constants/colors';
import {CustomTextInput , CustomPopup, CustomButton} from '@/components';

const BottomSheet = ({ modalVisibility }) => {
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [username , setUsername] = useState('');
  const [cancelPopup , setCancelPopup] = useState(false);
  const [savePopup , setSavePopup] = useState(false);

  const handlePressCancelButton1 = () => {
    setCancelPopup(false);
  };
  
  const handlePressCancelButton2 = () => {
    setCancelPopup(false);
    modalVisibility(false);
  };

  const handlePressSaveButton1 = () => {
    setSavePopup(false);
  };
  
  const handlePressSaveButton2 = () => {
    setSavePopup(false);
    modalVisibility(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomSheet}>
        <View style={styles.inputs}>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>First Name:</Text>
            <CustomTextInput 
              placeholder={'Robert'}
              value={firstName}
              onChangeText={(value) => setFirstName(value)}
              InputStyle={styles.inputSheet}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Last Name:</Text>
            <CustomTextInput 
              placeholder={'Martin'}
              value={lastName}
              onChangeText={(value) => setLastName(value)}
              InputStyle={styles.inputSheet}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Username:</Text>
            <CustomTextInput 
              placeholder={'RobertMartin123'}
              value={username}
              onChangeText={(value) => setUsername(value)}
              InputStyle={styles.inputSheet}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <CustomButton
            buttonStyle={styles.button}
            functionality={() => setCancelPopup(true)}
            textButton={'Cancel'}
            textButtonStyle={styles.textButton}
          />
          <CustomButton
            buttonStyle={styles.button}
            functionality={() => setSavePopup(true)}
            textButton={'Save'}
            textButtonStyle={styles.textButton}
          />
        </View>
      {cancelPopup && <CustomPopup
        title={'Cancel Confirmation'}
        message={'Are you sure you want to Cancel?'}
        button1Style={styles.button1}
        button2Style={styles.button2}
        textButton1={'No'}
        textButton2={'Yes'}
        button1Function={handlePressCancelButton1}
        button2Function={handlePressCancelButton2}
      />}
      {savePopup && <CustomPopup
        title={'Edit Confirmation'}
        message={'Are you sure you want to Save?'}
        button1Style={styles.button1}
        button2Style={styles.button2}
        textButton1={'No'}
        textButton2={'Yes'}
        button1Function={handlePressSaveButton1}
        button2Function={handlePressSaveButton2}
      />}
      </View>
    </View>
  );
}

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: -280,
    left: 0,
    backgroundColor: 'rgba(0 , 0 , 0 , 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: 400,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    justifyContent: 'space-between'
  },
  inputSheet: {
    marginHorizontal: '10%',
    marginTop: -25,
    color: COLORS.primary,
  },
  inputLabel: {
    color: COLORS.white,
    marginHorizontal: '10%',
    fontWeight: '700',
    fontSize: 20
  },
  inputBox: {
    justifyContent: 'space-around',
    marginTop: '5%'
  },
  inputs:{ 
    marginTop: '3%'
  },
  buttons: {
    flexDirection: 'row', 
    marginHorizontal: '10%',
    justifyContent: 'space-between',
    marginBottom: '10%'
  },
  button: {
    backgroundColor: COLORS.secondary,
    width: 113,
    height: 34,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 18
  },
  button1: {
    width: 83,
    height: 34,
  },
  button2: {
    width: 83,
    height: 34,
  }
});