<script>
	import { goto, stores } from '@sapper/app';
    
    const { session } = stores();
    $: re = ($session.user)?goto('/'):"";
    
</script>