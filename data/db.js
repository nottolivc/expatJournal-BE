const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    findStories,
    findStoryByUser,
    findStoryById,
    getProject,
    getActions,
    getBoth,
    insert,
    update,
    remove
};

function findStories() {
    return db('stories');
}

function findStoryById(id) {
    return db('stories')
        .where({ id: id })
        .first();
}

// function findStoryByUser(id) {
//     return db('stories')
//         .where({ user: id })
//         .first();
// }

function findStoryByUser(id) {
    return db('stories')
        .select(['*'])
        .from('stories')
        .where({ user: id })
}


function getProject(id) {
    return db('projects')
        .select(['*'])
        .from('projects')
        .where({ id: id });
}

function getActions(id) {
    return db('actions')
        .select('id', 'actions.description', 'notes', 'completed')
        .from('actions')
        .where({ action_id: id });

}

async function getBoth(id) {
    let a = await getProject(id);
    let b = await getActions(id);
    return {
        ...a,
        actions: b
    };
}

function insert(project) {
    return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }));
}

function update(id, project) {
    return db('projects')
        .where({ id: id })
        .update(project);
}

function remove(id) {
    return db('projects')
        .where({ id: id })
        .del();
}