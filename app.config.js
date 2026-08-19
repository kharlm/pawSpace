export default {
  expo: {
    name: 'pawSpace',
    slug: 'pawSpace',
    privacy: 'unlisted',
    version: '6.5.1',
    orientation: 'portrait',
    icon: './assets/paws.png',
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    plugins: [
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
        // Fill in via `eas init` once logged into the pawSpace EAS account.
        projectId: undefined,
      },
    },
  },
};
