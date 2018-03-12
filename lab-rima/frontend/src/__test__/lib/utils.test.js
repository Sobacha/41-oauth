'use strict';

const utils = require('../../lib/utils');
import Landing from '../../component/landing';

describe('utils module', () => {
  describe('renderIf funciton', () => {
    test('should return component if test is passed', () => {
      const test = true;
      const component = Landing;
      expect(utils.renderIf(test, component)).toBe(component);
    });
    test('should return undefined if test is not passed', () => {
      const test = false;
      const component = Landing;
      expect(utils.renderIf(test, component)).toBe(undefined);
    });
  });
});
