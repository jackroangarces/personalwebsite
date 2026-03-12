<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
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

<footer class="footer">
	<button type="button" class="back-to-top" onclick={scrollToTop}>Back to top</button>
</footer>
