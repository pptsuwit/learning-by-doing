<template>
  <div class="page-wrapper neonText">
    <div class="content-wrapper">
      <h1>Hi</h1>
      <h1>I'm Suwit</h1>
      <p>Web Developer</p>
      <a href="https://github.com/pptsuwit">
        <i class="icon fab fa-github fa-2x"></i>
      </a>
      <a href="https://www.linkedin.com/in/pptsuwit/">
        <i class="icon fab fa-linkedin-in fa-2x"></i>
      </a>
      <!-- <a href="https://madza.dev/blog">
        <i class="icon fas fa-book fa-2x"></i>
      </a> -->
      <a href="mailto:pptsuwit@gmail.com">
        <i class="icon fas fa-envelope fa-2x"></i>
      </a>
      <a href="#">
        <i class="icon fas fa-warehouse fa-2x"></i>
        <span class="tooltip-text neonText2">project management </span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.page-wrapper {
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: black;

  display: grid;
  place-items: center;
  text-align: center;
}

h1 {
  color: rgb(255, 255, 255);
  font-family: 'Roboto', sans-serif;
  font-size: 4em;
  letter-spacing: -0.04em;
  animation: pulsate 0.2s ease-in-out infinite alternate;
  /* overflow-wrap: break-word !important; */
  /* word-wrap: break-word; */
  hyphens: auto;
}

p {
  color: rgb(255, 255, 255);
  font-family: 'Roboto', sans-serif;
  font-size: 2.5em;
  margin: 15px 0;
  animation: pulsate 1s ease-in-out infinite alternate;
}

.divider {
  color: rgb(255, 255, 255);
}

.icon {
  color: #5271ff;
  padding: 15px;
  border-radius: 50%;
  font-size: 2.5em;
  animation: pulsate 1s ease-in-out infinite alternate;
}

.icon:hover {
  cursor: pointer;
  background-color: #1f2f5f;
}

.tooltip {
  position: relative;
  display: inline-block;
  /* border-bottom: 1px dotted #5271ff; */
}

a .tooltip-text {
  visibility: hidden;
  width: 160px;
  color: #ffff;
  text-align: center;
  /* border-radius: 10px; */
  padding: 0px;
  margin-left: 0px;
  margin-top: 20px;

  /* animation: pulsate 0.1s ease-in-out infinite alternate; */

  /* Position the tooltip */
  position: absolute;
  z-index: 1;

  animation: Bounce 2s ease-in-out 0s infinite alternate none;
}

a:hover .tooltip-text {
  visibility: visible;
}
.neonText {
  color: #fff;
  text-shadow: 0 0 6px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5271ff,
    0 0 82px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff,
    0 0 200px #5271ff, 0 0 240px #5271ff, 0 0 240px #5271ff, 0 0 320px #5271ff;
}
@keyframes pulsate {
  100% {
    text-shadow: 0 0 5px #fff, 0 0 11px #fff, 0 0 35px #fff, 0 0 45px #5271ff,
      0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff, 0 0 160px #5271ff;
  }

  0% {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #5271ff,
      0 0 70px #5271ff, 0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff;
  }
}

/* Bounce ing animation */
@keyframes Bounce {
  0% {
    animation-timing-function: ease-in;
    opacity: 0;
    transform: translateY(-45px);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #5271ff,
      0 0 70px #5271ff, 0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff;
  }

  24% {
    opacity: 1;
  }

  40% {
    animation-timing-function: ease-in;
    transform: translateY(-24px);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #5271ff,
      0 0 70px #5271ff, 0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff;
  }

  65% {
    animation-timing-function: ease-in;
    transform: translateY(-12px);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #5271ff,
      0 0 70px #5271ff, 0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff;
  }

  82% {
    animation-timing-function: ease-in;
    transform: translateY(-6px);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #5271ff,
      0 0 70px #5271ff, 0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff;
  }

  93% {
    animation-timing-function: ease-in;
    transform: translateY(-4px);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #5271ff,
      0 0 70px #5271ff, 0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff;
  }

  25%,
  55%,
  75%,
  87% {
    animation-timing-function: ease-out;
    transform: translateY(0px);
  }

  100% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateY(0px);
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 40px #5271ff,
      0 0 70px #5271ff, 0 0 90px #5271ff, 0 0 110px #5271ff, 0 0 130px #5271ff;
  }
}
</style>
