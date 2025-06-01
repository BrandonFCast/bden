const seed = -1;
import fs from 'fs/promises';

/**
 * Processes the input text to decode it or encode it
 * @param {Object} params - The parameters for processing the text.
 * @param {string} params.text - The input text to be processed.
 * @param {string} params.operation - The operation type ('encode' or 'decode').
 * @returns {string} - The processed text with each character shifted by the seed.
 */
export const processText = ({ text, operation }) => {
    let newText = '';
    for (let char of text) {
        const ascii = char.charCodeAt(0);
        const newChar = String.fromCharCode(ascii + (operation === 'encode' ? seed : -seed));
        newText += newChar;
    }
    return newText;
}
// example
//const encoded = processText({ text: 'hola abc', operation: 'encode' });
//const decoded = processText({ text: encoded, operation: 'decode' });

export const getConfig = async () => {
    const data = await fs.readFile('./files/bden-config.json', 'utf-8');
    const config = JSON.parse(data);
    return config;
}