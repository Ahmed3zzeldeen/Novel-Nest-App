import COLORS from '@/constants/colors';
import {StyleSheet, ImageBackground, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import ROUTES from '@/constants/routes';

const BestSellerCard = ({ book }) =>{ 
  
  const router = useRouter();

  return (
    <Pressable onPress={() =>  router.navigate(ROUTES.PUBLIC.BOOK_DETAILS.replace(':id' , book.ISBN))}>
      <ImageBackground 
        style={styles.container}
        source={book.cover}
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