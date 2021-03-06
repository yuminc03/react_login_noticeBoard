import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt'; //비밀번호를 데이터베이스에 저장할때
//안전하게 하기 위해 필요함
import jwt from 'jsonwebtoken';//클라이언트에서 사용자 로그인 정보를 지니고 
//있을 수 있게 JWT토큰을 만든다

const UserSchema = new Schema({
    username: String, //사용자 계정명
    hashedPassword: String, //사용자 비밀번호
});

UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};
//setPassword = 비밀번호를 파라미터로 받아서 계정의 
//hashedPAssword값을 설정해 줌

UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true / false
};
//checkPassword = 파라미터로 받은 비밀번호가 해당 계정의 비번과 
//일치하는지 검증
//인스턴스 메서드를 작성할 떄는 function키워드를 사용한다 
//함수 내부에서 this에 접근해야 하기 때문이다
//this는 문서 인스턴스를 가리킨다
//화살표 함수를 사용하면 this가 문서 인스턴스를 가리키지 못함

//findByUsername =  static 메서드, username으로 데이터를 찾을 수 있게 한다
//static 함수에서 this는 model을 가리킴

UserSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.methods.generateToken = function() {
    const token = jwt.sign(
        //첫 번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다
        {
            _id: this.id,
            username: this.username,
        },
        process.env.JWT_SECRET, //두 번째 파라미터에는 JWT암호를 넣는다
        {
            expiresIn: '7d',//7일 동안 유효함
        },
    );
    return token;
};

UserSchema.statics.findByUsername = function(username){
    return this.findOne({username});
};

const User = mongoose.model('User', UserSchema);
export default User;