const students = []

function addStudent({ name, nim }) {
    students.push({ name: String(name), nim: String(nim) })
}

function findStudent(find) {
    const regex = RegExp(find, 'i')
    return students.filter(v => regex.test(v.name) || regex.test(v.nim))
}

module.exports = {
    addStudent,
    findStudent
}