import React from 'react';
import {ActivityIndicator, Text, TouchableHighlight, View} from 'react-native';
import Modal from 'react-native-modal/dist/modal';

import {styles} from './DeleteModal.styles';

const DeleteModal = ({modalVisible, setModalVisible, onDeleteProduct, isDeletingProduct}): JSX.Element => {
  return (
    <View>
      <Modal isVisible={modalVisible} animationIn={'fadeIn'} animationOut={'lightSpeedOut'}>
        <View style={[styles.mainContainer]}>
          {/* TITLE */}
          <Text style={[styles.title]}>Biztosan törli a terméket?</Text>

          <View style={[styles.buttonContainer]}>
            {/* CANCEL BUTTON */}
            <TouchableHighlight
              disabled={isDeletingProduct}
              style={[styles.button, isDeletingProduct ? styles.cancelButtonDisabled : styles.cancelButtonActive]}
              underlayColor={'#c0c0c0'}
              onPress={() => setModalVisible(false)}>
              <Text style={[styles.buttonText]}>Mégse</Text>
            </TouchableHighlight>

            {/* CONFIRM BUTTON */}
            <TouchableHighlight
              disabled={isDeletingProduct}
              style={[styles.button, isDeletingProduct ? styles.confirmButtonDisabled : styles.confirmButtonActive]}
              underlayColor={'#d99191'}
              onPress={onDeleteProduct}>
              <Text style={[styles.confirmButtonMainText]}>
                {isDeletingProduct ? (
                  <View style={[styles.confirmButtonInnerContainer]}>
                    <ActivityIndicator size="small" color="white" style={[styles.spinner]} />
                    <Text style={[styles.buttonText]}>Törlés...</Text>
                  </View>
                ) : (
                  <Text style={[styles.buttonText]}>Törlés</Text>
                )}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteModal;
