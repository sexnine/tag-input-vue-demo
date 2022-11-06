import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import library from "./fontAwesome";

library;

const app = createApp(App);

app.component("fa-icon", FontAwesomeIcon);

app.mount("#app");
