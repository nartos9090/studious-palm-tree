<script>
    import { Table, Row, Col, Button, Modal, Form, FormGroup, Input, Label } from 'sveltestrap'

    let students = window.API.student.find(),
        openModal = false,
        isEditing = 0,
        form = {
            name: null,
            id: null
        }

    const resetForm = () => {
        form.name = null,
        form.id = null
    }

    const toggleAddStudent = () => {
        openModal = !openModal

        if (!openModal) {
            resetForm()
        }
    }

    const saveStudent = () => {
        if (window.API.student.add(form)) {
            students = window.API.student.find()
            toggleAddStudent()
        }
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
                </tr>
            </thead>
    
            <tbody>
                {#each students as data, i}
                    <tr>
                        <td>{data.id}</td>
                        <td>{data.name}</td>
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
                invalid={!form.id}
                bind:value={form.id}
                feedback="Masukkan Nomor Induk Siswa"
                placeholder="Nomor Induk Siswa"
            />
        </FormGroup>

        <Button color="primary" disabled={!form.id || !form.name} on:click={saveStudent}>Simpan</Button>
    </Modal>
</main>