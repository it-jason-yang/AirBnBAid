const { sequelize } = require('../models');
const {
    callCntUp,
    getLegalResult,
} = require('../routes/controllers/legalCheck');

describe('legalCheck callCntUp Test', () => {
  it('callCntUp 함수 호출 시 resultId 파라미터가 없다면, rejects --> callCntUp Error가 발생한다.', async () => {
    await expect(callCntUp()).rejects.toThrow('callCntUp Error');
  });

  it('callCntUp 함수 호출 시 resultId 파라미터가 있고 정상 처리되면, resolves --> true', async () => {
    await expect(callCntUp(1)).resolves.toBe(true);
  });
});