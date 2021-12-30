const { contextBridge, ipcRenderer } = require('electron')
const db_students = require('../model/students')
const db_payments = require('../model/payments')

contextBridge.exposeInMainWorld('API', {
    helloDialog: () => ipcRenderer.send('hello'),
    student: {
        add: db_students.addStudent,
        edit: db_students.editStudent,
        delete: db_students.deleteStudent,
        find: db_students.findStudent,
    },
    payment: {
        find: db_payments.findPayment,
        add: db_payments.addPayment,
    }
})