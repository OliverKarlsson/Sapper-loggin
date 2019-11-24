
<script>
  import { goto, stores } from '@sapper/app';
  import Public from './_components/Public.svelte';
  import Box from './_components/Box.svelte';
  import { doFetch } from './_components/Fetcher.js';
    
    const { session } = stores();
    let email = "", 
      password = "",
      errors = false;
function handleGuestLogin() {
  email="guest@joke.com";
  password="password";
  handleLogin();
}
    async function handleLogin() {
      /*
      fetch('./auth/login', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify({email, password}) // body data type must match "Content-Type" header
      }).then(function(response) {
          let u = response.headers.get('AuthToken');
          
          if(u){
            session.set({ user:  u});
            goto('/');
          }else{
            errors=true;
          }
          
      });
      */
     doFetch(
       './auth/login',
       "POST", 
       JSON.stringify({email, password})
       ).then(function(response) {
          let u = response.headers.get('AuthToken');
          
          if(u){
            session.set({ user:  u});
            goto('/');
          }else{
            errors=true;
          }
          
      });
	}
</script>
<Public/>
<Box>
<h1 style="text-align: center;">Login</h1>

<p>Email:</p>
<input data-cy = "email" type="email" bind:value={email}/>
<p>Password:</p>
<input data-cy = "password" type="password" bind:value={password}/>
<p></p>
<button data-cy = "logsin" on:click={handleLogin} class="btn-p">
    Log in
</button>
<a data-cy= "register" on:click={handleGuestLogin} href="/" 
style="float: right; padding: 0.4em 0 0 0.5em; color:#0011ff;">Or login as guest</a>
{#if (errors)}
  <p style="color:red;">
    Wrong username or password.
  </p>
{/if}
</Box>