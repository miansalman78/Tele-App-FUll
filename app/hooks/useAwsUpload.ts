import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import AWSS3Service from '../../utils/awsS3Service';

type UploadStatus = 'pending' | 'uploading' | 'completed' | 'failed';

export default function useAwsUpload(opts: {
  videoUri?: string;
  flaggedForUpload: boolean;
  setFlaggedForUpload: (v: boolean) => void;
  uploadStatus: UploadStatus;
  setUploadStatus: (s: UploadStatus) => void;
  uploadProgress: number;
  setUploadProgress: (n: number) => void;
  lastUploadedUrl: string | null;
  setLastUploadedUrl: (u: string | null) => void;
  videoMetadata: any;
}) {
  const toggleUploadFlag = useCallback(async () => {
    try {
      const savedVideos = await AsyncStorage.getItem('saved_videos');
      let videos = savedVideos ? JSON.parse(savedVideos) : [];
      const videoIndex = videos.findIndex((video: any) => video.uri === opts.videoUri);
      if (videoIndex !== -1) {
        videos[videoIndex] = { ...videos[videoIndex], flaggedForUpload: !opts.flaggedForUpload };
      } else {
        const tempVideo = {
          id: `temp_${Date.now()}`,
          uri: opts.videoUri,
          mode: 'uploaded',
          createdAt: new Date().toISOString(),
          flaggedForUpload: !opts.flaggedForUpload,
          uploaded: false,
          title: 'Uploaded Video',
          duration: opts.videoMetadata?.duration || 0,
          fileSize: 0
        };
        videos.unshift(tempVideo);
      }
      await AsyncStorage.setItem('saved_videos', JSON.stringify(videos));
      opts.setFlaggedForUpload(!opts.flaggedForUpload);
    } catch (error) {
    }
  }, [opts.videoUri, opts.flaggedForUpload, opts.videoMetadata]);

  const performAwsUpload = useCallback(async () => {
    if (!opts.flaggedForUpload || !opts.videoUri) {
      return;
    }
    const videoId = Date.now().toString();
    const fileName = `video-${videoId}.mp4`;
    try {
      opts.setUploadStatus('uploading');
      opts.setUploadProgress(0);
      opts.setLastUploadedUrl(null);
      await AWSS3Service.updateVideoUploadStatus(videoId, 'uploading');
      let presignedUrl: string;
      try {
        presignedUrl = await AWSS3Service.getPresignedUrlFromBackend(fileName, 'video/mp4');
      } catch (backendError) {
        const errorMessage = backendError instanceof Error ? backendError.message : 'Unknown backend error';
        Alert.alert(
          'Upload Unavailable',
          'Could not get an upload URL from the backend service. Please verify the backend is running and reachable.',
          [{ text: 'OK' }]
        );
        opts.setUploadStatus('failed');
        await AWSS3Service.updateVideoUploadStatus(
          videoId,
          'failed',
          undefined,
          undefined,
          errorMessage || 'Failed to get presigned URL'
        );
        return;
      }
      const uploadResult = await AWSS3Service.uploadVideo(
        opts.videoUri,
        presignedUrl,
        (progress: { percentage: number; loaded: number; total: number }) => {
          opts.setUploadProgress(progress.percentage);
          AWSS3Service.updateVideoUploadStatus(
            videoId,
            'uploading',
            undefined,
            undefined,
            undefined,
            progress.percentage
          );
        }
      );
      if (uploadResult.success) {
        await AWSS3Service.updateVideoUploadStatus(
          videoId,
          'completed',
          uploadResult.key || 'test-key',
          uploadResult.url || presignedUrl.split('?')[0],
          undefined,
          100,
          uploadResult.expiresAt
        );
        opts.setUploadStatus('completed');
        opts.setUploadProgress(100);
        opts.setLastUploadedUrl(uploadResult.url || presignedUrl.split('?')[0]);
        try {
          const savedVideos = await AsyncStorage.getItem('saved_videos');
          if (savedVideos) {
            let videos = JSON.parse(savedVideos);
            const videoIndex = videos.findIndex((v: any) => v.uri === opts.videoUri);
            if (videoIndex !== -1) {
              videos[videoIndex] = {
                ...videos[videoIndex],
                uploaded: true,
                uploadedAt: new Date().toISOString(),
                s3Key: uploadResult.key,
                s3Url: uploadResult.url,
                expiresAt: uploadResult.expiresAt,
                flaggedForUpload: true,
              };
              await AsyncStorage.setItem('saved_videos', JSON.stringify(videos));
            }
          }
        } catch (storageError) {
        }
        Alert.alert(
          'Upload Successful',
          `Video uploaded to AWS S3 successfully!${uploadResult.expiresAt ? `\n\nVideo will expire on: ${new Date(uploadResult.expiresAt).toLocaleString()}` : ''}`,
          [{ text: 'OK' }]
        );
      } else {
        await AWSS3Service.updateVideoUploadStatus(
          videoId,
          'failed',
          undefined,
          undefined,
          uploadResult.error,
          0
        );
        opts.setUploadStatus('failed');
        opts.setUploadProgress(0);
        opts.setLastUploadedUrl(null);
        Alert.alert(
          'Upload Failed',
          `Failed to upload video to AWS S3: ${uploadResult.error}`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      await AWSS3Service.updateVideoUploadStatus(
        videoId,
        'failed',
        undefined,
        undefined,
        errorMessage,
        0
      );
      opts.setUploadStatus('failed');
      opts.setUploadProgress(0);
      opts.setLastUploadedUrl(null);
      Alert.alert(
        'Upload Failed',
        `Failed to upload video to AWS S3: ${errorMessage}`,
        [{ text: 'OK' }]
      );
    }
  }, [opts.flaggedForUpload, opts.videoUri]);

  return { toggleUploadFlag, performAwsUpload };
}