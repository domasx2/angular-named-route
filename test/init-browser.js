/**
 * Initializes a broswer with the given url and basePath.
 *
 * Usage:
 *
 *    inject(
 *      initBrowser({ url: 'http://example.org/path/', basePath: '/path' }),
 *      function () {
 *        // test goes here.
 *      }
 *    )
 *
 * Copied From: https://github.com/angular/angular.js/blob/fa79eaa816aa27c6d1b3c084b8372f9c17c8d5a3/test/ng/locationSpec.js#L2630,L2635
 *
 * @param {Object} options  url and basePath
 * @returns {Function}      injectable function.
 */
this.initBrowser = function (options) {
  return function($browser) {
    $browser.url(options.url);
    $browser.$$baseHref = options.basePath;
  };
};
