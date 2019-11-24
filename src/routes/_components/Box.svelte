<style>
	.box {
		width: 50%;
        max-width: 25em;
		border: 1px solid rgba(0, 4, 255, 0.1);
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		padding: 1em;
        margin: 0 auto; 
        text-align: center;
    }
    .container{
        padding: 20px 0;
        display: inline-block;
        text-align: left;
    }
</style>

<div class="box">
    <div class="container">
        <slot></slot>
    </div>
</div>