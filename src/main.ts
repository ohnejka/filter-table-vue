import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/apps/main/ui/index.vue";
import router from "@/apps/main/infrasturcture/router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
