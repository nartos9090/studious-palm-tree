<script>
    import { Row, Col, Button, Table, Input, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Modal, FormGroup, Label } from 'sveltestrap'

    let payments = []
    let student_lists = []
    let isEditing = false
    let isOpen = false
    let openModal = false
    let form = {
        student_id: null,
        student_verified: false,
        year: null,
        month: null,
        nominal: null,
        paid: false,
    }

    const getPayment = () => {
        const resp = window.API.payment.find({ find: '' })    
        if (resp.status) {
            payments = resp.data
        }
    }

    const getStudent = () => {
        form.student_verified = false
        student_lists = window.API.student.find(form.student_id)
    }

    const resetForm = () => {
        form.student_id = null
        form.year = null
        form.month = null
        form.nominal = null
        form.paid = false
    }

    const toggleAddPayment = () => {
        openModal = !openModal

        if (!openModal) {
            resetForm()
        }
    }

    const selectStudent = (student_id) => {
        form.student_id = student_id
        form.student_verified = true
    }

    const savePayment = () => {
        const { status, message } = window.API.payment.add(form)

        if (status) {
            getPayment()
            toggleAddPayment()
        } else {
            alert(message)
        }
    }

    const saveEdit = () => {
        const { status, message } = window.API.payment.edit(form)

        if (status) {
            getPayment()
            isEditing = false
            toggleAddPayment()
        } else {
            alert(message)
        }
    }

    const editPayment = (data) => {
        isEditing = true
        form.id = data.id
        form.student_id = data.student_id
        form.year = data.year
        form.month = data.month
        form.nominal = data.nominal
        form.paid = data.paid
        toggleAddPayment()
    }

    getPayment()

</script>

<main>
    <Row class="mt-3">
        <Col size="12">
            <Button color="primary" on:click={toggleAddPayment}>Tambah Pembayaran</Button>
        </Col>
    </Row>

    <Row>
        <Col size="12">
            <Table>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIS</th>
                        <th>Tahun</th>
                        <th>Bulan</th>
                        <th>Nominal</th>
                        <th>Terbayar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                
                <tbody>
                    {#each payments as payment}
                        <tr>
                            <td>{payment.student.name}</td>
                            <td>{payment.student_id}</td>
                            <td>{payment.year}</td>
                            <td>{payment.month}</td>
                            <td>{payment.nominal}</td>
                            <td>
                                <Input
                                    type="checkbox"
                                    bind:checked={form.paid}
                                />
                            </td>
                            <td>
                                <Button on:click={editPayment(payment)} color="warning">Edit</Button>
                                <!-- <Button on:click={deleteStudent(data.id)} color="danger">Hapus</Button> -->
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </Table>
        </Col>
    </Row>
    
    <Row>
        <Col size="12">
        </Col>
    </Row>



    <Modal body isOpen={openModal} toggle={toggleAddPayment} header="Tambah Pembayaran">
        <FormGroup>
            <Label for="input-student-id">NIS</Label>

            <Dropdown {isOpen} toggle={() => isOpen = !isOpen}>
                <DropdownToggle tag="div" class="d-inline-block">
                    <Input
                        id="input-student-id"
                        type="text"
                        invalid={!form.student_id || !form.student_verified}
                        bind:value={form.student_id}
                        on:keyup={getStudent}
                        feedback="Masukkan NIS"
                        placeholder="NIS"
                    />
                </DropdownToggle>
                <DropdownMenu>
                    {#each student_lists as student, i (i)}
                        <DropdownItem on:click={() => selectStudent(student.student_id)}>
                            <div>{student.name}</div>
                            <small>{student.student_id}</small>
                        </DropdownItem>
                    {/each}
                </DropdownMenu>
            </Dropdown>
        </FormGroup>

        <FormGroup>
            <Label for="input-tahun">Tahun</Label>
            <Input
                id="input-tahun"
                type="select"
                invalid={!form.year}
                bind:value={form.year}
                feedback="Pilih tahun"
                placeholder="Pilih tahun"
            >
                <option value={2018}>2018</option>
                <option value={2019}>2019</option>
                <option value={2020}>2020</option>
                <option value={2021}>2021</option>
            </Input>
        </FormGroup>

        <FormGroup>
            <Label for="input-bulan">Bulan</Label>
            <Input
                id="input-bulan"
                type="select"
                invalid={!form.month}
                bind:value={form.month}
                feedback="Pilih bulan"
                placeholder="Pilih bulan"
            >
                <option value={1}>Januari</option>
                <option value={2}>Februari</option>
                <option value={3}>Maret</option>
                <option value={4}>April</option>
                <option value={5}>Mei</option>
                <option value={6}>Juni</option>
                <option value={7}>Juli</option>
                <option value={8}>Agustus</option>
                <option value={9}>September</option>
                <option value={10}>Oktober</option>
                <option value={11}>November</option>
                <option value={12}>Desember</option>
            </Input>
        </FormGroup>

        <FormGroup>
            <Label for="input-nominal">Nominal</Label>
            <Input
                id="input-nominal"
                type="number"
                invalid={!form.nominal}
                bind:value={form.nominal}
                feedback="Masukan nominal"
                placeholder="Masukkan nominal"
            />
        </FormGroup>

        <FormGroup>
            <Label for="input-paid">Telah Dibayar</Label>
            <Input
                id="input-paid"
                type="checkbox"
                bind:value={form.paid}
            />
        </FormGroup>

        <Button color="primary" disabled={!form.student_verified || !form.year || !form.month || !form.nominal} on:click={isEditing ? saveEdit : savePayment}>Simpan</Button>
    </Modal>
</main>