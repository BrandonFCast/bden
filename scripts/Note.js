import { addNote, getNoteById } from "./dataManager.js";
import "colors";
import crypto from "crypto"

export default class Note {
    #creationDate
    #lastModified
    constructor (title) {
        this.title = title;
        this.id = crypto.randomUUID();
    }

    loadData(id) {
        const data = getNoteById(id);
        this.title = data.title;
        this.body = data.body;
        this.tags = data.tags;
        this.#lastModified = data.lastModified;
        this.#creationDate = data.creationDate;
    }
    
    getPreviewText () {
        return this.getDesc() +
        '\n' + this.getTagsText() +
        '\n\n' + ` created:  ${this.creationDate} `.bgMagenta +
        '\n' + ` last mod: ${this.lastModified} `.bgMagenta;
    }

    getTagsText () {
        let finalText = '';
        for (let tag of this.tags) {
            finalText += ` ${tag} `.bgRed + ' ';
        }
        return finalText;
    }

    save () {
        addNote(this.id, this.title, this.body, this.tags)
    }
    /**
     * @returns {string} a bit of the note body
     */
    getDesc() {
        let text = '';
        for (let i = 0; i < 3; i++) {
            text += this.body.slice(i * 20, (i+1) * 20);
            text += '\n';
        }
        return text.bgWhite;
        //return this.body.slice(0, 20).bgWhite;
    }

    /**
     * @returns {string} note creation date
     */
    get creationDate () {
        return this.#creationDate;
    }
    get lastModified () {
        return this.#lastModified;
    }
}