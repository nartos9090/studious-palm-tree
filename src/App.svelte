<script>
	import { Button, Table, FormCheck, Modal, TabContent, TabPane } from 'sveltestrap'
	import Student from './Component/Student.svelte'
	import Payment from './Component/Payment.svelte'

	let datas = [
		{
			nama: 'Wahyudi',
			nis: '10001',
			tahun: 2012,
			bulan: 1,
			nominal: 150000,
			dibayar: true,
		},
		{
			nama: 'Wahyudi',
			nis: '10001',
			tahun: 2012,
			bulan: 2,
			nominal: 150000,
			dibayar: true,
		},
		{
			nama: 'Wahyudi',
			nis: '10001',
			tahun: 2012,
			bulan: 3,
			nominal: 150000,
			dibayar: false,
		},
	]

	let isOpen = false
	const toggle = () => {isOpen = !isOpen}
</script>

<main>
	<h1>Data Pembayaran SPP</h1>
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
	<!-- <Button color="warning" on:click={toggle}>Hello</Button>

	<Table>
		<thead>
			<tr>
				<td>No.</td>
				<td>Nama</td>
				<td>NIS</td>
				<td>Tahun</td>
				<td>Bulan</td>
				<td>Nominal</td>
				<td>Dibayar</td>
			</tr>
		</thead>

		<tbody>
			{#each datas as data, i}
			<tr>
				<td>{i + 1}</td>
				<td>{data.nama}</td>
				<td>{data.nis}</td>
				<td>{data.tahun}</td>
				<td>{data.bulan}</td>
				<td>{data.nominal}</td>
				<td class="d-flex justify-content-center">
					<FormCheck type="checkbox" readonly bind:checked={data.dibayar} class="ml-auto mr-auto" />
				</td>
			</tr>
			{/each}
		</tbody>
	</Table>

	<Modal body {isOpen} {toggle} header="Hello World!">
		<p>There's a song that we're singing. Come on</p>
		<img
		src="https://i.ytimg.com/vi/NUJIRujygvY/hqdefault.jpg"
		alt="Come on Get Happy"
		class="img-fluid"
		/>
	</Modal> -->

	<TabContent>
		<TabPane tabId="student" tab="Siswa" active>
			<Student />
		</TabPane>

		<TabPane tabId="payment" tab="Pembayaran">
			<Payment />
		</TabPane>
	</TabContent>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>