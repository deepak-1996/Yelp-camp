const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('logged you in successfull match')
    } else {
        console.log('incorrect')
    }
}

login('monkey', '$2b$10$kt/23W5XXpe8M2ofSQ0YcOIw24chnDehwx5q.5mTw4qi5Ho0Qxg9i')
