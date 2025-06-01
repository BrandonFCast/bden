import fs from 'fs';
import { getConfig } from './utils.js';

const dataFilePath = '/home/brand/Documentos/bden/data.json';

const readDataFile = () => {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, '{}');
        return {};
    }
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
}

const saveData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
}

//! update this
export const addNote = (title, note, tags = []) => {
    const data = readDataFile();
    data.notes.push({ title, note, tags });
}

export const getNoteNames = () => {
    const data = readDataFile();
    return data.notes.map(note => {
        return { name: note.title, value: note.id }
    });
}

export const getNoteById = (id) => {
    // todo: implement search by id
    const data = readDataFile();
    const note = data.notes.find(note => note.id === id);
    return note;
}