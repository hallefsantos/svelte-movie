<script>

   export let label = '';

</script>

<div class="mb-3">
   <span>{label}:</span>
   <div class="text-2xl text-green-400">
      <slot></slot>
   </div>
</div>