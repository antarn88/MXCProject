import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tableContentContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    overflow: 'scroll',
  },
  rowCell: {
    borderRightWidth: 1,
    padding: 10,
    borderColor: '#DCDCDC',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  productNameCell: {
    width: 135,
  },
  productNumberCell: {
    width: 95,
  },
  priceCell: {
    width: 70,
  },
  createdAtCell: {
    width: 110,
  },
  deleteCell: {
    width: 90,
  },
  clickProduct: {
    backgroundColor: 'white',
  },
});
