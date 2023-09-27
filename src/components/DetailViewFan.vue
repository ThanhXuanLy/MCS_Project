<template>
  <div class="fan-wrapper">
    <div class="fan">
      <div class="fan__root">
        <span class="top"> </span>
        <span class="bottom"></span>
      </div>
      <div class="fan__staddle"></div>
      <div class="head">
        <div class="fan__engine"><span class="center"></span></div>
        <input type="checkbox" id="engine" :checked="!fanStatus" hidden />
        <div>
          <div class="fan__blades">
            <input type="checkbox" id="engine2" hidden checked />
            <div class="fan__blades">
              <div class="center"></div>
              <div class="blade"><span></span></div>
              <div class="blade"><span></span></div>
              <div class="blade"><span></span></div>
              <div class="blade"><span></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  fanStatus: Boolean,
});

const { fanStatus } = toRefs(props);
</script>

<style>
.actions {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
html {
  overflow: hidden;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes off {
  to {
    transform: rotate(380deg);
  }
}

@keyframes off2 {
  to {
    transform: rotate(880deg);
  }
}

@keyframes fly {
  to {
    margin-top: 50px;
  }
}

span {
  display: block;
}
.fan-wrapper {
  background: #2f323c;
}

.fan {
  width: 500px;
  height: 500px;
  position: relative;
  z-index: 1;
  margin-top: 75px;
  perspective: 500px;
  margin: auto;
}

.fan__root {
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.fan__root .top {
  overflow: hidden;
  width: 200px;
  height: 25px;
  position: relative;
}

.fan__root .top::after {
  content: "";
  display: block;
  width: 200px;
  height: 50px;
  background: white;
  border-radius: 50%;
}

.fan__root .top .red {
  position: absolute;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  right: 30px;
  background: #f15249;
  cursor: pointer;
  overflow: hidden;
}

.fan__root .top .green {
  position: absolute;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  right: 85px;
  background: #32ba7c;
  cursor: pointer;
  overflow: hidden;
}

.fan__root .top .green::after {
  content: "";
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #0aa06e;
}

.fan__root .top .red::after {
  content: "";
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #a00000;
}

.fan__root .top .blue {
  position: absolute;
  cursor: pointer;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  left: 30px;
  background: #3ac2f2;
  overflow: hidden;
}

.fan__root .top .blue::after {
  content: "";
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #009cc6;
}

.fan__root .bottom {
  overflow: hidden;
  width: 200px;
  height: 20px;
}

.fan__root .bottom::after {
  content: "";
  display: block;
  width: 200px;
  height: 40px;
  background: white;
  border-radius: 18%;
  transform: translateY(-30px);
}

.fan__staddle {
  position: absolute;
  bottom: 45px;
  background: white;
  height: 270px;
  width: 13px;
  left: 50%;
  transform: translateX(-50%);
}

.fan__engine {
  position: absolute;
  bottom: 0px;
  width: 130px;
  height: 130px;
  background: white;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
}

.fan__engine::after {
  content: "";
  background: white;
  display: block;
  width: 25px;
  height: 50px;
  position: absolute;
  top: 105px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 5px 5px;
}

.fan__blades {
  width: 230px;
  height: 230px;
  position: absolute;
  bottom: -50px;
  transition: 2s;
  transform-origin: center center;
  left: calc(50% - 115px);
  z-index: 1;
  animation: spin infinite 0.38s linear forwards;
}

.fan__blades .fan__blades {
  bottom: 0;
  animation: spin infinite 0.5s linear forwards;
}

.fan__blades .blade {
  position: absolute;
  width: 50px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%) skewY(25deg);
  perspective: 500px;
  transform-style: preserve-3d;
}

.fan__blades .blade:nth-child(2) {
  transform: translateX(-50%) rotate(90deg) skewY(25deg);
}

.fan__blades .blade:nth-child(3) {
  transform: translateX(-50%) rotate(180deg) skewY(25deg);
}

.fan__blades .blade:nth-child(4) {
  transform: translateX(-50%) rotate(270deg) skewY(25deg);
}

.fan__blades .blade span {
  width: 100%;
  height: 200%;
  border-radius: 44px;
  background: #ffc114;
  position: absolute;
  top: -66px;
  display: block;
  transform-style: preserve-3d;
  transform: rotateX(81deg);
  overflow: hidden;
}

.fan__blades .blade span::after {
  width: 50%;
  height: 100%;
  content: "";
  display: block;
  background: #fca12a;
  transform: rotate(0deg);
}

.fan__blades .center {
  position: absolute;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #32ba7c;
  z-index: 2;
}

.fan__blades .center::after {
  display: block;
  content: "";
  width: 40px;
  height: 20px;
  background: #0aa06e;
}

.head {
  transition: 1s transform;
  height: auto;
  width: auto;
  position: absolute;
  width: 300px;
  height: 300px;
  bottom: 195px;
  left: calc(50% - 150px);
  /* transform: translateX(-50%); */
}

#engine:checked + div > div {
  animation: off2 0s ease-out forwards;
}

#engine:checked + div > span:nth-child(1) {
  transition: 5s all ease-in-out, 1s transform;
  left: 0px;
  top: 0px;
}

#engine:checked + div > span:nth-child(2) {
  transition: 5s all ease-in-out, 1s transform;
  right: 0px;
  top: 0px;
}

#engine:checked + div > span:nth-child(3) {
  transition: 7s all ease-in-out, 1s transform;
  right: -50px;
  top: 200px;
}

#engine2:checked + div {
  animation: off 0s ease-out forwards;
}

@media screen and (max-width: 900px) {
  .window {
    flex: 1 25% !important;
  }
}

@media screen and (max-width: 800px) {
  .window {
    flex: 1 33.3333333% !important;
  }
}

@media screen and (max-width: 700px) {
  .window {
    flex: 1 50% !important;
  }
}
</style>
