'use strict';

const { data } = require("browserslist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('LegalTestResults', [{
      resultType: 0,
      title: '사업자 등록 후 합법적으로 운영할 수 없습니다.',
      law: '-',
      houseType: '-',
      houseLocation: '-',
      guest: '-',
      host: '-',
      info: '-',
      callCnt: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      resultType: 1,
      title: '외국인관광 도시민박업',
      law: '관광진흥법',
      houseType: '주택 연면적 230m² 미만|2룸 이상|단독주택(단독주택, 다가구주택) 또는 공동주택(아파트, 연립주택, 다세대주택)',
      houseLocation: '도시지역',
      guest: '외국인만 가능',
      host: '전입한 상태여야함',
      info: '-',
      callCnt: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      resultType: 2,
      title: '농어촌민박업',
      law: '농어촌정비법',
      houseType: '주택 연면적 230m² 미만|2룸 이상|단독주택(단독주택, 다가구주택)|직접 소유하고 있어야함',
      houseLocation: '농어촌지역 또는 준농어촌지역',
      guest: '내국인, 외국인 둘 다 가능',
      host: '전입한 상태여야함|(준)농어촌지역의 주민이어야함|(준)농어촌지역의 관할 시, 군, 구에 6개월 이상 거주하고 있어야 함|(세부 사항은 기타정보 참고)',
      info: '농어촌민박사업 중인 주택을 상속받은 경우에는 6개월 이상 거주하지 않아도 가능|[아래 항목에 해당하는 경우 직접 소유하고있지 않아도 신고할 수 있음]|관할 시, 군, 구에 3년 이상 거주하면서, 임차하여 농어촌민박을 2년 이상 계속 운영하였고 사업장 폐쇄 또는 1개월 이상의 영업정지처분을 받은 적이 없는 자/농어촌민박을 신고하고자 하는 관할 시, 군, 구에 3년 이상 계속 거주하였으며, 임차하여 2년이상 계속하여 농어촌민박을 운영하고자 하는 자',
      callCnt: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      resultType: 3,
      title: '한옥체험업',
      law: '관광진흥법',
      houseType: '주택 연면적 230m² 미만|2룸 이상|한옥',
      houseLocation: '제한 없음',
      guest: '내국인, 외국인 둘 다 가능',
      host: '전입하지 않아도 가능',
      info: '-',
      callCnt: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      resultType: 4,
      title: '공유숙박업',
      law: '정보통신융합법(실증을 위한 규제특례)',
      houseType: '주택 연면적 230m² 미만|2룸 이상|단독주택(단독주택, 다가구주택) 또는 공동주택(아파트, 연립주택, 다세대주택)',
      houseLocation: '서울 내 위치한 지하철 1~9호선 역에서 1km 이내',
      guest: '내국인, 외국인 둘 다 가능',
      host: '전입한 상태여야함',
      info: '위홈에서 자세한 정보 확인 가능|위홈 링크 : http://stay.wehome.me/ko/legalstay/',
      callCnt: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
