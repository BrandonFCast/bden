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
                { name: 'Crear nota'.green, value: createNoteMenu },
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
    const note = new Note();
    note.loadData(id)
    
    const res = await inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: note.title.rainbow + '\n' + note.getPreviewText(),
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
export const createNoteMenu = async () => {
    console.clear();
    const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Título de la nota:'.green,
            validate: (input) => {
                if (input.trim() === '') {
                    return 'El título no puede estar vacío';
                }
                return true;
            }
        },
        {
            type: "list",
            name: 'note-type',
            message: "tipo de nota:",
            choices: [
                {name: 'Normal ' + '(una nota comun, escribe lo que estes pensando)'.yellow, value: readKeys},
                {name: 'Url' + ' (una url donde puedes elegir con que navegador se abre)'.magenta, value: 2},
                {name: 'Lista' + ' (una lista de opciones que puedes cambiar de estado)'.cyan, value: 3}
            ]
        }
    ])
    const note = new Note(res.title);
    note.body = await readKeys(res.title);
    const {tags} = await inquirer.prompt([
        {
            type: 'input',
            name: 'tags',
            message: 'escribe las tags (separadas por comas)'.magenta,
        }
    ]);
    note.tags = tags.split(',');
    note.save();
    console.log(`Nota "${res.title}" creada exitosamente`.green);
}
const readKeys = (title) => {
    return new Promise((resolve) => {
        
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        
        console.log(`--- ${title.rainbow} ---`);
        console.log('Presiona Ctrl+C para salir');
        
        let lines = [''];
        let currentRow = 0;
        let currentCol = 0;
        let maxRow = 0;
        const maxLineLength = 30; // Limite de caracteres por linea

        const onKeyPress = (key) => {
            if (key === '\u0003') { // Ctrl+C
                process.stdin.removeListener('data', onKeyPress);
                process.stdin.setRawMode(false);
                process.stdin.pause();
                //resolve({lines, currentCol, currentRow, maxRow});
                resolve(lines.join('\n'));
                return;
            }
            let currentLine = lines[currentRow];
            let isRegularKey = true;
            if (key === '\r') {
                key = '\n';
                currentRow++;
                currentCol = 0;
                lines.push('');
                isRegularKey = false;
                maxRow++;
                process.stdout.cursorTo(0);
                process.stdout.moveCursor(0, 1);
                return;
            } else if (key === '\x1b[A') { // up arrow
                if (currentRow === 0) return;
                currentRow--;
                isRegularKey = false;
            } else if (key === '\x1b[B') { // down arrow
                if (currentRow === maxRow) return;
                currentRow++
                isRegularKey = false;
            } else if (key === '\x1b[C') { // right arrow
                if (currentCol === maxLineLength) return;
                currentCol++;
                isRegularKey = false;
            } else if (key === '\x1b[D') { // left arrow
                if(currentCol === 0) return;
                currentCol--;
                isRegularKey = false;
            } else if (key === '\x7F') { // backspace
                const newLine = currentLine.slice(0, currentCol - 1) + currentLine.slice(currentCol);
                //console.log({newLine});
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`${newLine}`);
                currentCol--;
                process.stdout.cursorTo(currentCol);
                lines[currentRow] = newLine;
                return;
            }
            process.stdout.write(`${key}`);
            
            if (isRegularKey){
                lines[currentRow] += key;
                currentCol++;
            }
        };

        process.stdin.on('data', onKeyPress);
    });
}
const readKeysExample = async () => {
    console.clear();
    const salida = await readKeys('titulo de nota');
    console.log('\n');
    console.log({
        lines: salida.lines,
        len: salida.lines.length,
        currentCol: salida.currentCol,
        currentRow: salida.currentRow,
        maxRow: salida.maxRow
    });
}

//readKeysExample();