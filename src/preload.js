const { contextBridge, ipcRenderer } = require('electron')
const db_students = require('../db/students')

contextBridge.exposeInMainWorld('API', {
    helloDialog: () => ipcRenderer.send('hello'),
    student: {
        add: db_students.addStudent,
        edit: db_students.editStudent,
        find: db_students.findStudent,
    }
})