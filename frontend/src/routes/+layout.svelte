<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import popupSvg from '$lib/assets/popup.svg';
	import Turbine from '$lib/components/Turbine.svelte';
	import { theme } from '$lib/stores/theme';
	import { copyEmail, showCopyPopup } from '$lib/stores/copyPopup';
	let { children } = $props();
	import '../app.css';

	function scrollToTop() {
		document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
	}

	function scrollToSection(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	$effect(() => {
		const isDark = $theme;
		document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preload" href={popupSvg} as="image" />
</svelte:head>

{#if $showCopyPopup}
	<div class="copy-popup">
		<img src={popupSvg} alt="" class="copy-popup-bg" />
		<span class="copy-popup-text">email copied to clipboard!</span>
	</div>
{/if}

<nav class="navbar" aria-label="Main navigation">
	<button type="button" class="nav-text-btn" onclick={scrollToTop}>About</button>
	<button type="button" class="nav-text-btn" onclick={() => scrollToSection('projects')}>Projects</button>
	<button type="button" class="nav-text-btn" onclick={() => scrollToSection('extras')}>Extras</button>
	<button type="button" class="nav-text-btn" onclick={copyEmail}>Contact</button>
	<button type="button" class="nav-text-btn" onclick= {window.open('https://github.com/jackroangarces/personalwebsite', '_blank')}>Source</button>
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
