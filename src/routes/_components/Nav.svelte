<script>
	export let segment;
	import { stores } from '@sapper/app';
	const { session } = stores();
	$: currentUser = $session.user?username():"no";
	
	function username(){
		try{
			return JSON.parse(window.atob($session.user.split('.')[1])).userName;
		}catch(e){
			return "username";
		}
	}
	

	async function handleLogout() {
      fetch('./auth/logout', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
      });
		$session.user = null;
          
	}
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(0, 4, 255, 0.1);
		font-weight: 300;
		padding: 0 1em;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		margin-bottom: 8px;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li:not(.right){
		display: block;
		float: left;
	}

	.right{
		display: block;
		float: right;
		font-size: 14px;
		margin-top: 4px;
		}

	.selected {
		position: relative;
		display: inline-block;
		background-color: #0011ff10;
		font-weight: 400;
		text-transform: capitalize;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: 100%;
		height: 2px;
		background-color: rgb(55, 0, 255);
		display: block;
		bottom: -1px;
		left: 0;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	a:hover{
		font-weight: 400;
		text-transform: capitalize;
	}
</style>

<nav data-cy="nav">
	
	<ul>
		{#if $session.user}
			<li><a class='{segment === undefined ? "selected" : ""}' href='.'>home</a></li>
			<li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li>
			<li><a class='{segment === "deadlines" ? "selected" : ""}' href='deadlines'>deadlines</a></li>
			<li><a class='{segment === "admin" ? "selected" : ""}' href='admin'>administer</a></li>
			
			<li class='right'><a href='login' on:click={handleLogout}>log out</a></li>
			<li class='right' style="padding: 1em 0.5em;">{currentUser}</li>
		{:else}
			<li><a class='{segment === "login" ? "selected" : ""}' href='login'>login</a></li>
			<li><a class='{segment === "register" ? "selected" : ""}' href='register'>register</a></li>
		{/if}
		
	</ul>

</nav>