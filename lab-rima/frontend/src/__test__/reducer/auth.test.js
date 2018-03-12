import reducer from '../../reducer/auth';


describe('Auth reducer', () => {

  describe('default action', () => {
    test('should return an initial state', () => {
      expect(reducer(undefined, {})).toEqual(null);
    });
  });

  describe('set action', () => {
    describe('Valid input', () => {
      test('should return token', () => {
        const mockToken = {token: 'token'};
        expect(reducer([], {type: 'TOKEN_SET', payload: mockToken})).toEqual(mockToken);
      });
    });
  });

  describe('delete action', () => {
    describe('Vaid input', () => {
      test('should return null', () => {
        const mockToken = {token: 'token'};
        expect(reducer([], {type: 'TOKEN_DELETE', payload: mockToken})).toBeNull();
      });
    });
  });
});
