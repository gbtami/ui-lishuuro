<template>
  <div class="player-social">
    <div class="btn-rack">
      <a class="icon icon-tv" href="" title="Watch games"></a>
      <a
        class="icon icon-crossedswords"
        href=""
        title="Challenge to a game"
      ></a>
      <a class="icon icon-cloud-upload" href="/paste" title="Import game"></a>
      <a
        class="icon icon-download"
        href=""
        download="someone.pgn"
        title="Export games"
      ></a>
      <a
        class="icon icon-at"
        v-if="props.reg"
        :href="`https://lichess.org/@/${props.username}`"
        rel="noopener"
        target="_blank"
        title="Lichess profile"
      ></a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ username: string; reg: boolean }>();
</script>

<style>
.player-social {
  display: flex;
  background: var(--bg-color2);
  justify-content: flex-end;
}

.btn-rack {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  margin: 1em;
}
.btn-rack a {
  justify-content: center;
  padding: 0 0.6em;
  text-align: center;
  line-height: 2rem;
  cursor: pointer;
  border-right: 1px solid var(--border-color);
  color: var(--font-color);
}
[class*=" icon-"]::before {
  line-height: 2rem;
}
.i-at,
.i-tv,
.i-dl,
.i-ch {
  float: right;
  padding: 0px 4px 0px 4px;
  color: #505050;
  text-decoration: none;
}
</style>
