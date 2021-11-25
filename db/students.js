let index = 1
const students = []

function addStudent({ name, student_id }) {
    students.push({ name: String(name), student_id: String(student_id), id: ++index })
    console.log(students)
    return true
}

function editStudent({ name, student_id, id }) {
    const student = students.find(student => student.id === id)

    if (student) {
        student.name = name
        student.student_id = student_id
        return true
    }
    
    return false
}

function findStudent(find) {
    const regex = RegExp(find, 'i')
    return students.filter(v => regex.test(v.name) || regex.test(v.student_id))
}

module.exports = {
    addStudent,
    editStudent,
    findStudent
}