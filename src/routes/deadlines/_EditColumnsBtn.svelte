<script>
    import { doFetch } from '../_components/Fetcher.js';
    import { stores } from '@sapper/app';
    const { session } = stores();
    import Modal from '../_components/Modal.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	
	
	
	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

    export let table;

    let showModal = false, elements=[];
    
    $:mkElem= table?makeElements():undefined;
    



    function makeLabelText(val){
        if(val.replace(/\s/g, '')===""){
            val='Column named: "' +val+'"';
        }else if(val.length>17){
			val=val.substring(0,14)+"...";
		}
        return val;
    }

    function makeElements(){
		let elm = [];
		table.categories.forEach(function(element, index){
            
			elm.push({id:index, focused:element.selected, description:element.name, rows:element.rows})
        });
        elements = elm;
        uid = elements.length
	}

	let uid;

	function add(input) {
        let r = false;
        elements.forEach(function(e){
            if(e.description===input.value){
                alert("Column with that name already exist.");
                r=true;
                return;
            }
        });
        if(r)
            return
        const element = {
			id: uid++,
			focus: false,
            description: input.value,
            rows:[]
		};
		elements = [...elements,element];
		input.value = '';
	}
	
	function remove(element) {
		elements = elements.filter(e => e !== element);
	}
	
	
	
	function dragstart(e, item) {
        e.dataTransfer.setData("application/json", JSON.stringify(item));
}

function closestLabel(target) {
    if (target) {
        return target.closest("label");
    }
}

function dragover(e) {
    if (closestLabel(e.target)) {
        e.preventDefault();
    } else {
        return false;
    }
}

function drop(e, zone) {
    const subject = JSON.parse(e.dataTransfer.getData("application/json"));
    const subjectIndex = elements.findIndex((elem) => elem.id === subject.id);
    const zoneIndex = elements.findIndex((elem) => elem.id === zone.id);
    const swap = elements.splice(subjectIndex, 1)[0];
    elements.splice(zoneIndex, 0, swap);
    elements = elements;
}

function modalClose(){
    let categories = [], anySelected=false;
	elements.forEach(function(el, i){
        let categorie ={};
        categorie.name=el.description;
        categorie.selected=el.focused;
        categorie.rows=el.rows;
		if(el.focused){
            anySelected=true;
        }
        categories.push(categorie);
    });
    if(!anySelected){
        alert("Select 1 or more column(s).");
        return
    }
    doFetch(
            './tableAPI/update',
            "PATCH", 
            JSON.stringify({
          token: $session.user,
          table: table._id,
          categories: categories
        })
            ).then(function(response) {
                if(!response.ok){
                    response.text().then(function(data) {
                        alert(data);
                    });
                }else{
                    dispatch("update");
                    showModal = false;
                }
            });

    
}
</script>
<button class="btn-p" on:click={()=>{showModal=true}}>
    edit columns
</button>
{#if showModal}
	<Modal on:close={()=>{showModal = false}} on:closeByBtn={modalClose}>
        <input slot="header" class="new-todo" placeholder="New columns goes here" on:keydown="{event => event.which === 13 && add(this)}">
        
        <div class='left'>
            <h2>Absent</h2>
            {#each elements.filter(e => !e.focused) as elem (elem.id)}
                <label
                    in:receive="{{key: elem.id}}"
                    out:send="{{key: elem.id}}"
                    animate:flip
                >
                    <input type=checkbox bind:checked={elem.focused} >
                    {makeLabelText(elem.description)}
                    <button on:click="{() => remove(elem)}">X</button>
                </label>
            {/each}
        </div>
        
        <div class='right'>
            <h2>Focused</h2>
            {#each elements.filter(e => e.focused) as elem (elem.id)}
                <label
                    in:receive="{{key: elem.id}}"
                    out:send="{{key: elem.id}}"
                    animate:flip
                    draggable="true"
                    on:dragstart={e => dragstart(e, elem)}
                    on:dragover={dragover}
                    on:drop={e => drop(e, elem)}
                >
                    <input type=checkbox bind:checked={elem.focused}>
                    {makeLabelText(elem.description)}
                    <button on:click="{() => remove(elem)}">X</button>
                </label>
            {/each}
            
        </div>
	</Modal>
{/if}
<style>
    .new-todo {
		font-size: 1.4em;
        width: 20em;
		margin: 2em 0 1em 0;
	}

	.left, .right {
		float: left;
		width: 50%;
		padding: 0 1em 0 0;
		box-sizing: border-box;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
	}

	label {
		top: 0;
		left: 0;
		display: block;
		font-size: 1em;
		line-height: 1;
		padding: 0.5em;
		margin: 0 auto 0.5em auto;
		border-radius: 2px;
		background-color: #eee;
		user-select: none;
	}

    input { 
        margin: 0;
    }

	.right label {
		background-color: rgb(55, 0, 255);
		color:white;
	}

	button:not(.btn-p) {
		float: right;
		height: 1em;
		box-sizing: border-box;
		padding: 0 0.5em;
		line-height: 1;
		background-color: transparent;
		border: none;
		color: rgb(170,30,30);
		opacity: 0;
		transition: opacity 0.2s;
	}
	
	.right button {
		color:white;
	}
	
	label:hover button {
		opacity: 1;
	}
</style>