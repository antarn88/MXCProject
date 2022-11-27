import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  button: {
    padding: 7,
    width: '45%',
    borderRadius: 5,
  },
  cancelButtonActive: {
    backgroundColor: 'gray',
  },
  cancelButtonDisabled: {
    backgroundColor: '#c0c0c0',
  },
  confirmButtonActive: {
    backgroundColor: '#B22222',
  },
  confirmButtonDisabled: {
    backgroundColor: '#d99191',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  spinner: {
    marginRight: 5,
  },
  confirmButtonMainText: {
    textAlign: 'center',
  },
  confirmButtonInnerContainer: {
    flexDirection: 'row',
  },
});
