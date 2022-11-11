import React from 'react';
import {ActivityIndicator, Modal, Pressable, Text, View} from 'react-native';

import {styles} from './DeleteModal.styles';

const DeleteModal = ({modalVisible, setModalVisible, onDeleteProduct, isDeletingProduct}): JSX.Element => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Biztosan törli a terméket?</Text>

            <View style={{flexDirection: 'row', minWidth: '80%', justifyContent: 'space-evenly'}}>
              <Pressable
                style={[styles.button, styles.buttonClose, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
                disabled={isDeletingProduct}>
                <Text style={styles.textStyle}>Mégse</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose, styles.confirmButton]}
                onPress={onDeleteProduct}
                disabled={isDeletingProduct}>
                {!isDeletingProduct ? (
                  <Text style={styles.textStyle}>Igen</Text>
                ) : (
                  <View style={[styles.loadingBox]}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={[styles.loadingText]}>Törlés...</Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteModal;
