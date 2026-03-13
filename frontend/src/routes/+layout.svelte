<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import Turbine from '$lib/components/Turbine.svelte';
	import { theme } from '$lib/stores/theme';
	let { children } = $props();
	import '../app.css';

	function scrollToTop() {
		document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
	}

	$effect(() => {
		const isDark = $theme;
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar" aria-label="Main navigation">
	<button type="button" class="nav-text-btn">About</button>
	<button type="button" class="nav-text-btn">Projects</button>
	<button type="button" class="nav-text-btn">Contact</button>
	<button
		type="button"
		class="theme-toggle"
		onclick={() => theme.toggle()}
		aria-label={$theme ? 'Switch to light mode' : 'Switch to dark mode'}
		title={$theme ? 'Light mode' : 'Dark mode'}
	>
		<span class="theme-toggle-track">
			<span class="theme-toggle-knob" class:on={$theme}></span>
		</span>
	</button>
</nav>

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
