const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
    sort(tests) {
        const order = ['create', 'find', 'update', 'delete'];

        return tests.sort((a, b) => {
            const aIndex = order.findIndex(keyword => a.path.includes(keyword));
            const bIndex = order.findIndex(keyword => b.path.includes(keyword));

            if (aIndex === bIndex) {
                return a.path.localeCompare(b.path);
            }

            return aIndex - bIndex;
        });
    }
}

module.exports = CustomSequencer;