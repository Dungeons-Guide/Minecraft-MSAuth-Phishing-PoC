<script>
    export let name, value;

    let revealed = false;
</script>

<div class="wrapper">
{#if revealed}
<pre>{value}</pre>&nbsp;<span class="hide" on:click={() => revealed=false}>hide</span>
{:else}
<span class="reveal" on:click={() => revealed=true}>Click to reveal your {name}</span>
{/if}
</div>

<style>
    .wrapper {
        padding: 0.1em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .reveal {
        cursor: pointer;
        display: flex;
        justify-content: center;
    }
    .hide {
        cursor: pointer;
        color: gray;
    }
    pre {
        background-color: black;
        padding: 0.5em;
        word-break: break-all;
        white-space: pre-wrap;
    }
</style>