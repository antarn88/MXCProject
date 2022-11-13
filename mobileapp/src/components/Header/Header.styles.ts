import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    fontWeight: 'bold',
    height: 80,
  },
  rightSideContainer: {
    flexDirection: 'row',
  },
  labels: {
    marginRight: 6,
    justifyContent: 'center',
  },
  image: {
    borderRadius: 30,
  },
  emailLabel: {
    fontWeight: '900',
    fontSize: 14,
  },
  logoutLabel: {
    textAlign: 'right',
    fontSize: 14,
  },
});
