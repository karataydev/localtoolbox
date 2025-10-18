<script lang="ts">
    import type { Tool } from "$lib/types/tool";

    export let tool: Tool;
</script>

<a href="/tools/{tool.slug}" class="tool-card flex">
    <div class="icon">{tool.icon}</div>
    <h3 class="">{tool.name}</h3>
    <p>{tool.description}</p>
    {#if tool.tags}
        <div class="tags">
            {#each tool.tags as tag}
                <span class="tag">{tag}</span>
            {/each}
        </div>
    {/if}
</a>
