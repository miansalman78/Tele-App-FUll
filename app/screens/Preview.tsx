import { moderateScale } from '@/utils/scaling';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getResponsiveFontSize, getResponsiveSpacing } from '../../utils/enhancedResponsive';
import styles from './EditVideo.styles';
import AwsUploadToaster from '../components/VideoEditor/AwsUploadToaster';
import useAwsUpload from '../hooks/useAwsUpload';
import AppConfigManager, { AppConfig } from '../../config/appConfig';
import AWSS3Service from '../../utils/awsS3Service';

export default function Preview() {
  const router = useRouter();
  const route = useRoute();
  const params = route.params as { videoUri?: string } | undefined;
  const videoUri = params?.videoUri;

  const player = useVideoPlayer(videoUri || '');

  const [flaggedForUpload, setFlaggedForUpload] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'pending' | 'uploading' | 'completed' | 'failed'>('pending');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [lastUploadedUrl, setLastUploadedUrl] = useState<string | null>(null);
  const [showUploadToaster, setShowUploadToaster] = useState(false);
  const [config, setConfig] = useState<AppConfig>(AppConfigManager.getConfig());

  const { toggleUploadFlag, performAwsUpload } = useAwsUpload({
    videoUri,
    flaggedForUpload,
    setFlaggedForUpload,
    uploadStatus,
    setUploadStatus,
    uploadProgress,
    setUploadProgress,
    lastUploadedUrl,
    setLastUploadedUrl,
    videoMetadata: undefined,
  });

  const handleFeatureToggle = async (feature: keyof AppConfig['features'], value: boolean) => {
    await AppConfigManager.updateFeatureFlags({ [feature]: value } as any);
    setConfig(AppConfigManager.getConfig());
  };

  useEffect(() => {
    (async () => {
      try {
        await AWSS3Service.initializeTestMode();
        await AppConfigManager.loadConfig();
      } catch (error) {
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={Platform.OS === 'ios' ? getResponsiveFontSize(22, { minSize: 20, maxSize: 26 }) : 24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preview</Text>
          <View style={styles.headerActions}>
            {videoUri && (
              <TouchableOpacity style={styles.headerIcon} onPress={() => setShowUploadToaster(true)}>
                <MaterialIcons name="cloud-upload" size={Platform.OS === 'ios' ? getResponsiveFontSize(22, { minSize: 20, maxSize: 26 }) : 24} color="#259B9A" />
              </TouchableOpacity>
            )}
            {videoUri && (
              <TouchableOpacity style={styles.headerIcon} onPress={() => router.replace('/') }>
                <MaterialIcons name="check" size={Platform.OS === 'ios' ? getResponsiveFontSize(22, { minSize: 20, maxSize: 26 }) : 24} color="#4CAF50" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.headerLine} />
        </View>

        <View style={styles.videoContainer}>
          {videoUri && player ? (
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
              nativeControls
            />
          ) : (
            <View style={styles.videoPlaceholder}>
              <MaterialIcons name="videocam-off" size={Platform.OS === 'ios' ? getResponsiveFontSize(44, { minSize: 40, maxSize: 52 }) : 48} color="rgba(255, 255, 255, 0.5)" />
              <Text style={styles.noVideoText}>No video available</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { marginTop: getResponsiveSpacing(20) }]}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.saveButtonText}>Done</Text>
        </TouchableOpacity>

        <AwsUploadToaster
          visible={showUploadToaster}
          onClose={() => setShowUploadToaster(false)}
          styles={styles}
          config={config}
          flaggedForUpload={flaggedForUpload}
          toggleUploadFlag={toggleUploadFlag}
          uploadStatus={uploadStatus}
          uploadProgress={uploadProgress}
          performAwsUpload={performAwsUpload}
          handleFeatureToggle={(feature, value) => handleFeatureToggle(feature as any, value)}
        />
      </View>
    </SafeAreaView>
  );
}