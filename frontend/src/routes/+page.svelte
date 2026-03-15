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
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import { copyEmail } from '$lib/stores/copyPopup';
  import miiPose from '$lib/assets/miimariopose.png';
  import ros from '$lib/assets/project-assets/ros.png';
  import seal from '$lib/assets/project-assets/seal.png';
  import vouch from '$lib/assets/project-assets/vouch.png';
  import congress from '$lib/assets/project-assets/congress.png';
  import husky from '$lib/assets/project-assets/husky.png';
  import pop from '$lib/assets/project-assets/pop.png';

  const projectCards = [
    {
      header: 'Popcorn MCP',
      image: pop,
      body: 'Developed a full-stack MCP server and AI agent wrapper integrating project management, tracking, and communication tools into a unified system with persistent context awareness. Built backend APIs and tool interfaces enabling AI agents to retrieve data and trigger workflows through an MCP-based architecture.',
      buttons: [
        { style: 'orange', label: 'Closed Source'}
      ]
    },
    {
      header: 'SEAL Lab Dashboard',
      image: seal,
      body: 'Rebuilt SEAL’s legacy Google Sheets–based workflow into a secure lab-wide web application with improved data architecture and user interface design. Implemented Google OAuth authentication, PostgreSQL database-backed data management, and AI-assisted tooling to streamline research workflows and reduce manual data handling',
      buttons: [
        { style: 'orange', label: 'Closed Source'}
      ]
    },
    {
      header: 'Husky Maps',
      image: husky,
      body: 'Developed HuskyMaps, a web app that helps users find businesses in Seattle and the shortest paths between them. The app synthesizes data structures by leveraging shortest path algorithms, priority queues, deques, and autocomplete.',
      buttons: [
        { style: 'green', label: 'Open Source', href: 'https://github.com/jackroangarces/huskymaps' },
        { style: 'blue', label: 'Live', href: 'https://husky-maps-59fb.onrender.com/#lon=-122.3035&lat=47.6553&zoom=11' }
      ]
    },
    {
      header: 'Congress.AI',
      image: congress,
      body: 'Developed Congress.AI (a web application leveraging AWS Amplify, MongoDB, and AWS Bedrock) as part of a four person team enabling smooth user interaction with bill summaries and voting records for each United States representative.',
      buttons: [
        { style: 'orange', label: 'Closed Source' },
        { style: 'blue', label: 'Demo', href: 'https://devpost.com/software/congress-ai' }
      ]
    },
    {
      header: 'Vouch',
      image: vouch,
      body: 'Developed a web application that helps users discover local small businesses based on unique experiences rather than popularity metrics. Implemented real-time data management with Firebase and built features for creating, reading, updating, and managing business listings to support local economic growth and improve visibility for small businesses.',
      buttons: [
        { style: 'orange', label: 'Coming Soon' },
        { style: 'blue', label: 'Live', href: 'https://vouch-f1ff1.web.app/' }
      ]
    },
    {
      header: 'Resume Optimizer',
      image: ros,
      body: 'Developed a web application that allows users to build, share, and optimize their SWE resume. Implemented AI resume feedback by comparing extracted job requirements with resume content, improving alignment with ATS filters.',
      buttons: [
        { style: 'green', label: 'Open Source', href: 'https://github.com/jackroangarces/resume-optimization-assistant' },
        { style: 'blue', label: 'Live', href: 'https://resume-optimization-syst-543be.web.app/' }
      ]
    },
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
    <img src={miiPose} alt="my Mii avatar" class="miipose" />
    <h1 class="aero-title aero-title--small" id="projects">
      <span class="aero-title-shadow" aria-hidden="true">{projects}</span>
      <span class="aero-title-text">{projects}</span>
    </h1>
    <p>
      coming soon...
    </p>
  </div>
  <div class="project-cards">
    {#each projectCards as card}
      <ProjectCard
        header={card.header ?? ''}
        image={card.image}
        body={card.body ?? ''}
        buttons={card.buttons ?? []}
      />
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