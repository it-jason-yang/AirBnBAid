const { sequelize } = require('../models');
const {
    callCntUp,
    calcResultType,
} = require('../routes/controllers/legalCheck');

describe('legalCheck callCntUp Test', () => {
    it('callCntUp 함수 호출 시 resultId 파라미터가 없다면, rejects --> callCntUp Error가 발생한다.', async () => {
        await expect(callCntUp()).rejects.toThrow('callCntUp Error');
    });

    // it('callCntUp 함수 호출 시 resultId 파라미터가 있고 정상 처리되면, resolves --> true', async () => {
    //     await expect(callCntUp(1)).resolves.toBe(true);
    // });
});

describe('legalCheck calcResultType Test', () => {
    it('calcResultType 함수 호출 시 checkVal 파라미터가 없다면 --> undefined 를 리턴한다.', () => {
        expect(calcResultType()).toEqual(undefined);
    });

    it('calcResultType 함수 호출 시 checkVal 파라미터가 있고 정상 처리되면, String이 담긴 배열을 리턴한다.', () => {
        expect(calcResultType('0000')).toEqual(expect.arrayContaining([expect.any(String)]));
    });
});
