<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,90,0.5);
	}

	.modal {
		position: fixed;
		left: 50vw;
		top: 50vh;
		width: calc(100vw - 4em);
		max-width: 32em;
		max-height: calc(100vh - 4em);
		overflow: auto;
		transform: translate(-50%,-50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.7);
	}

	button {
		float: right;
		display: block;
	}
	.modal-body{
		height: 18em;
		overflow: auto;
	}
</style>

<div class='modal-background' on:click='{() => dispatch("close")}'></div>

<div class='modal'>
	<slot name='header'></slot>
	<hr>
	<div class='modal-body'>
		<slot></slot>
	</div>
	<br>
	<hr>

	<button class="btn-p" on:click='{() => dispatch("closeByBtn")}'>Done</button>
</div>
