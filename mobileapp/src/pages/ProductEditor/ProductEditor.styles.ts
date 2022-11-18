import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
  },
  label: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    alignContent: 'space-around',
    justifyContent: 'center',
    marginTop: 10,
  },
  container: {
    marginTop: 20,
  },
  editorTitle: {
    fontSize: 30,
    textAlign: 'center',
  },
  inputFieldValid: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginHorizontal: 20,
    borderRadius: 7,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  inputFieldInvalid: {
    borderWidth: 1,
    borderColor: 'red',
    marginHorizontal: 20,
    borderRadius: 7,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  warningText: {
    color: 'red',
    fontSize: 13,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});
