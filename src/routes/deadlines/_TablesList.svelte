<script>
    import {activeTableIndex} from '../_components/Stores.js';

    export let tables = "";

    function handleSelection(e){
        activeTableIndex.set(e.target.selectedIndex);
        
    }
</script>
{#if tables}
    <select on:change={handleSelection} style={tables.length>0?"":"opacity:0"}>
    {#each tables as table, i}
        <option selected={i===$activeTableIndex}>
            {table.tableName}
        </option>
    {/each}
    </select>
{/if}