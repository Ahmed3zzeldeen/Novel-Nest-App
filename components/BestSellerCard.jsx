import COLORS from '@/constants/colors';
import {StyleSheet, ImageBackground, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import ROUTES from '@/constants/routes';

const BestSellerCard = ({ cover, numOfPages, price, ISBN, author, bookTitle, rate, category  }) =>{ 
<<<<<<< HEAD
=======
  
  const router = useRouter();

>>>>>>> 7207e716fb13c17ba80a88d2d4783e2831416f46
  return (
    <Pressable onPress={() =>  router.navigate(ROUTES.PUBLIC.BOOK_DETAILS.replace(':id' , ISBN))}>
      <ImageBackground 
        style={styles.container}
        source={cover}
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