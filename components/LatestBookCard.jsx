import COLORS from '@/constants/colors';
import {StyleSheet, ImageBackground, Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import ROUTES from '@/constants/routes';

const LatestBookCard = ({ book }) =>{ 
  
  const router = useRouter();

  return (
    <Pressable onPress={() =>  router.navigate(ROUTES.PUBLIC.BOOK_DETAILS.replace(':id' , book.bookId))}>
      <ImageBackground 
        style={styles.container}
        source={{uri: book.cover}}
        imageStyle={{
          borderRadius: 14,
        }}
      >
      </ImageBackground>
    </Pressable>
  );
}

export default LatestBookCard;

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