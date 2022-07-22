<template>
  <nav id="sidebar" class="sidebar"  v-if="user">
      <div class="list-group list-group-flush">
        <a
          href="#"
          class="list-group-item list-group-item-action py-2 ripple task"
          aria-current="true"
        >
          <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Task</span>
        </a>
        <a style="bottom: 0; position: absolute" class="nav-link ripple" href="" @click.prevent="logout">
          Logout
        </a>
      </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    if (localStorage.activeUser) {
      let activeUser = localStorage.activeUser;
      this.user = JSON.parse(activeUser);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("activeUser");
      this.$router.push("/");
      window.location.reload();
    },
  },
};
</script>

<style></style>
