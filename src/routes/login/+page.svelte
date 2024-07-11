<script>
    import { goto } from '$app/navigation';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';


    let passphrase = '';
    const correctPassphrase = 'noPuntIntendedRulez!';
    let loginError = false;

    function handleLogin() {
        if (passphrase === correctPassphrase) {
            localStorage.setItem('isAuthenticated', 'true');
            goto('/');
        } else {
            loginError = true;
        }
    }
</script>

<style>
    .buttonHolder {
        text-align: center;
        margin: 2em 0 4em;
    }
    .errorMessage {
        color: red;
        font-weight: bold;
        text-align: center;
    }
</style>

<div>
    
    <div class="buttonHolder">
        <Textfield
            class="shaped-outlined"
            variant="outlined"
            bind:value={passphrase}
            type="password"
            label="Enter Passphrase..."
            on:keydown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <Button on:click={handleLogin}>
            <Label>Login</Label>
        </Button>
    </div>

    {#if loginError}
        <p class="errorMessage">Incorrect passphrase. Please try again.</p>
    {/if}
</div>