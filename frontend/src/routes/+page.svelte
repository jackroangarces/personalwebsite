<script lang="ts">
  import AeroBackground from '$lib/components/background/AeroBackground.svelte';
  import githubIcon from '$lib/assets/buttons/github.svg';
  import linkedinIcon from '$lib/assets/buttons/linkedin.svg';
  import resumeIcon from '$lib/assets/buttons/resume.svg';
  import contactIcon from '$lib/assets/buttons/contact.svg';
  import backloggdIcon from '$lib/assets/buttons/backloggd.svg';
  import malIcon from '$lib/assets/buttons/mal.svg';
  import letterboxdIcon from '$lib/assets/buttons/letterboxd.svg';
  import resumePdf from '$lib/assets/jrg_resume.pdf';
  import projectCardSvg from '$lib/assets/project-card.svg';
  import { copyEmail } from '$lib/stores/copyPopup';

  const projectCards = [
    {},
    {},
    {},
    {},
    {},
    {},
  ];
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

</script>

<AeroBackground />

<section class="hero">
  <div class="content" id="about">
    <h1 class="aero-title">
      <span class="aero-title-shadow" aria-hidden="true">{name}</span>
      <span class="aero-title-text">{name}</span>
    </h1>
    <p>
      I'm an Informatics student on the software development track at the University of Washington. 
      I've been coding since I was 10 years old when I found MIT's Scratch. 
      Since then, I've been determined to study both programming and game development.
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
    <h1 class="aero-title aero-title--small" id="projects">
      <span class="aero-title-shadow" aria-hidden="true">{projects}</span>
      <span class="aero-title-text">{projects}</span>
    </h1>
    <p>
      coming soon...
    </p>
  </div>
  <div class="project-cards">
    {#each projectCards as _}
      <div class="project-card">
        <img src={projectCardSvg} alt="" class="project-card-frame" />
        <div class="project-card-content"></div>
      </div>
    {/each}
  </div>
  <div class="content">
    <h1 class="aero-title aero-title--small" id="extras">
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