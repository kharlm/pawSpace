export default {
  expo: {
    name: 'pawSpace',
    slug: 'pawSpace',
    owner: 'kharlm',
    privacy: 'unlisted',
    version: '6.5.1',
    orientation: 'portrait',
    icon: './assets/paws.png',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    plugins: [
      'expo-asset',
      'expo-font',
      'expo-video',
      'expo-audio',
      [
        'expo-splash-screen',
        {
          image: './assets/splash.png',
          resizeMode: 'cover',
          backgroundColor: '#ffffff',
        },
      ],
    ],
    ios: {
      bundleIdentifier: 'com.kharlmccatty.pawSpace',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        NSLocationWhenInUseUsageDescription:
          'Allow pawSpace to use your location in order to find other dogs in your area, view local dog parks and businesses in your area, and add location to photos uploaded',
        NSPhotoLibraryUsageDescription:
          'Allow pawSpace to access your photo library so that you can upload your dog pictures',
      },
    },
    android: {
      package: 'com.kharlmccatty.pawSpace',
    },
    extra: {
      eas: {
        projectId: '8453032c-3493-4e87-904c-dda6b9a6d1aa',
      },
    },
  },
};
