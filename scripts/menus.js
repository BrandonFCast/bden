import inquirer from 'inquirer'
import 'colors'
import { getNoteNames } from './dataManager.js'
import Note from './Note.js'

export const showMainMenu = async () => {
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: 'BDEN - Menú principal'.rainbow,
            choices: [
                { name: 'Lista de notas'.blue, value: showNotesMenu },
                { name: 'Crear nota'.green, value: null },
                { name: 'Eliminar notas'.blue, value: null },
                { name: 'Configuración'.blue, value: null },
                { name: 'Salir'.red, value: () => { console.log("adios") } }
            ]
        }
    ])
    console.clear();
    res.index();
}

export const showNotesMenu = async (notes) => {
    if (!notes) {
        notes = getNoteNames();
    }
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: 'Todas las notas'.rainbow,
            choices: notes,
            loop: false
        }
    ])
    showNoteMenu(res.index);
}

export const showNoteMenu = async (id) => {
    console.clear();
    const note = new Note(id);
    
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: note.title.rainbow + '\n\n' + note.getPreviewText(),
            choices: [
                new inquirer.Separator(),
                { name: 'Ver nota'.blue, value: 1 },
                { name: 'Editar nota'.blue, value: 2 },
                { name: 'Eliminar nota'.red, value: 3 },
                { name: 'Atras'.blue, value: 4 }
            ]
        }
    ])
}