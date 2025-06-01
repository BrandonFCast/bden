import inquirer from 'inquirer'
import colors from 'colors'
import { getNoteById } from './dataManager.js'

export const showMainMenu = async () => {
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: 'BDEN - Menú principal'.rainbow,
            choices: [
                { name: 'Lista de notas'.blue, value: 1 },
                { name: 'Crear nota'.green, value: 2 },
                { name: 'Eliminar notas'.blue, value: 3 },
                { name: 'Configuración'.blue, value: 4 },
                { name: 'Salir'.red, value: 5 }
            ]
        }
    ])
    console.clear();
    return res.index;
}

// title, body, tags, creationDate, lastModified, settings
export const showNotesMenu = async (notes) => {
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: 'Todas las notas'.rainbow,
            choices: notes,
            loop: false
        }
    ])
}

// aqui adentro cuando elige una el siguiente menu sera: editar, eliminar, ver, atras
export const showNoteMenu = async (id) => {
    console.clear();
    const note = getNoteById(id);
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: note.title.rainbow,
            choices: [
                { name: 'Ver nota'.blue, value: 1 },
                { name: 'Editar nota'.blue, value: 2 },
                { name: 'Eliminar nota'.red, value: 3 },
                { name: 'Atras'.blue, value: 4 }
            ]
        }
    ])
}