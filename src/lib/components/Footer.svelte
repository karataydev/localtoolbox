<script lang="ts">
    import Icon from "@iconify/svelte";
</script>

<footer class="border-t border-stone-300 bg-neutral-50 py-6 mt-8">
    <div class="container mx-auto px-4 md:px-8">
        <div
            class="flex flex-col md:flex-row items-center gap-4 text-sm text-stone-600 font-mono md:grid md:grid-cols-3"
        >
            <!-- Left: GitHub Link -->
            <a
                href="https://github.com/karataydev"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 hover:text-stone-800 transition-colors md:justify-start"
            >
                <Icon icon="mdi:github" width="20" height="20" />
                <span>@karataydev</span>
            </a>

            <!-- Center: Copyright -->
            <div class="flex items-center justify-center gap-2">
                <Icon icon="mdi:copyright" width="16" height="16" />
                <span>2025 localtoolbox.app</span>
            </div>

            <!-- Right: Support Email -->
            <a
                href="mailto:contact@localtoolbox.app"
                class="flex items-center gap-2 hover:text-stone-800 transition-colors md:justify-end"
            >
                <Icon icon="mdi:email-outline" width="20" height="20" />
                <span>contact@localtoolbox.app</span>
            </a>
        </div>
    </div>
</footer>
