import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export default defineStore("user", () => {
  const userId: Ref<string> = ref("my-user-id");

  return {
    userId,
  };
});
