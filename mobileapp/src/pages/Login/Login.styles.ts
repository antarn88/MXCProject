import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
  },
  loginButtonContainer: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#4a8ef1',
    height: 40,
    alignContent: 'center',
    borderRadius: 7,
  },
  loginButtonContent: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 15,
  },
  loginButtonDisabled: {
    backgroundColor: '#CECACA',
    height: 40,
    borderRadius: 5,
  },
  loginLabel: {
    color: '#485FFB',
    fontSize: 25,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  spinner: {
    marginRight: 5,
  },
  inputFieldValid: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  inputFieldInvalid: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  warningText: {
    color: 'red',
    fontSize: 13,
  },
  usernameContainer: {
    marginBottom: 14,
  },
});
