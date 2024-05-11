import COLORS from '@/constants/colors';
import { formatData } from '@/utils';
import {Pressable , Text , StyleSheet} from 'react-native';

const OrderCard = ({order}) => {
  return (
    <Pressable style={styles.container}>
      <Text style={[styles.payment , styles.text]}>Total Payment: {order.totalPrice}$</Text>
      <Text style={[styles.date , styles.text]}>Date: {formatData(new Date(order.orderDate?.seconds * 1000)) }</Text>
    </Pressable>
  )
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    backgroundColor: COLORS.secondary,
    borderRadius: 8.14,
    padding: '2%',
    marginBottom: '3%'
  },
  payment: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20
  },
  date: {
    color: COLORS.primary,
    fontWeight: '400',
    fontSize: 18,
    opacity: 0.7
  },
  text: {
    marginHorizontal: '2%'
  }
})