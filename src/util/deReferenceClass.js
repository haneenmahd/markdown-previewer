const types = [
    {
        type: 'dark',
        ref: 'theme__dark'
    },
    {
        type: 'light',
        ref: 'theme__light'
    },
    {
        type: 'primary',
        ref: 'use_primary'
    },
    {
        type: 'secondary',
        ref: 'use_secondary'
    },
];

/**
 * This function reads a prop value and give it the class name
 * @param {string} value The props value
 */
export default function deReferenceClass(value) {
    types.map(valueType => {
        if (value === valueType.type) {
            value = valueType.ref;

            return value;
        }
    });
}