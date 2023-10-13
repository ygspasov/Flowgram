import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./firebase/firebase";

import "./index.css";
import "flowbite";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faPenToSquare, faTrash, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faPenToSquare, faTrash, faThumbsUp);

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
