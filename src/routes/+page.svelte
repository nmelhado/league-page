<script>
  import Transactions from '$lib/Transactions/Transactions.svelte';
</script>

<style>
  :global(body) {
    margin: 0;
    padding: 0; /* simple dark background */
    font-family: system-ui, sans-serif;
  }

  .page-wrapper {
    min-height: 100vh;
    padding: 2rem 1rem;
  }

  .hero {
    color: var(--heroText);
    padding: 4rem 2rem 3rem 2rem;
    text-align: center;
    border-radius: 2rem;
    margin-bottom: 2.5rem;
  }

  .hero-title {
    font-size: 2.8rem;
    font-weight: 900;
    margin-bottom: 2rem;
    letter-spacing: 1px;
  }

  .cta-btn {
    background: var(--fff);
    color: var(--buttonPrimary);
    border: none;
    border-radius: 2rem;
    padding: 0.75rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(146, 5, 5, 0.09);
  }

  .cta-btn:hover {
    background: var(--buttonPrimary);
    color: var(--buttonText);
  }

  .sections {
    width: 100%;
    margin-bottom: 2.5rem;
  }
</style>

<div class="page-wrapper">
  <div class="hero">
    <div class="hero-title">Welcome to Veto City</div>
    <a href="/drafts"><button class="cta-btn">View League Drafts</button></a>
  </div>

  <div class="sections">
    <Transactions />
  </div>
</div>
