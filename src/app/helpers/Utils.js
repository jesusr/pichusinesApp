export default class Utils {
  static isMobile() {
    const breakpoints = {
        breakpoints: {
          maxTablet: '720px'
        }
      },
      widgetWidth = this.$el.width();
    let maxMobilePx = 767;

    if (breakpoints.tablet) {
      maxMobilePx = breakpoints.tablet.replace('px', '');
    } else if (breakpoints.mobile) {
      maxMobilePx = breakpoints.mobile.replace('px', '');
    }

    return widgetWidth <= maxMobilePx;
  }
}
