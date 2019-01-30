
const users = [
    {   id: 1, 
        username: 'test', 
        password: 'test', 
        firstName: 'Test', 
        lastName: 'User' 
    },
    {   id: 2, 
        username: 'test1', 
        password: 'test1', 
        firstName: 'Test1', 
        lastName: 'User1' 
    },
    {   id: 3, 
        username: 'test2', 
        password: 'test2', 
        firstName: 'Test2', 
        lastName: 'User2' 
    }
];

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) 
    {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}