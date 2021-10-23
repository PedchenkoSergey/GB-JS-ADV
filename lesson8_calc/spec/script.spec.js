const {sum, sub, multiple, division} = require('../script');

describe('Функция sum()', () => {
    it('должна возвращать 5 при аргументах (3, 2)', () => {
        expect(sum(3, 2)).toBe(5);
    })

    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(sum(null, 2)).toBeNull();
    })

    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(sum("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(sum("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (true, 2) ',  () => {
        expect(sum(true, 2)).toBeNull();
    });
});

describe('Функция sub()', () => {
    it('должна возвращать 1 при аргументах (3, 2)', () => {
        expect(sub(3, 2)).toBe(1);
    })

    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(sub(null, 2)).toBeNull();
    })

    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(sub("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(sub("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (true, 2) ',  () => {
        expect(sub(true, 2)).toBeNull();
    });
});

describe('Функция multiple()', () => {
    it('должна возвращать 6 при аргументах (3, 2)', () => {
        expect(multiple(3, 2)).toBe(6);
    })

    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(multiple(null, 2)).toBeNull();
    })

    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(multiple("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(multiple("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (true, 2) ',  () => {
        expect(multiple(true, 2)).toBeNull();
    });
});


describe('Функция division()', () => {
    it('должна возвращать 6 при аргументах (3, 2)', () => {
        expect(division(3, 2)).toBe(1.5);
    })

    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(division(null, 2)).toBeNull();
    })

    it('должна возвращать null при аргументах ("string", 2)', () => {
        expect(division("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(division("string", 2)).toBeNull();
    })

    it('должна возвращать null при аргументах (true, 2)', () => {
        expect(division(true, 2)).toBeNull();
    })
});