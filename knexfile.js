module.exports = {

    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/expat.db'
        },
        useNullAsDefault: true,
    },
}