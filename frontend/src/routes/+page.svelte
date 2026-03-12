<script lang="ts">
  import AeroBackground from '$lib/components/background/AeroBackground.svelte';
  import githubIcon from '$lib/assets/buttons/github.svg';
  import linkedinIcon from '$lib/assets/buttons/linkedin.svg';
  import resumeIcon from '$lib/assets/buttons/resume.svg';
  import contactIcon from '$lib/assets/buttons/contact.svg';

  const email = 'jrgarces@uw.edu';
  const name = 'Jack Garces';
  const projects = 'Projects';

  const buttons = [
    { type: 'link', href: 'https://github.com/jackroangarces', icon: githubIcon, alt: 'GitHub' },
    { type: 'link', href: 'https://www.linkedin.com/in/jackroangarces/', icon: linkedinIcon, alt: 'LinkedIn' },
    { type: 'link', href: '#', icon: resumeIcon, alt: 'Resume' },
    { type: 'copy', icon: contactIcon, alt: 'Copy email' }
  ];

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
  }
</script>

<AeroBackground />

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
    <h1 class="aero-title">
      <span class="aero-title-shadow" aria-hidden="true">{projects}</span>
      <span class="aero-title-text">{projects}</span>
    </h1>
  </div>
</section>

<section class="spacer">
  <h2>Projects</h2>
</section>