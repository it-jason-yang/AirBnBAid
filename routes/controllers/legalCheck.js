const { LegalTestResults, Sequelize } = require('../../models');
const createError = require('http-errors');
const calcTypes = require('../constants/calcTypes.js');
const Op = Sequelize.Op;

//클라이언트에서 체크값들 연결해서 요청하면
//연결된 값 받아서 DB내 ResultId 동일한 항목 가져옴

const callCntUp = async (resultType) => {
    try {
        console.log('callCntUp 함수 실행');
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

//테스트 체크 결과를 받아서 해당하는 resultType Array를 리턴하는 함수
//1:외국인관광 도시민박업, 2:농어촌민박업, 3:한옥체험업, 4:공유숙박업
const calcResultType = (checkVal) => {
    try {
        // if (checkVal == '0000' || checkVal == '0001') {
        //     return ['2', '3']
        // }
        if (calcTypes.calcType1.includes(checkVal)) {
            return ['2', '3']
        }
        if (calcTypes.calcType2.includes(checkVal)) {
            return ['3']
        }
        if (calcTypes.calcType3.includes(checkVal)) {
            return ['3', '4']
        }
        if (calcTypes.calcType4.includes(checkVal)) {
            return ['1', '3', '4']
        }
        if (calcTypes.calcType5.includes(checkVal)) {
            return ['1', '3']
        }
        if (calcTypes.calcType6.includes(checkVal)) {
            return ['2']
        }
        if (calcTypes.calcType7.includes(checkVal)) {
            return ['1', '2']
        }
        if (calcTypes.calcType8.includes(checkVal)) {
            return ['4']
        }
        if (calcTypes.calcType9.includes(checkVal)) {
            return ['1', '4']
        }
        if (calcTypes.calcType10.includes(checkVal)) {
            return ['1']
        }

    } catch (error) {
        console.log(error);
        throw new Error('calcResultType Error')
    }

}

//테스트 결과를 리턴하는 메인 함수
const getLegalResult = async (req, res, next) => {
    
    const { checkVal } = req.body;
    console.log(checkVal)
    const resultType = calcResultType(checkVal)
    console.log(resultType)

    try {
        console.log('legalCheck 컨트롤러 내 getLegalResult 함수 실행');

        let testResult = {}

        //resultType이 없는 경우
        if (resultType == undefined) {
            testResult = await LegalTestResults.findAll({
                where: { resultType: '0' }
            });
            callCntUp('0')
            return res.status(200).send(testResult);
        }

        //resultType이 있는 경우
        if (resultType.length == 1) {
            testResult = await LegalTestResults.findAll({
                where: { resultType }
            });
        } else {
            testResult = await LegalTestResults.findAll({
                where: {
                    resultType: {
                        [Op.or]: resultType
                    }
                }
            });
        }
        callCntUp(resultType);
        return res.status(200).send(testResult);

    } catch (error) {
        console.log(error);
        return next(createError(422, 'Unprocessable T_T...'));
    }
}

module.exports = {
    getLegalResult,
    calcResultType,
    callCntUp
};