<script>
    import { DateTime } from "luxon";
    import { doFetch } from '../_components/Fetcher.js';
    import { stores } from '@sapper/app';
    const { session } = stores();
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    
    export let 
    errors="",
    index,
    categorie=0,
    table;

    $:cell_def= table.categories[categorie].rows.length>0?table.categories[categorie].rows.find(function(item) {return item.row ===index}):"";

    $:cell= cell_def?cell_def.cell:"";
    let editing = false, 
        background="inherit",
        color= "inherit",
        align= "inherit";
    
    function formatCell(val){
        const code=val.substring(0,1),
            sub=val.substring(1);
        switch(code) {
            case "#":
                const date = DateTime.fromISO(sub);
                align= "right";
                formatBackground(date);
                if(date.invalid === null){
                    return date.toLocaleString();
                }else{
                    return "#Invalid date."
                }
                
                break;
        }
        align= "inherit";
        background="inherit";
        color="inherit";
        return val;
    }

    function formatBackground(d){
        if(d.invalid!==null){
            background="#383838";
            color="red";
            return;
        }
        const now = DateTime.local();

        if( now.plus({days: 14}) < d){
            background="#42f542";
            return;
        }else if( now.plus({days: 13}) < d){
            background="#55f542";
            return;
        }else if( now.plus({days: 12}) < d){
            background="#71f542";
            return;
        }
        else if( now.plus({days: 11}) < d){
            background="#8df542";
            return;
        }
        else if( now.plus({days: 10}) < d){
            background="#a9f542";
            return;
        }
        else if( now.plus({days: 9}) < d){
            background="#c6f542";
            return;
        }
        else if( now.plus({days: 8}) < d){
            background="#e2f542";
            return;
        }
        else if( now.plus({days: 7}) < d){
            background="#f5eb42";
            return;
        }
        else if( now.plus({days: 6}) < d){
            background="#f5cf42";
            return;
        }
        else if( now.plus({days: 5}) < d){
            background="#f5b242";
            return;
        }
        else if( now.plus({days: 4}) < d){
            background="#f59642";
            return;
        }
        else if( now.plus({days: 3}) < d){
            background="#f57a42";
            return;
        }
        else if( now.plus({days: 2}) < d){
            background="#f55e42";
            return;
        }
        else if( now < d){
            background="#F54242";
            return;
        }
        else{
            background="#383838";
            color="white";
            return;
        }
    }

    function handleEdit(){
        if(event.keyCode && event.keyCode !=13){return}
        editing = false;
        if(event.target.value==cell){return}
        
        if(event.target.value===""){
            doFetch(
                './tableAPI/drop-cell',
                "DELETE", 
                JSON.stringify({
                token: $session.user,
                table: table._id,
                categorie: categorie,
                row: index
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
        }else{
            doFetch(
                './tableAPI/update-cell',
                "PATCH", 
                JSON.stringify({
                token: $session.user,
                table: table._id,
                categorie: categorie,
                row: index,
                cell: event.target.value
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
    }

</script>
<style>
    td {
        border: 1px solid #ddd;
        padding: 8px;
    }
    td:hover {
		border: 2px solid rgb(41, 62, 255);
	}
</style>
{#if editing}
    <td>
        <input
            value={cell} 
            on:focusout={handleEdit} 
            on:keydown={handleEdit} 
            autofocus
        />
    </td>
{:else}
    <td on:click={()=>{editing=true}} style={"background-color:" +background + "; color:"+color+"; text-align:"+align+";"}>
        {#if cell}
            {formatCell(cell)}
        {:else}
            <p></p>
        {/if}
    </td>
    
{/if}
