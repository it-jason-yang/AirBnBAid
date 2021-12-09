const { LegalTestResults } = require('../../models');

const getLegalResult = async (req, res, next) => {
    const testResData = [{title: "제목", description:"합법 쌉가능!"}]

    try {
        console.log('legalCheck 컨트롤러 내 getLegalResult 함수 실행');
        const testResult = await LegalTestResults.findAll({
            // where: { resultId : 1 }
        });

        if (testResult) {
            return res.status(200).send(testResult);
        }
        return res.status(200).send(testResData);
    } catch (error) {
        
    }

}

module.exports = { getLegalResult };