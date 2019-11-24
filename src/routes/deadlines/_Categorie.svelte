<script>
    import { doFetch } from '../_components/Fetcher.js';
    import { stores } from '@sapper/app';
    const { session } = stores();
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let
        errors="", 
        categorie=0,
        table;
    let editing=false;
    $: selected_categorie=table.categories[categorie];
    
    async function handleEdit(event){
        if(event.keyCode && event.keyCode !=13){return}
        editing = false;
        if(event.target.value==categorie){return}
        doFetch(
            './tableAPI/update-categorie',
            "PATCH", 
            JSON.stringify({
            token: $session.user,
            table: table._id,
            categorie: categorie,
            name: event.target.value
        })
            ).then(function(response) {
                if(!response.ok){
                    response.text().then(function(data) {
                        errors =data;
                    });
                }else{
                    dispatch("update");
                }
            });
    }
    function handleSort(){
        alert("handleSort")
    }
</script>
<style>
    th {
        max-width: 6em;
        border: 1px solid #ddd;
        padding: 4px;
        text-align: left;
        background-color: rgb(60, 91, 232);
        color: white;
    }
    button{
        background-color: rgb(0, 0, 0,0);
        color:white;
        border:none;
    }
    .editor{
        opacity: 0;
    }
    .editor:hover{
        opacity: 1;
    }
</style>
<th>
    {#if editing}
        <!-- svelte-ignore a11y-autofocus -->
        <input 
            value={selected_categorie.name} 
             
            on:keydown={handleEdit}
        />
        <button class='editor' on:click={()=>{editing=false}}>
            (X)
        </button>
    {:else}
    
        <big on:click={handleSort}>
            {selected_categorie.name}
        </big>
        <button class='editor' on:click={()=>{editing=true}}>
            (E)
        </button>
    
    {/if}
</th>