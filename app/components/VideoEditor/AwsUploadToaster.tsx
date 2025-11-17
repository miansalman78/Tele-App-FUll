import React from 'react';
import { Modal, Platform, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getResponsiveFontSize } from '../../../utils/enhancedResponsive';

type UploadStatus = 'pending' | 'uploading' | 'completed' | 'failed';

export default function AwsUploadToaster(props: {
  visible: boolean;
  onClose: () => void;
  styles: any;
  config: any;
  flaggedForUpload: boolean;
  toggleUploadFlag: () => void;
  uploadStatus: UploadStatus;
  uploadProgress: number;
  performAwsUpload: () => void;
  handleFeatureToggle: (feature: string, value: boolean) => void;
}) {
  const getStatusColor = () => {
    switch (props.uploadStatus) {
      case 'pending': return '#ffa500';
      case 'uploading': return '#259B9A';
      case 'completed': return '#4CAF50';
      case 'failed': return '#F44336';
      default: return '#767577';
    }
  };

  const getStatusText = () => {
    switch (props.uploadStatus) {
      case 'pending': return 'Pending';
      case 'uploading': return 'Uploading...';
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <View style={props.styles.toasterOverlay}>
        <View style={props.styles.toasterContent}>
          <View style={props.styles.toasterHeader}>
            <Text style={props.styles.toasterTitle}>AWS Upload Settings</Text>
            <TouchableOpacity onPress={props.onClose}>
              <MaterialIcons name="close" size={Platform.OS === 'ios' ? getResponsiveFontSize(22, { minSize: 20, maxSize: 26 }) : 24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={props.styles.toasterBody} 
            contentContainerStyle={props.styles.toasterBodyContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={props.styles.uploadSection}>
              <Text style={props.styles.sectionTitle}>Upload Control</Text>

              <View style={props.styles.uploadRow}>
                <Text style={props.styles.uploadLabel}>Enable AWS Upload:</Text>
                <Switch
                  value={props.config.features.enableAwsUpload}
                  onValueChange={(value) => props.handleFeatureToggle('enableAwsUpload', value)}
                  trackColor={{ false: '#767577', true: '#259B9A' }}
                  thumbColor={props.config.features.enableAwsUpload ? '#f4f3f4' : '#f4f3f4'}
                />
              </View>

              <View style={props.styles.uploadRow}>
                <Text style={props.styles.uploadLabel}>Flag for AWS Upload:</Text>
                <Switch
                  value={props.flaggedForUpload}
                  onValueChange={props.toggleUploadFlag}
                  trackColor={{ false: '#767577', true: '#259B9A' }}
                  thumbColor={props.flaggedForUpload ? '#f4f3f4' : '#f4f3f4'}
                />
              </View>

              <View style={props.styles.uploadStatusRow}>
                <Text style={props.styles.uploadLabel}>Upload Status:</Text>
                <View style={props.styles.statusContainer}>
                  <View style={[props.styles.statusDot, { backgroundColor: getStatusColor() }]} />
                  <Text style={props.styles.statusText}>{getStatusText()}</Text>
                </View>
              </View>

              {props.flaggedForUpload && props.uploadStatus === 'pending' && (
                <TouchableOpacity 
                  style={props.styles.uploadButton} 
                  onPress={() => {
                    props.performAwsUpload();
                  }}
                >
                  <MaterialIcons name="cloud-upload" size={Platform.OS === 'ios' ? getResponsiveFontSize(18, { minSize: 16, maxSize: 22 }) : 20} color="white" />
                  <Text style={props.styles.uploadButtonText}>Upload to AWS</Text>
                </TouchableOpacity>
              )}

              {props.uploadStatus === 'uploading' && (
                <View style={props.styles.uploadingContainer}>
                  <View style={props.styles.uploadingHeader}>
                    <MaterialIcons name="cloud-upload" size={Platform.OS === 'ios' ? getResponsiveFontSize(18, { minSize: 16, maxSize: 22 }) : 20} color="#259B9A" />
                    <Text style={props.styles.uploadingText}>Uploading... {props.uploadProgress.toFixed(1)}%</Text>
                  </View>
                  <View style={props.styles.progressBarContainer}>
                    <View style={[props.styles.progressBar, { width: `${Math.max(props.uploadProgress, 2)}%` }]} />
                  </View>
                </View>
              )}

              {props.uploadStatus === 'completed' && (
                <View style={props.styles.completedContainer}>
                  <MaterialIcons name="check-circle" size={Platform.OS === 'ios' ? getResponsiveFontSize(18, { minSize: 16, maxSize: 22 }) : 20} color="#4CAF50" />
                  <Text style={props.styles.completedText}>Upload Completed!</Text>
                </View>
              )}

              {props.uploadStatus === 'failed' && (
                <View style={props.styles.failedContainer}>
                  <MaterialIcons name="error" size={Platform.OS === 'ios' ? getResponsiveFontSize(18, { minSize: 16, maxSize: 22 }) : 20} color="#F44336" />
                  <Text style={props.styles.failedText}>Upload Failed</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}