import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

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
            <Text style={styles.modalText}>Biztosan törlöd a terméket?</Text>

            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Mégse</Text>
            </Pressable>

            <Pressable style={[styles.button, styles.buttonClose]} onPress={onDeleteProduct}>
              {!isDeletingProduct ? <Text style={styles.textStyle}>Igen</Text> : <Text style={styles.textStyle}>Törlés...</Text>}
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteModal;
