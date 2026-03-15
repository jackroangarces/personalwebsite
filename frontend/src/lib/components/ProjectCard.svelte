<script lang="ts">
  import projectCardSvg from '$lib/assets/project-card.svg';
  import { projectButtonStyles, type ProjectButtonStyle } from '$lib/assets/projectButtons';

  let { header = '', image = undefined, body = '', buttons = [] }: {
    header?: string;
    image?: string;
    body?: string;
    buttons?: Array<{
      style: ProjectButtonStyle;
      label: string;
      href?: string;
      onClick?: () => void;
    }>;
  } = $props();
</script>

<div class="project-card">
  <img src={projectCardSvg} alt="" class="project-card-frame" />
  <div class="project-card-content">
    {#if header}
      <h3 class="project-card-header">{header}</h3>
    {/if}
    {#if image}
      <div class="project-card-image-wrap">
        <img src={image} alt="" class="project-card-image" />
      </div>
    {/if}
    {#if body}
      <p class="project-card-body">{body}</p>
    {/if}
    {#if buttons.length > 0}
      <div class="project-card-buttons">
        {#each buttons.slice(0, 2) as btn}
          {#if btn.style === 'orange'}
            <span
              class="project-card-btn project-card-btn--static"
              style="--btn-bg: url({projectButtonStyles[btn.style]})"
            >
              {btn.label}
            </span>
          {:else if btn.href}
            <a
              href={btn.href}
              class="project-card-btn"
              style="--btn-bg: url({projectButtonStyles[btn.style]})"
              target="_blank"
              rel="noopener noreferrer"
            >
              {btn.label}
            </a>
          {:else}
            <button
              type="button"
              class="project-card-btn"
              style="--btn-bg: url({projectButtonStyles[btn.style]})"
              onclick={btn.onClick}
            >
              {btn.label}
            </button>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>
