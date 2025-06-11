<script>
  import Icon from '@smui/icon-button'; // Using IconButton's Icon for Material Icons

  export let iconName = 'info'; // Default icon
  export let message = 'No information available.';
</script>

<style>
  .empty-state-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 3em 1em; /* Similar to 'nothingYet' but with horizontal margin */
    color: var(--g555); /* Using a theme variable for text color */
  }

  .empty-state-icon {
    font-size: 3em; /* Make icon larger */
    margin-bottom: 0.5em;
  }

  .empty-state-message {
    font-size: 1.1em;
  }
</style>

<div class="empty-state-container">
  <div class="empty-state-icon">
    <Icon class="material-icons">{iconName}</Icon>
  </div>
  <p class="empty-state-message">{message}</p>
</div>
