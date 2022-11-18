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
  loginFormContainer: {
    paddingVertical: 20,
  },
  errorMessageContainer: {
    marginVertical: 10,
    borderWidth: 1,
    backgroundColor: '#C34846',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  errorMessageIcon: {
    color: 'white',
    alignSelf: 'flex-start',
  },
  errorMessageTextContainer: {
    marginLeft: 15,
  },
  errorMessageText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
