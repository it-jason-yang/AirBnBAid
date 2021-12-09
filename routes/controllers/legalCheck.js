const { LegalTestResults, Sequelize } = require('../../models');

const getLegalResult = async (req, res, next) => {
    const testResData = [{title: "불가능 제목", description:"합법 불가능 ㅠㅠ"}]
    const {resultType} = req.body;
    try {
        console.log('legalCheck 컨트롤러 내 getLegalResult 함수 실행');
        const testResult = await LegalTestResults.findAll({
            where: { resultType }
        });
        if (testResult) {
            callCntUp(resultType);
            return res.status(200).send(testResult);
        }
        return res.status(200).send(testResData);
    } catch (error) {
        console.log(error);
    }
}

const callCntUp = async (resultType) => {
    try {
        console.log('cllCntUp 함수 실행');
        await LegalTestResults.update({
            callCnt: Sequelize.literal('callCnt + 1')
        },
            {
                where: { resultType: resultType }
            })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getLegalResult };