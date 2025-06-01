#!/usr/bin/env node
import { getNoteNames } from "./scripts/dataManager.js";
import { showMainMenu, showNotesMenu, showNoteMenu } from "./scripts/menus.js";

console.clear();

const option = await showMainMenu();

if (option === 1) {
    await showNotesMenu(getNoteNames());
    showNoteMenu(1);
}

