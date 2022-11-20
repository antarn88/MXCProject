import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    backgroundColor: '#FDF5E6',
  },
  headerCell: {
    borderRightWidth: 1,
    padding: 10,
    borderColor: '#DCDCDC',
    alignItems: 'center',
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
  headerCellContainer: {
    flexDirection: 'row',
  },
  columnText: {
    marginRight: 4,
  },
  columnIcon: {
    marginTop: 1,
  },
});
