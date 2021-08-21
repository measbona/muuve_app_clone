// import firebase from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default class DynamicLinks {
  /**
   *
   * built dynamic link
   * @param {*} deepLink
   * @param {*} title - social title
   * @param {*} description - social description
   *
   */
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

  /**
   *
   * built dynamic link
   * @param {*} deepLink
   * @param {*} title - social title
   * @param {*} description - social description
   *
   */
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
      console.tron.log({url});
      return url;
    } catch (error) {
      return null;
    }
  };

  /**
   *
   * Retrieve initial link when app launched
   *
   */
  static getInitialLink = async () => {
    try {
      const initialLink = await dynamicLinks().getInitialLink();

      return initialLink && initialLink.url;
    } catch (error) {
      return null;
    }
  };

  /**
   *
   * Subscribe to Dynamic Link open events while the app is still running.
   *
   */
  static onLink = (callback) =>
    dynamicLinks().onLink((link) => link && link.url && callback(link.url));
}
