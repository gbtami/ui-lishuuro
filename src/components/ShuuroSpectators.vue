<template>
  <div class="round__underchat">
    <div class="chat__members" aria-live="off" data-watched="1">
      <div class="chat__members__inner">
        <div class="chat__members__number" title="Spectators">
          {{ fmtCount() }}
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useShuuroStore2 } from "@/store/useShuuroStore2";

const store = useShuuroStore2();

function fmtCount(): string {
  let count = store.$state.watchCount!;
  if (count <= 2) {
    return "";
  }
  return `Spectators: ${count - 2}`;
}
</script>
<style></style>
