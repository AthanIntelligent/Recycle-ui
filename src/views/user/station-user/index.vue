<template>
  <div class="app-container">
    <station-user-table/>
  </div>
</template>

<script>
import StationUserTable from './components/StationUserTable'

export default {
  name: 'StationUser',
  components: {StationUserTable}
}
</script>
