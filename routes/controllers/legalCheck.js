const { LegalTestResults, Sequelize } = require('../../models');
const createError = require('http-errors');


//클라이언트에서 체크값들 연결해서 요청하면
//연결된 값 받아서 DB내 ResultId 동일한 항목 가져옴

const callCntUp = async (resultType) => {
    try {
        console.log('cllCntUp 함수 실행');
        await LegalTestResults.update({
            callCnt: Sequelize.literal('callCnt + 1')
        },
            {
                where: { resultType: resultType }
            })
        return true

    } catch (error) {
        console.log(error);
        throw new Error('callCntUp Error')
    }
}

const getLegalResult = async (req, res, next) => {
    const { resultType } = req.body;

    try {
        console.log('legalCheck 컨트롤러 내 getLegalResult 함수 실행');

        const testResult = await LegalTestResults.findAll({
            where: { resultType }
        });
        if (testResult.length != 0) {
            callCntUp(resultType);
            return res.status(200).send(testResult);
        }

        const noneResult = await LegalTestResults.findAll({
            where: { resultType: '0' }
        });
        console.log(noneResult)
        return res.status(200).send(noneResult);

    } catch (error) {
        console.log(error);
        return next(createError(422, 'Unprocessable T_T...'));
    }
}

module.exports = {
    getLegalResult,
    callCntUp
};