const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    findStories,
    findStoryByUser,
    findStoryById,
    newStory,
    update,
    remove,
    find,
    findBy,
    add,
    findById
    // getProject,
    // getActions,
    // getBoth,
    // insert
};

function findStories() {
    return db('stories');
}

function findStoryById(id) {
    return db('stories')
        .where({ id: id })
        .first();
}


function findStoryByUser(id) {
    return db('stories')
        .select(['*'])
        .from('stories')
        .where({ user: id })
}

function newStory(story) {
    return db('stories')
        .insert(story)
        .then(ids => ({ id: ids[0] }));
}

function update(id, story) {
    return db('stories')
        .where({ id: id })
        .update(story);
}

function remove(id) {
    return db('stories')
        .where({ id: id })
        .del();
}

function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}


// function getProject(id) {
//     return db('projects')
//         .select(['*'])
//         .from('projects')
//         .where({ id: id });
// }

// function getActions(id) {
//     return db('actions')
//         .select('id', 'actions.description', 'notes', 'completed')
//         .from('actions')
//         .where({ action_id: id });

// }

// async function getBoth(id) {
//     let a = await getProject(id);
//     let b = await getActions(id);
//     return {
//         ...a,
//         actions: b
//     };
// }

// function insert(project) {
//     return db('projects')
//         .insert(project)
//         .then(ids => ({ id: ids[0] }));
// }
