<script lang="ts">
  import AeroBackground from '$lib/components/background/AeroBackground.svelte';
  import githubIcon from '$lib/assets/buttons/github.svg';
  import linkedinIcon from '$lib/assets/buttons/linkedin.svg';
  import resumeIcon from '$lib/assets/buttons/resume.svg';
  import contactIcon from '$lib/assets/buttons/contact.svg';
  import backloggdIcon from '$lib/assets/buttons/backloggd.svg';
  import malIcon from '$lib/assets/buttons/mal.svg';
  import letterboxdIcon from '$lib/assets/buttons/letterboxd.svg';
  import popupSvg from '$lib/assets/popup.svg';
  import resumePdf from '$lib/assets/jrg_resume.pdf';

  const email = 'jrgarces@uw.edu';
  let showCopyPopup = $state(false);
  const name = 'Jack Garces';
  const projects = 'Projects';
  const extrasTxt = 'Extras';

  const buttons = [
    { type: 'link', href: 'https://github.com/jackroangarces', icon: githubIcon, alt: 'GitHub' },
    { type: 'link', href: 'https://www.linkedin.com/in/jackroangarces/', icon: linkedinIcon, alt: 'LinkedIn' },
    { type: 'link', href: resumePdf, icon: resumeIcon, alt: 'Resume' },
    { type: 'copy', icon: contactIcon, alt: 'Copy email' }
  ];

  const extras = [
    { type: 'link', href: 'https://backloggd.com/u/utsuro/', icon: backloggdIcon, alt: 'Backloggd' },
    { type: 'link', href: 'https://myanimelist.net/profile/utsvro', icon: malIcon, alt: 'MyAnimeList' },
    { type: 'link', href: 'https://letterboxd.com/sarrasins/', icon: letterboxdIcon, alt: 'Letterboxd' }
  ];

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    showCopyPopup = true;
    setTimeout(() => (showCopyPopup = false), 2000);
  }
</script>

<AeroBackground />

{#if showCopyPopup}
  <div class="copy-popup">
    <img src={popupSvg} alt="" class="copy-popup-bg" />
    <span class="copy-popup-text">copied to clipboard!</span>
  </div>
{/if}

<section class="hero">
  <div class="content">
    <h1 class="aero-title">
      <span class="aero-title-shadow" aria-hidden="true">{name}</span>
      <span class="aero-title-text">{name}</span>
    </h1>
    <p>
      I'm an Informatics student on the software development track at the University of Washington. I've been coding since I was 10 years old when I found MIT's Scratch. Since then I've been determined to study programming and game development.
    </p>
    <nav class="buttons" aria-label="Social and contact links">
      {#each buttons as button}
        {#if button.type === 'link'}
          <a href={button.href} class="button-link" target="_blank" rel="noopener noreferrer">
            <img src={button.icon} alt={button.alt} />
          </a>
        {:else}
          <button type="button" class="button-link" onclick={copyEmail} aria-label={button.alt}>
            <img src={button.icon} alt={button.alt} />
          </button>
        {/if}
      {/each}
    </nav>
    <h1 class="aero-title aero-title--small">
      <span class="aero-title-shadow" aria-hidden="true">{projects}</span>
      <span class="aero-title-text">{projects}</span>
    </h1>
    <p>
      coming soon...
    </p>
    <h1 class="aero-title aero-title--small">
      <span class="aero-title-shadow" aria-hidden="true">{extrasTxt}</span>
      <span class="aero-title-text">{extrasTxt}</span>
    </h1>
    <p>
      Some of my hobbies! Feel free to connect with me on any of these sites.
    </p>
    <nav class="extras" aria-label="Hobbies and extras links">
      {#each extras as button}
        {#if button.type === 'link'}
          <a href={button.href} class="button-link" target="_blank" rel="noopener noreferrer">
            <img src={button.icon} alt={button.alt} />
          </a>
        {:else}
          <button type="button" class="button-link" onclick={copyEmail} aria-label={button.alt}>
            <img src={button.icon} alt={button.alt} />
          </button>
        {/if}
      {/each}
    </nav>
  </div>
</section>