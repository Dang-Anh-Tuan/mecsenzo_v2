<template>
  <div
    ref="intro"
    class="fixed w-[100vw] h-[100vh] top-0 left-0 bottom-0 right-0 overflow-hidden flex justify-center items-center z-[1000] bg-white select-none"
  >
    <div class="flex items-center flex-col sm:flex-row">
      <img src="@/assets/images/logo.png" alt="logo" class="w-[150px]" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="1080"
        height="1080"
        viewBox="0 0 1080 1080"
        xml:space="preserve"
        class="w-[200px] h-[150px] flex items-center justify-center z-10"
      >
        <desc>Created with Fabric.js 4.2.0</desc>
        <defs></defs>
        <g
          id="9228069e-efc8-486f-889d-8e6172476e3b"
          transform="matrix(1 0 0 1 540 540)"
        >
          <rect
            style="
              stroke: none;
              stroke-width: 1;
              stroke-dasharray: none;
              stroke-linecap: butt;
              stroke-dashoffset: 0;
              stroke-linejoin: miter;
              stroke-miterlimit: 4;
              fill: rgb(255, 255, 255);
              fill-rule: nonzero;
              opacity: 1;
            "
            vector-effect="non-scaling-stroke"
            x="-540"
            y="-540"
            rx="0"
            ry="0"
            width="1080"
            height="1080"
          />
        </g>
        <g
          id="39af516b-0ba9-45f3-a352-84fd54004116"
          transform="matrix(1 0 0 1 540 540)"
        ></g>
        <g
          id="fab3da84-1cc1-4982-8ba5-8e9ccf1be155"
          transform="matrix(1 0 0 1 540 540)"
        >
          <text
            class="scale-[4] h-full animate-[drawIntro_ease-in-out_1s_1_0.3s_forwards]"
            xml:space="preserve"
            font-family="Alegreya"
            font-size="80"
            font-style="normal"
            font-weight="700"
          >
            <tspan x="-165" y="25.13">Mecsenzo</tspan>
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const containerIntro = this.$refs.intro

    setTimeout(() => {
      containerIntro.classList.add('hidden')
    }, 2000)
  },
}
</script>

<style scoped>
text {
  stroke: #ff7200;
  stroke-width: 2;
  fill: transparent;
  stroke-dasharray: 1000;
  stroke-dasharray: 1000;
}
</style>
