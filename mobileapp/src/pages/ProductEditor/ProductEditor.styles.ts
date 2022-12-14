import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
  },
  label: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    paddingBottom: 7,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputFieldBottomMargin: {
    marginBottom: 20,
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 7,
    marginRight: 7,
  },
  cancelButtonDisabled: {
    alignItems: 'center',
    backgroundColor: '#CECACA',
    padding: 10,
    borderRadius: 7,
    marginRight: 7,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 7,
  },
  saveButtonDisabled: {
    alignItems: 'center',
    backgroundColor: '#90cbf9',
    padding: 10,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  innerButtonContainer: {
    width: '50%',
  },
  buttonValidText: {
    color: 'white',
    fontSize: 15,
  },
  spinner: {
    marginRight: 5,
  },
  saveButtonContainer: {
    flexDirection: 'row',
  },
});
