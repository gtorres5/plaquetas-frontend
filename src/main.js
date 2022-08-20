import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";

// Introducir visor de imágenes
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

//const app = createApp(App).mount("#app");
const app = createApp(App);
app.use(VueViewer);
app.mount("#app");
