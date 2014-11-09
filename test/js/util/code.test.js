describe('util.add', function () {
    'use strict';

    var add = window.add;

    it('should sum', function () {
        expect(add(2, 3)).toBe(5);
    });

});
