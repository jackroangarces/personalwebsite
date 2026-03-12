<script lang="ts">
  import AeroBackground from '$lib/components/background/AeroBackground.svelte';
</script>

<AeroBackground />

<section class="hero">
  <div class="content">
    <h1>Jack Garces</h1>
    <p>
      Lorem Ipsum.
    </p>
  </div>
</section>

<section class="spacer">
  <h2>Projects</h2>
</section>

<style>
  .hero {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 2rem;
    text-align: center;
  }

  .content {
    max-width: 800px;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    margin: 0 0 1rem 0;
  }

  p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    margin: 0;
  }

  .spacer {
    min-height: 120vh;
    position: relative;
    z-index: 1;
    padding: 4rem 2rem;
  }
</style>