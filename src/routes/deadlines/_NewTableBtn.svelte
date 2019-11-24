<script>
    import { doFetch } from '../_components/Fetcher.js';
    import { stores } from '@sapper/app';
    const { session } = stores();
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import {activeTableIndex} from '../_components/Stores.js';
    export let 
        errors ="",
        size=0;

    let tableBase ={
        name:"",
        selected: true,
        rows:[]
    };
    
    async function handleNewTable(){
        tableBase.name = prompt("What do you want the new table to be called?", "New table");
        doFetch(
            './tableAPI/create',
            "POST", 
            JSON.stringify({
          token: $session.user,
          tableName: tableBase.name,
          categories: [tableBase]
        })
            ).then(function(response) {
                if(!response.ok){
                    response.text().then(function(data) {
                        errors =data;
                    });
                }else{
                    dispatch("update");
                    activeTableIndex.set(size);
                }
            });
    }
</script>
<button class="btn-p" on:click={handleNewTable}>new table</button>