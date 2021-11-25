<script>
    import { Table, Row, Col, Button, Modal, FormGroup, Input, Label } from 'sveltestrap'

    let students = window.API.student.find(),
        openModal = false,
        isEditing = 0,
        form = {
            name: null,
            id: null
        }

    const resetForm = () => {
        form.name = null
        form.student_id = null
        form.id = null
        isEditing = false
    }

    const toggleAddStudent = () => {
        openModal = !openModal

        if (!openModal) {
            resetForm()
        }
    }

    const saveStudent = () => {
        let status
        if (form.id) {
            status = window.API.student.edit(form)
        } else {
            status = window.API.student.add(form)
        }

        if (status) {
            students = window.API.student.find()
            toggleAddStudent()
        }
    }

    const editStudent = (data) => {
        form.name = data.name
        form.student_id = data.student_id
        form.id = data.id
        isEditing = true
        toggleAddStudent()
    }
</script>

<main>
    <Row class="mt-3">
        <Col size="12">
            <Button color="primary" on:click={toggleAddStudent}>Tambah Siswa</Button>
        </Col>
    </Row>

    <Row>
        <Table>
            <thead>
                <tr>
                    <th>NIS</th>
                    <th>Nama</th>
                    <th>Aksi</th>
                </tr>
            </thead>
    
            <tbody>
                {#each students as data, i}
                    <tr>
                        <td>{data.student_id}</td>
                        <td>{data.name}</td>
                        <td>
                            <Button on:click={editStudent(data)} color="warning">Edit</Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    </Row>

    <Modal body isOpen={openModal} toggle={toggleAddStudent} header={isEditing ? "Edit Siswa" : "Tambah Siswa"}>
        <FormGroup>
            <Label for="input-name">Nama</Label>
            <Input
                id="input-name"
                type="text"
                invalid={!form.name}
                bind:value={form.name}
                feedback="Masukkan Nama"
                placeholder="Nama Siswa"
            />
        </FormGroup>

        <FormGroup>
            <Label for="input-id">Nomor Induk Siswa</Label>
            <Input
                id="input-id"
                type="number"
                invalid={!form.student_id}
                bind:value={form.student_id}
                feedback="Masukkan Nomor Induk Siswa"
                placeholder="Nomor Induk Siswa"
            />
        </FormGroup>

        <Button color="primary" disabled={!form.student_id || !form.name} on:click={saveStudent}>Simpan</Button>
    </Modal>
</main>