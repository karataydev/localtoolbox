<script lang="ts">
    import StoneToast from "./StoneToast.svelte";
    import { useToast } from "$lib/stores/toast.svelte";

    const toast = useToast();
</script>

<StoneToast bind:show={toast.show} message={toast.message} duration={toast.duration} />
