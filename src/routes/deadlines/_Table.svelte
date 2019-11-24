<script>
    import Categorie from './_Categorie.svelte';
    import Cell from './_Cell.svelte';
    export let table ="", errors="";
    
    let pref_rows=10;
    $: rows = table?(((table.height<pref_rows-1)?pref_rows:(table.height+1))):pref_rows;
</script>
<style>
    table {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    margin: 0 auto;
    min-width: 30em;
    }

    tr:nth-child(even){background-color: #f2f2f2;}

    tr:not(:first-child):hover {border-bottom: 2px dashed rgba(41, 62, 255, 0.6);}


</style>
<table data-cy="deadlines-table">
    {#if table}
        <tr>
            {#each table.categories.filter(item => item.selected) as cat, categorie}
                <Categorie {table} {categorie} bind:errors={errors} on:update></Categorie>
            {/each}
        </tr>
        {#each { length: rows } as _, index}
            <tr>
                {#each table.categories.filter(item => item.selected) as cat, categorie}
                    <Cell {table} {categorie} bind:errors={errors} {index} on:update></Cell>
                {/each}
            </tr>
        {/each}
    {/if}
</table>
