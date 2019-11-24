
<script>
  import { goto, stores } from '@sapper/app';
  import Public from './_components/Public.svelte';
  import Box from './_components/Box.svelte';
  import { doFetch } from './_components/Fetcher.js';

    const { session } = stores();
    let name="",
        email = "", 
      password = "",
      errors = "",
      clear = "";

    async function handleRegister() {
      doFetch(
       './auth/register',
       "POST", 
       JSON.stringify({name, email, password})
       ).then(function(response) {
          errors = response.headers.get('Errors')?response.headers.get('Errors'):"";
          clear = errors?"":"Thank you for joining us.";
      });

	}
</script>
<Public/>
<Box>
<h1 style="text-align: center;">Register</h1>
<p>Username:</p>
<input type="input" data-cy="name" bind:value={name}/>
<p>Email:</p>
<input type="email" data-cy="email" bind:value={email}/>
<p>Password:</p>
<input type="password" data-cy="password" bind:value={password}/>
<p></p>
<button data-cy= "registers" on:click={handleRegister} class="btn-p">
    Register
</button>
<a data-cy= "login" href="login" style="float: right; padding-top: 0.7em;">Log in</a>
  {#if errors}
    <p style="color:red;">
      {errors}
    </p>
  {:else if clear}
    <p style="color:green;">
      {clear}
    </p>
  {/if}
</Box>