<script>
    export let name, value;

    let revealed = false;
</script>

<div class="wrapper">
{#if revealed}
{value} <span class="hide" on:click={() => revealed=false}>hide</span>
{:else}
<span class="reveal" on:click={() => revealed=true}>Click to reveal your {name}</span>
{/if}
</div>

<style>
    .wrapper {
        padding: 0.1em;
    }
    .reveal {
        cursor: pointer;
    }
    .hide {
        cursor: pointer;
        color: gray;
    }
</style>