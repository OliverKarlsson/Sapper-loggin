<svelte:head>
	<meta name="author" content="Oliver Karlsson">
	<meta name="author-fullname" content="Oliver Alexander Nørgaard Karlsson">
</svelte:head>
<script>
	import Nav from './_components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		width: 95%;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>