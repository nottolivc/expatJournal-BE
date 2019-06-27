module.exports = {
    // jwtSecret: 'get this from the security people'
    jwtSecret: process.env.JWT_SECRET || 'get this from the security people'
}
