<template>
  <div class="about">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); background: #dcebc8"
      title="Detail Page"
      sub-title=""
    >
      <template #extra>
        <a-button key="3" @click="redirectHome()">Back</a-button>
      </template>
    </a-page-header>
    <div v-if="displayItem === 'lightbulb'" id="lamp">
      <div class="switch" :class="fanStatus ? 'active' : ''"></div>
      <!-- <input type="radio" name="switch" value="on" />  
    <input type="radio" name="switch" value="off" checked="checked"/> -->
      <div class="lamp">
        <div class="gonna-give-light"></div>
      </div>
    </div>
    <DetailViewFan v-if="displayItem === 'fan'" :fanStatus="fanStatus" />
    <div class="actions">
      <div>
        <a-button :type="fanStatus ? 'primary' : ''" @click="on()">ON</a-button>
        <a-button
          :type="!fanStatus ? 'primary' : ''"
          style="margin-left: 15px"
          @click="off()"
          >OFF</a-button
        >
      </div>
      <div style="margin-left: 30px">
        Toggle: <a-switch v-model:checked="fanStatus" @click="toggle()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "../router";
import DetailViewFan from "../components/DetailViewFan.vue";
import { DEVICE_COMMAND, GET_NODE } from "../utils/consts";

const displayItem = ref("fan"); // fan | lightbulb
const route = useRoute();
const fanStatus = ref(false);

const socketConnect = new WebSocket("ws://10.10.14.84:5580/ws");
//const socketConnect = new WebSocket("ws://172.16.10.232:5580/ws");

socketConnect.onopen = (event) => {
  console.log("Connected from detail");
  getNode(route.params.id);
};

socketConnect.onmessage = (event) => {
  const formatData = JSON.parse(event.data);
  if (formatData.result)
    fanStatus.value = formatData.result?.attributes["1/6/0"];
};

socketConnect.onclose = (event) => {
  console.log("CLOSED CONNECTION");
};

const getNode = () => {
  socketConnect.send(JSON.stringify(GET_NODE(route.params.id)));
};

const off = () => {
  socketConnect.send(
    JSON.stringify(DEVICE_COMMAND(Number(route.params.id), "Off"))
  );
};

const on = () => {
  socketConnect.send(
    JSON.stringify(DEVICE_COMMAND(Number(route.params.id), "On"))
  );
};

const toggle = () => {
  socketConnect.send(
    JSON.stringify(DEVICE_COMMAND(Number(route.params.id), "Toggle"))
  );
};

const redirectHome = () => {
  router.push("/");
};
</script>

<style>
.actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}

body {
  place-items: baseline;
}
#app {
  display: block;
  width: 100%;
}
.title-home-page {
  background: blue;
}

/** Basic style **/
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}
#lamp {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  background: #2f323c;
}

/** Style for switch button **/
input[name="switch"],
input[name="switch"] + label {
  position: absolute;
  bottom: 3rem;
  width: 4rem;
  height: 4rem;
}
input[name="switch"] + label {
  right: 3rem;
}
input[name="switch"] {
  opacity: 0;
  z-index: 9;
  cursor: pointer;
}
input[value="on"] {
  right: 3rem;
  opacity: 1;
}
input[value="off"] {
  right: -4rem;
  opacity: 0.3;
}
input[value="on"]:checked {
  right: -4rem;
}
input[value="on"]:checked + input[value="off"] {
  right: 3rem;
}

/** Style for light **/
.lamp {
  position: relative;
  margin: 0 auto;
  width: 0.7rem;
  height: 10rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
  background-repeat: no-repeat;
  background-size: 0.15rem 8rem, 0.4rem 0.8rem, 0.7rem 2rem;
  background-position: 50% 0, 0.19rem 8rem, 0 8.8rem;
}
.lamp:before,
.lamp:after {
  content: "";
  position: absolute;
}
.lamp:before {
  left: -1.65rem;
  bottom: -4rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 2px -2px 10px rgba(255, 255, 255, 0.07);
  transition: all 0.15s;
}
.gonna-give-light,
.gonna-give-light:before {
  position: absolute;
}
.gonna-give-light {
  top: 10.05rem;
  left: 0.25rem;
  width: 0;
  height: 1.5rem;
  border-right: 0.2rem solid rgba(255, 255, 255, 0.05);
}
.gonna-give-light:before {
  content: "";
  top: 1.5rem;
  left: -0.35rem;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 50%;
  border: 0.2rem solid rgba(255, 255, 255, 0.05);
  box-shadow: 0px 0px 50px rgba(255, 255, 255, 0);
}
input[value="on"]:checked ~ .lamp:before {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.8),
    0px 5px 50px rgba(255, 255, 255, 0.8), 0px 8px 80px rgba(255, 255, 255, 0.6),
    0px 8px 120px rgba(255, 255, 255, 0.6);
}

.switch.active ~ .lamp:before {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.8),
    0px 5px 50px rgba(255, 255, 255, 0.8), 0px 8px 80px rgba(255, 255, 255, 0.6),
    0px 8px 120px rgba(255, 255, 255, 0.6);
}
</style>
