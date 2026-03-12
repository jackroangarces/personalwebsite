<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import Turbine from '$lib/components/Turbine.svelte';
	let { children } = $props();
	import '../app.css';

	function scrollToTop() {
		document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar" aria-label="Main navigation"></nav>

<main class="main-content" id="top">
	{@render children()}
</main>

<div class="turbine-wrapper">
	<Turbine scale={0.8} baseSpeed={0.5} maxSpeed={2} />
	<Turbine scale={1} baseSpeed={1} maxSpeed={4} />
</div>

<footer class="footer">
	<button type="button" class="back-to-top" onclick={scrollToTop}>Back to top</button>
</footer>
