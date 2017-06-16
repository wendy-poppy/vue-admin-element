import Mock from 'mockjs';
var Random = Mock.Random;
Random.date('yyyy-MM-dd');
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
      'id|1-100':1,
      name: Mock.Random.cname(),
      regTime: '@date("yyyy-MM-dd")',
      id_card_back_oss:'http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg',
      id_card_front_oss:'http://img05.tooopen.com/images/20150531/tooopen_sy_127457023651.jpg',
      cardId: Mock.Random.id(),
      state:'未认证',

      add_time: '@date("yyyy-MM-dd")',
      phone:/^1[0-9]{10}$/,
      'oil_discount|100-200':1,
      'recharge_discount|300-400':1,

      user_create_time:'@date("yyyy-MM-dd")',
      'all_user_card_no|100-200':1,
      'used_user_card_no|10-50':1,

      username:Mock.Random.cname(),
      'face_value|10-100':1,
      card_no:11111,
      order_no:222222,

      extract_time:'@date("yyyy-MM-dd")',
      user_phone:/^1[0-9]{10}$/,
      'amount|100-200':1,
      bank_name:'中国银行',
      card_no:Mock.Random.id(),
  }));
}

export { LoginUsers, Users };
