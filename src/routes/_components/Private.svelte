<script>
	import { goto, stores } from '@sapper/app';
    
    const { session } = stores();
    $: re = (!$session.user)?goto('/login'):"";
    
</script>
{#if $session.user}
<slot></slot>
<a data-cy="login" href="login" style="display:none;">login</a>
<a data-cy="register" href="register" style="display:none;">register</a>
{/if}