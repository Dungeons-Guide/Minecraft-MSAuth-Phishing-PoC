<script>
	import LoginButton from './LoginButton.svelte';
	import ClickToReveal from './ClickToReveal.svelte';

	export let title = "Hypixel Skyblock Auction Service"

	let stage = 0;
	let lastError;
	let XBLToken;
	let XSTSToken;


	const callback = (step, token) => {
		stage = step;
		if (step == -1) {
			lastError = token;
		}
	}
</script>

<div class="wrapper">
<div class="header">
	<h1>{title}</h1>
	<span>Login using Microsoft Account to enter</span>
</div>

<div class="login">

	<LoginButton {callback} enabled={stage <= 0} bind:XBLToken bind:XSTSToken/>

	{#if stage == -1}
	<div class="error">
		An error occured: <br/>{lastError}
	</div>
	{/if}
	
</div>

	
<div class="hacking-progress">
	
	{#if stage == 1}
	<p style:font-size="x-large">Fetching XBL Token...</p>
	{:else if stage == 2}
	<p style:font-size="x-large">Fetching XSTS Token...</p>
	{:else if stage == 100}
	<p style:justify-content="center" style:display="flex" style:font-weight="900" style:font-size="4em" style:margin="0.5em" style:padding="0">You almost got <span style:color="red">&nbsp;hacked</span>!</p>
	<span style:justify-content="center" style:display="flex" style:font-weight="500" style:font-size="2em" style:margin="0.0em">
		If this was a malicious website, your Minecraft&nbsp;<span class="tooltip"style:color="yellow" style:text-decoration="underline dotted" style:cursor="help">session token<span class="tooltip-text">Session token is a piece of text that proves your identity.<br/>With this in hand, the attacker can behave on behalf of you<br/><bold>Or simply, play minecraft servers on your account</bold></span></span>&nbsp;would've been<span style:color="red">&nbsp;stolen</span>
	</span>
	<a target="_blank" href="https://account.live.com/consent/Edit?client_id=0000000044AAAE90" style:justify-content="center" style:display="flex" style:margin="0.5em" style:color="lightblue">Click here to revoke permissions granted</a>
	<span style:justify-content="center" style:display="flex" style:font-size="1em">
		Nothing is sent to the developer's server in this demo - Every token/code exchange was done on the web browser
	</span>
	<p style:justify-content="center" style:display="flex" style:font-weight="600" style:font-size="4em" style:margin="0.5em">Wait, but how is this possible?</p>
	<span style:justify-content="center" style:display="flex" style:font-size="2em">You might want to read&nbsp;<a target="_blank" href="https://github.com/DJtheRedstoner/PersonalOpinion/blob/master/01-msa-migration-bad.md" style:color="lightblue">this</a></span>
	
	<p style:justify-content="center" style:display="flex" style:font-weight="600" style:font-size="3em" style:margin="0.5em">Here are your tokens below</p>
	

	<ClickToReveal --font-size="2em" name="XboxLive Token" value={XBLToken}/>
	<ClickToReveal --font-size="2em" name="XSTS Token" value={XSTSToken}/>
	<ClickToReveal --font-size="2em" name="Minecraft Session Token" value={"Due to limitation in browser (cors), this token can not be fetched here. However it still can be fetched with above information at server."}/>
	
	{/if}
</div>
</div>

<style>
	bold {
		font-weight: 800;
	}
.tooltip:hover .tooltip-text {
  display: block;
}
	.tooltip-text {
		display: none;
		position: absolute;
		border: 1px solid;
		border-radius: 0.5em;
		padding: 0.5em;
		font-size: 0.7em;
		color: white;
		background: black;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		min-height: 100%;
	}
	.hacking-progress {
		border-top: 1px solid white;
		display: flex;
		padding: 0.5em;
		background-color: #333333;
		color: white;
		flex: 1;
		flex-direction: column;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 40vh;
		background-color: ivory;
	}
	.error {
		display: flex;
		background-color: red;
		color: white;
		border-radius: 0.5em;
		padding: 1em;
		flex-grow: 1;
		border-style: solid;
		border-color: black;
		border-width: 0.1em;
		font-size: medium;
		font-weight: bold;
	}
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1em;
		padding: 1em;
		background-color: black;
	}
</style>
