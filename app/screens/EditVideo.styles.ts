import { StyleSheet, Platform, Dimensions } from 'react-native';
import { moderateScale } from '@/utils/scaling';
import { AppColors } from '../../constants/Colors';
import {
  getDeviceType,
  getResponsiveBorderRadius,
  getResponsiveFontSize,
  getResponsiveLayout,
  getResponsivePadding,
  getResponsiveScale,
  getResponsiveSpacing,
} from '../../utils/enhancedResponsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const device = getDeviceType();
const layout = getResponsiveLayout();

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    width: '100%',
    height: '100%',
  },
  audioEditorContainer: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: moderateScale(8),
    margin: moderateScale(10),
  },
  audioEditorContent: {
    flexGrow: 1,
    paddingBottom: moderateScale(20),
  },
  audioVolumeControl: {
    backgroundColor: 'transparent',
    margin: 0,
  },
  splitTransitionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    margin: moderateScale(10),
    marginBottom: 0,
  },
  splitTransitionText: {
    color: '#FFD700',
    fontSize: moderateScale(14),
    fontWeight: '600',
    flex: 1,
  },
  cancelSplitTransition: {
    padding: moderateScale(4),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: moderateScale(15),
  },
  transitionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: moderateScale(8),
  },
  header: {
    paddingTop:
      Platform.OS === 'ios'
        ? getResponsiveSpacing(device.isTablet ? 18 : 14)
        : getResponsiveSpacing(device.isTablet ? 20 : 15),
    paddingBottom:
      Platform.OS === 'ios'
        ? getResponsiveSpacing(device.isTablet ? 18 : 14)
        : getResponsiveSpacing(device.isTablet ? 20 : 15),
    alignItems: 'center',
    position: 'relative',
    minHeight:
      Platform.OS === 'ios'
        ? device.isTablet
          ? getResponsiveScale(68)
          : getResponsiveScale(58)
        : device.isTablet
        ? getResponsiveScale(70)
        : getResponsiveScale(60),
    paddingHorizontal:
      Platform.OS === 'ios'
        ? getResponsivePadding(device.isTablet ? 22 : 14)
        : getResponsivePadding(device.isTablet ? 24 : 16),
  },
  backButton: {
    position: 'absolute',
    left: getResponsivePadding(device.isTablet ? 24 : 20),
    top: device.isTablet ? getResponsiveSpacing(20) : getResponsiveSpacing(18),
    zIndex: 1,
    padding: getResponsivePadding(device.isTablet ? 12 : 8),
  },
  headerLine: {
    width: device.isTablet ? SCREEN_WIDTH * 0.75 : SCREEN_WIDTH * 0.8,
    height: 1,
    backgroundColor: '#259B9A',
    marginTop: getResponsiveSpacing(device.isTablet ? 18 : 15),
  },
  headerTitle: {
    fontSize: getResponsiveFontSize(device.isTablet ? 28 : 24, { minSize: 20, maxSize: 32 }),
    fontWeight: 'bold',
    color: AppColors.white,
    textAlign: 'center',
  },
  headerActions: {
    position: 'absolute',
    right: getResponsivePadding(device.isTablet ? 24 : 20),
    top: device.isTablet ? getResponsiveSpacing(20) : getResponsiveSpacing(18),
    flexDirection: 'row',
    alignItems: 'center',
    gap: getResponsiveSpacing(device.isTablet ? 18 : 15),
    zIndex: 1,
  },
  headerIcon: {
    width:
      Platform.OS === 'ios'
        ? getResponsiveScale(device.isTablet ? 42 : 38)
        : getResponsiveScale(device.isTablet ? 44 : 40),
    height:
      Platform.OS === 'ios'
        ? getResponsiveScale(device.isTablet ? 42 : 38)
        : getResponsiveScale(device.isTablet ? 44 : 40),
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 22 : 20),
    backgroundColor: 'rgba(37, 155, 154, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Platform.OS === 'ios' ? 1.5 : 1,
    borderColor: '#259B9A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: getResponsiveSpacing(device.isTablet ? 40 : 30),
  },
  videoContainer: {
    alignItems: 'center',
    marginTop:
      Platform.OS === 'ios'
        ? getResponsiveSpacing(device.isTablet ? 26 : 18)
        : getResponsiveSpacing(device.isTablet ? 30 : 20),
    marginBottom:
      Platform.OS === 'ios'
        ? getResponsiveSpacing(device.isTablet ? 34 : 26)
        : getResponsiveSpacing(device.isTablet ? 40 : 30),
    paddingHorizontal:
      Platform.OS === 'ios'
        ? getResponsivePadding(device.isTablet ? 14 : 8)
        : getResponsivePadding(device.isTablet ? 16 : 10),
  },
  video: {
    width: device.isTablet ? (SCREEN_WIDTH <= 540 ? SCREEN_WIDTH * 0.92 : Math.min(SCREEN_WIDTH * 0.85, 800)) : SCREEN_WIDTH * 0.95,
    height: device.isTablet ? Math.min(SCREEN_HEIGHT * 0.55, getResponsiveScale(500)) : Math.min(SCREEN_HEIGHT * 0.5, getResponsiveScale(440)),
    maxHeight: device.isTablet ? getResponsiveScale(550) : getResponsiveScale(500),
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 15 : 10),
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  videoPlaceholder: {
    width: device.isTablet ? Math.min(SCREEN_WIDTH * 0.85, 800) : SCREEN_WIDTH * 0.95,
    height: device.isTablet ? Math.min(SCREEN_HEIGHT * 0.55, getResponsiveScale(500)) : Math.min(SCREEN_HEIGHT * 0.5, getResponsiveScale(440)),
    maxHeight: device.isTablet ? getResponsiveScale(550) : getResponsiveScale(500),
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 15 : 10),
    backgroundColor: '#000',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingVideoText: {
    color: '#259B9A',
    fontSize: getResponsiveFontSize(device.isTablet ? 18 : 16, { minSize: 14, maxSize: 20 }),
    marginTop: getResponsiveSpacing(device.isTablet ? 20 : 15),
    textAlign: 'center',
    fontWeight: '600',
  },
  videoTapArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: getResponsiveScale(device.isTablet ? 75 : 65),
    zIndex: 3,
  },
  customControlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal:
      Platform.OS === 'ios'
        ? getResponsivePadding(device.isTablet ? 18 : 13)
        : getResponsivePadding(device.isTablet ? 20 : 15),
    paddingVertical:
      Platform.OS === 'ios'
        ? getResponsiveSpacing(device.isTablet ? 14 : 10)
        : getResponsiveSpacing(device.isTablet ? 16 : 12),
    zIndex: 10,
    borderTopLeftRadius: Platform.OS === 'ios' ? getResponsiveBorderRadius(device.isTablet ? 12 : 10) : 0,
    borderTopRightRadius: Platform.OS === 'ios' ? getResponsiveBorderRadius(device.isTablet ? 12 : 10) : 0,
  },
  customTimeText: {
    color: '#FFFFFF',
    fontSize: getResponsiveFontSize(device.isTablet ? 16 : 14, { minSize: 12, maxSize: 18 }),
    fontWeight: '600',
    fontFamily: 'monospace',
    marginBottom: getResponsiveSpacing(device.isTablet ? 10 : 8),
  },
  customSeekbarContainer: {
    width: '100%',
    height: getResponsiveScale(device.isTablet ? 35 : 30),
    justifyContent: 'center',
  },
  customSeekbarTrack: {
    width: '100%',
    height: getResponsiveScale(device.isTablet ? 5 : 4),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 3 : 2),
    overflow: 'hidden',
  },
  customSeekbarProgress: {
    height: '100%',
    backgroundColor: '#259B9A',
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 3 : 2),
  },
  customSeekbarThumb: {
    position: 'absolute',
    width: getResponsiveScale(device.isTablet ? 14 : 12),
    height: getResponsiveScale(device.isTablet ? 14 : 12),
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 7 : 6),
    backgroundColor: '#FFFFFF',
    top: '50%',
    marginTop: device.isTablet ? -getResponsiveScale(7) : -getResponsiveScale(6),
    marginLeft: device.isTablet ? -getResponsiveScale(7) : -getResponsiveScale(6),
    borderWidth: device.isTablet ? 2.5 : 2,
    borderColor: '#259B9A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  customSeekbarTouchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  playPauseOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: Platform.OS === 'ios' ? [{ translateX: -23 }, { translateY: -23 }] : [{ translateX: -25 }, { translateY: -25 }],
    width: Platform.OS === 'ios' ? getResponsiveScale(device.isTablet ? 48 : 46) : moderateScale(50),
    height: Platform.OS === 'ios' ? getResponsiveScale(device.isTablet ? 48 : 46) : moderateScale(50),
    borderRadius: Platform.OS === 'ios' ? getResponsiveBorderRadius(device.isTablet ? 24 : 23) : moderateScale(25),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  playControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: getResponsiveSpacing(device.isTablet ? 40 : 30),
  },
  playButton: {
    width: getResponsiveScale(device.isTablet ? 56 : 50),
    height: getResponsiveScale(device.isTablet ? 56 : 50),
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 28 : 25),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: getResponsiveSpacing(device.isTablet ? 18 : 15),
  },
  timeText: {
    color: 'white',
    fontSize: getResponsiveFontSize(device.isTablet ? 18 : 16, { minSize: 14, maxSize: 20 }),
  },
  saveButton: {
    backgroundColor: '#259B9A',
    marginHorizontal: getResponsivePadding(device.isTablet ? 24 : 20),
    paddingVertical: getResponsiveSpacing(device.isTablet ? 20 : 18),
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 14 : 12),
    alignItems: 'center',
    marginBottom: getResponsiveSpacing(device.isTablet ? 40 : 30),
  },
  saveButtonText: {
    color: 'white',
    fontSize: getResponsiveFontSize(device.isTablet ? 18 : 16, { minSize: 14, maxSize: 20 }),
    fontWeight: '600',
  },
  editSection: {
    paddingHorizontal: getResponsivePadding(device.isTablet ? 24 : 20),
    marginTop: getResponsiveSpacing(device.isTablet ? 30 : 20),
  },
  editButtonsContainer: {
    paddingHorizontal: getResponsivePadding(device.isTablet ? 12 : 8),
  },
  editButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: getResponsiveSpacing(device.isTablet ? 14 : 12),
    paddingHorizontal: getResponsivePadding(device.isTablet ? 20 : 16),
    marginHorizontal: getResponsiveSpacing(device.isTablet ? 12 : 8),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 10 : 8),
    minWidth: getResponsiveScale(device.isTablet ? 70 : 62),
  },
  editButtonText: {
    color: 'white',
    fontSize: getResponsiveFontSize(device.isTablet ? 14 : 12, { minSize: 10, maxSize: 16 }),
    marginTop: getResponsiveSpacing(device.isTablet ? 6 : 4),
    textAlign: 'center',
  },
  videoView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    height: '90%',
    marginTop: 50,
  },
  YesNoButton: {
    marginHorizontal: Platform.OS === 'ios' ? getResponsiveSpacing(8) : 10,
    padding: Platform.OS === 'ios' ? getResponsivePadding(8) : 10,
    borderRadius: Platform.OS === 'ios' ? getResponsiveBorderRadius(8) : 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'ios' ? getResponsiveScale(76) : 80,
  },
  buttonText: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? getResponsiveFontSize(16, { minSize: 14, maxSize: 18 }) : 18,
    marginRight: Platform.OS === 'ios' ? getResponsiveSpacing(6) : 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: getResponsivePadding(device.isTablet ? 24 : 20),
  },
  noVideoText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(device.isTablet ? 20 : 18, { minSize: 16, maxSize: 24 }),
    textAlign: 'center',
    marginBottom: getResponsiveSpacing(device.isTablet ? 30 : 20),
  },
  backButtonHome: {
    backgroundColor: '#259B9A',
    paddingHorizontal: getResponsivePadding(device.isTablet ? 30 : 24),
    paddingVertical: getResponsiveSpacing(device.isTablet ? 16 : 14),
    borderRadius: getResponsiveBorderRadius(device.isTablet ? 12 : 10),
    marginTop: getResponsiveSpacing(device.isTablet ? 20 : 15),
  },
  backButtonHomeText: {
    color: '#fff',
    fontSize: getResponsiveFontSize(device.isTablet ? 18 : 16, { minSize: 14, maxSize: 20 }),
    fontWeight: '600',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: Platform.OS === 'ios' ? getResponsivePadding(18) : 20,
    borderRadius: Platform.OS === 'ios' ? getResponsiveBorderRadius(10) : 10,
    alignItems: 'center',
    width: Platform.OS === 'ios' ? getResponsiveScale(device.isTablet ? 320 : 290) : moderateScale(300),
  },
  modalText: {
    fontSize: Platform.OS === 'ios' ? getResponsiveFontSize(15, { minSize: 14, maxSize: 17 }) : 16,
    marginBottom: Platform.OS === 'ios' ? getResponsiveSpacing(18) : 20,
    textAlign: 'center',
  },
  modalUrl: {
    fontSize: Platform.OS === 'ios' ? getResponsiveFontSize(13, { minSize: 12, maxSize: 15 }) : 14,
    color: '#0000EE',
    marginBottom: Platform.OS === 'ios' ? getResponsiveSpacing(18) : 20,
    textAlign: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  uploadSection: {
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
    backgroundColor: 'rgba(37, 155, 154, 0.1)',
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    marginHorizontal: moderateScale(20),
  },
  uploadTitle: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateScale(15),
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  uploadStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(15),
  },
  uploadLabel: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    marginRight: moderateScale(8),
  },
  statusText: {
    color: 'white',
    fontSize: moderateScale(14),
  },
  uploadButton: {
    backgroundColor: '#259B9A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
    marginTop: moderateScale(15),
    marginBottom: moderateScale(10),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  uploadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(12),
    marginTop: moderateScale(10),
  },
  uploadingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(8),
  },
  uploadingText: {
    color: '#259B9A',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  progressBarContainer: {
    width: '100%',
    height: moderateScale(8),
    backgroundColor: 'rgba(37, 155, 154, 0.3)',
    borderRadius: moderateScale(4),
    marginTop: moderateScale(12),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(37, 155, 154, 0.5)',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#259B9A',
    borderRadius: moderateScale(4),
    minWidth: 2,
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(12),
    marginTop: moderateScale(10),
  },
  completedText: {
    color: '#4CAF50',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  failedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(12),
    marginTop: moderateScale(10),
  },
  failedText: {
    color: '#F44336',
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  toasterOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  toasterContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: '80%',
    minHeight: '60%',
  },
  toasterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  toasterTitle: {
    color: 'white',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  toasterBody: {
    flex: 1,
    maxHeight: moderateScale(500),
  },
  toasterBodyContent: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(30),
    flexGrow: 1,
  },
  textOverlay: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  overlayText: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  stickerOverlay: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 4,
  },
  stickerText: {
    textAlign: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  toasterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputGroup: {
    marginBottom: moderateScale(15),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    color: '#ccc',
    marginBottom: moderateScale(5),
    fontWeight: '600',
  },
  inputHelpText: {
    fontSize: moderateScale(12),
    color: '#999',
    marginBottom: moderateScale(8),
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#333',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    color: 'white',
    fontSize: moderateScale(16),
    borderWidth: 1,
    borderColor: '#444',
  },
  warningText: {
    fontSize: moderateScale(12),
    color: '#F44336',
    marginTop: moderateScale(5),
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: 'white',
    marginBottom: moderateScale(15),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  modalTitle: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  closeButton: {
    padding: moderateScale(4),
  },
});
