import COLORS from '@/constants/colors';
import {View , Text, StyleSheet, ImageBackground, Pressable , Image} from 'react-native';

const BestSellerCard = ({ image }) =>{ 
  
  return (
    <Pressable>
      <ImageBackground 
        style={styles.container}
        source={image}
        imageStyle={{
          borderRadius: 13.8,
        }}
      >
      
      </ImageBackground>
    </Pressable>
  );
}

export default BestSellerCard;

const styles = StyleSheet.create({
  container: {
    width: 125,
    height: 180,
    marginRight: 5
  },
  cartButton: {
    backgroundColor: COLORS.primary
  }
});