const db = require('../models/index');

const handleQuery = async (query, errorMessage) => {
    try {
        const data = await query.get();
        
        // Check if data is null or undefined
        if (data === null || data === undefined) {
            return { success: false, error: 'No data found' };
        }

        return { success: true, data };
    } catch (error) {
        console.error(errorMessage, { query: query.constructor.name, error }); // Replaced logError with console.error
        return { success: false, error };
    }
};


module.exports.execute = async (query) => handleQuery(query, "Repository failed on execute");

module.exports.create = async (query) => handleQuery(query, "Repository failed on create");

module.exports.createOne = async (query) => handleQuery(query, "Repository failed on createOne");

module.exports.find = async (query) => handleQuery(query, "Repository failed on find");

module.exports.findOne = async (query) => handleQuery(query, "Repository failed on findOne");

module.exports.bulkCreate = async (query) => handleQuery(query, "Repository failed on bulk create");

module.exports.update = async (query) => handleQuery(query, "Repository failed on update");

module.exports.delete = async (query) => handleQuery(query, "Repository failed on delete");

module.exports.deleteOne = async (query) => handleQuery(query, "Repository failed on deleteOne");

module.exports.executeAll = async (arr) => {
    if (!Array.isArray(arr)) {
        return { success: false, error: 'Argument is not an array' };
    }

    const allPromises = arr.map((item) => {
        if (Array.isArray(item)) {
            return item[0].get().catch((error) => ({ error, args: item.slice(1) }));
        }
        return item.get().catch((error) => ({ error, args: [] }));
    });

    let errorFound = false;
    const results = await Promise.all(allPromises);

    for (const result of results) {
        if (result && result.error) {
            errorFound = true;
            console.error("Repository failed on executeAll", { query: arr, error: result.error }); // Replaced logError with console.error
            if (result.args.length === 1 || (result.args.length === 2 && result.args[1].includes('api'))) {
                return { success: false, error: 'API error', data: result.args[0] };
            }
            if (result.args.length === 2 && result.args[1].includes('validation')) {
                return { success: false, error: 'Validation error', data: result.args[0] };
            }
            return { success: false, error: result.error };
        }
    }

    if (!errorFound) {
        return { success: true, data: results };
    }
};

module.exports.executeMultiple = async (queries) => {
    try {
        const result = await db.sequelize.transaction(async (t) => {
            const allResult = queries.map((query) => query.get({ transaction: t }).then((data) => data));
            return Promise.all(allResult);
        });
        return { success: true, data: result };
    } catch (error) {
        console.error("Repository failed on execute multiple", { query: queries.map((query) => query.constructor.name).join(","), error }); // Replaced logError with console.error
        return { success: false, error };
    }
};

module.exports.executeMultipleWithoutTx = async (queries) => {
    try {
        const allResult = queries.map((query) => query.get().then((data) => data));
        const resolveAllResult = await Promise.all(allResult);
        return { success: true, data: resolveAllResult };
    } catch (error) {
        console.error("Repository failed on executeMultipleWithoutTx", { query: queries.map((query) => query.constructor.name).join(","), error }); // Replaced logError with console.error
        return { success: false, error };
    }
};
