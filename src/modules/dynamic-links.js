// import firebase from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default class DynamicLinks {
  static buildLink = async ({deepLink, domain, title, description}) => {
    try {
      const url = await dynamicLinks().buildLink({
        link: deepLink,
        domainUriPrefix: domain,
        android: {
          packageName: 'com.muuve.muuveappclone',
        },
        // ios: {
        //   bundleId: 'com.muuve.muuve',
        //   appStoreId: '1414753417',
        // },
        social: {
          title,
          descriptionText: description,
        },
      });

      return url;
    } catch (error) {
      return null;
    }
  };

  static buildShortLink = async ({deepLink, domain, title, description}) => {
    try {
      const url = await dynamicLinks().buildShortLink(
        {
          link: deepLink,
          domainUriPrefix: domain,
          android: {
            packageName: 'com.muuve.muuveappclone',
          },
          // ios: {
          //   bundleId: 'com.muuve.muuveappclone',
          //   appStoreId: '1414753417',
          // },
          social: {
            title,
            descriptionText: description,
          },
        },
        'UNGUESSABLE',
      );

      return url;
    } catch (error) {
      return null;
    }
  };

  static getInitialLink = async () => {
    try {
      const initialLink = await dynamicLinks().getInitialLink();

      return initialLink && initialLink.url;
    } catch (error) {
      return null;
    }
  };

  static onLink = (callback) =>
    dynamicLinks().onLink((link) => link && link.url && callback(link.url));
}
