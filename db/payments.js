import db_students from './students'

let index = 1
const payments = []

function addPayment({ student_id, year, month, nominal, paid }) {
    const student = db_students.findByStudentId(student_id)

    if (!student) {
        return { status: false, message: 'ID Siswa tidak ditemukan' }
    }

    const payment = payments.find(v => v.year == year && v.month == month && v.student_id == student_id)

    if (payment) {
        return { status: false, message: 'Pembayaran sudah ada' }
    }

    payments.push({
        id: ++index,
        student_id: String(student_id),
        year: Number(year),
        month: Number(month),
        nominal: Number(nominal),
        paid: Boolean(paid),
    })

    return true
}

function setPaid({ payment_id, paid }) {
    const payment = payments.find(v => v.id === payment_id)

    if (!payment) {
        return { status: false, message: 'ID Pembayaran tidak ditemukan' }
    }

    payment.paid = paid
    return { status: true, message: 'Berhasil mengedit data' }
}

function deletePayment({ id }) {
    const index = payments.findIndex(payment => payment.id == id)
    
    if (index >= 0) {
        return { status: Boolean(payments.splice(index, 1).length), message: 'Berhasil menghapus pembayaran' }
    }

    return { status: false, message: 'Pembayaran tidak ditemukan' }
}

module.exports = {
    addPayment,
    setPaid,
    deletePayment,
}