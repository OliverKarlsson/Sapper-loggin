<script>
    import Private from '../_components/Private.svelte';
    import Table from './_Table.svelte';
    import Tables from './_TablesList.svelte';
    import NewTableBtn from './_NewTableBtn.svelte';
    import EditBtn from './_EditColumnsBtn.svelte';
    import {activeTableIndex} from '../_components/Stores.js';
    import { doFetch } from '../_components/Fetcher.js';
    import { stores } from '@sapper/app';
    const { session } = stores();

    $: currentUser = $session.user?username():"";
    $:width=window.innerWidth;
    
	
	function username(){
		try{
			return " "+JSON.parse(window.atob($session.user.split('.')[1])).userName;
		}catch(e){
			return "username";
		}
	}

    let errors ="",
        tables ="",
        active;
    $: alarm=errors?alert(errors):undefined;

    const unsubscribe = activeTableIndex.subscribe(value => {
		active = value;
	});

    $:active_table=tables?tables[active]:"";
    
    fetchTables();
    function fetchTables(){
        doFetch(
        '/tableAPI/tables',
        'POST',
        JSON.stringify({
            token:$session.user
            })
        ).then(response => {
            response.json().then(function(data) {
                tables =data;

            });
        }).catch((err)=>{
            errors=err;
            console.log(err);
        });
    }
</script>
<style>
    .small{
        max-width: 30em;
        min-width: 28em;
        font-weight: 300;
		top: 6em;
        padding: 5px;
        margin: auto;
        margin-bottom: 5px;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        border-bottom: 1px solid rgb(55, 0, 255);
    }
    h2{display:inline-block;}
</style>
<svelte:window on:resize={()=>{width=window.innerWidth}}/>
<Private>
    {#if active_table}
            <div class="small">
                    <h2><small>Tables:</small></h2>
                    <Tables bind:tables={tables}/>
                    <NewTableBtn bind:errors={errors} size={tables.length} on:update={fetchTables}/>
                    <EditBtn table={active_table} on:update={fetchTables}/>
                    
                
            </div>
        <Table bind:table={active_table} bind:errors={errors} on:update={fetchTables}/>
        
    {:else}
        <h2>Welcome{currentUser}!</h2>
        <h2><small>You have no tables <em>yet</em></small>.</h2>
        <NewTableBtn bind:errors={errors} size={tables.length} on:update={fetchTables}/>
    {/if}
</Private>