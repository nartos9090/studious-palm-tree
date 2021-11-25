const students = []

function addStudent({ name, id }) {
    students.push({ name: String(name), id: String(id) })
    return true
}

function findStudent(find) {
    const regex = RegExp(find, 'i')
    return students.filter(v => regex.test(v.name) || regex.test(v.id))
}

module.exports = {
    addStudent,
    findStudent
}