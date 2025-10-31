import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'; // 单位转换
import presetIcons from '@unocss/preset-icons' // 引用Icon


export function createConfig() {
  return defineConfig({
    presets: [
      presetAttributify(),
      presetUno(),
      presetIcons({
        collections: {
          custom: {
            control: `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="12" viewBox="0 0 52 12" fill="none">
            <circle cx="6" cy="6" r="6" fill="#ED695E"/>
            <circle cx="26" cy="6" r="6" fill="#F4BF4F"/>
            <circle cx="46" cy="6" r="6" fill="#61C554"/>
            </svg>`,
            selection: `<svg xmlns="http://www.w3.org/2000/svg" width="9" height="38" viewBox="0 0 9 38" fill="none">
                            <mask id="path-1-inside-1_597_204" fill="white">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.12467 0.503418C2.01747 3.25297 0.82309 6.66026 0.82309 10.2376V27.7624C0.82309 31.3398 2.01747 34.7471 4.12467 37.4966C4.24294 36.4423 4.44506 35.3978 4.72965 34.3733L7.51309 24.3529C8.48595 20.8506 8.48595 17.1494 7.51309 13.6471L4.72965 3.62673C4.44506 2.6022 4.24294 1.55776 4.12467 0.503418Z"/>
                            </mask>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.12467 0.503418C2.01747 3.25297 0.82309 6.66026 0.82309 10.2376V27.7624C0.82309 31.3398 2.01747 34.7471 4.12467 37.4966C4.24294 36.4423 4.44506 35.3978 4.72965 34.3733L7.51309 24.3529C8.48595 20.8506 8.48595 17.1494 7.51309 13.6471L4.72965 3.62673C4.44506 2.6022 4.24294 1.55776 4.12467 0.503418Z" fill="url(#paint0_linear_597_204)"/>
                            <path d="M4.12467 0.503418L5.11843 0.391939L4.84159 -2.076L3.33095 -0.10487L4.12467 0.503418ZM4.12467 37.4966L3.33095 38.1049L4.84159 40.076L5.11843 37.6081L4.12467 37.4966ZM4.72965 34.3733L5.69316 34.6409L4.72965 34.3733ZM7.51309 24.3529L6.54958 24.0852H6.54957L7.51309 24.3529ZM7.51309 13.6471L6.54958 13.9148H6.54958L7.51309 13.6471ZM4.72965 3.62673L3.76613 3.89437L4.72965 3.62673ZM1.82309 10.2376C1.82309 6.88396 2.94266 3.68971 4.91838 1.11171L3.33095 -0.10487C1.09228 2.81623 -0.17691 6.43656 -0.17691 10.2376H1.82309ZM1.82309 27.7624V10.2376H-0.17691V27.7624H1.82309ZM4.91838 36.8883C2.94266 34.3103 1.82309 31.1161 1.82309 27.7624H-0.17691C-0.17691 31.5635 1.09228 35.1838 3.33095 38.1049L4.91838 36.8883ZM5.11843 37.6081C5.23079 36.6065 5.4228 35.6142 5.69316 34.6409L3.76613 34.1057C3.46731 35.1814 3.25509 36.2781 3.1309 37.3851L5.11843 37.6081ZM5.69316 34.6409L8.47661 24.6205L6.54957 24.0852L3.76613 34.1057L5.69316 34.6409ZM8.47661 24.6205C9.49811 20.9431 9.49811 17.0569 8.47661 13.3795L6.54958 13.9148C7.47379 17.2419 7.47379 20.7581 6.54958 24.0852L8.47661 24.6205ZM8.47661 13.3795L5.69316 3.35908L3.76613 3.89437L6.54958 13.9148L8.47661 13.3795ZM5.69316 3.35908C5.4228 2.38578 5.23079 1.39357 5.11843 0.391939L3.1309 0.614897C3.25509 1.72196 3.46731 2.81862 3.76613 3.89437L5.69316 3.35908Z" fill="white" fill-opacity="0.4" style="mix-blend-mode:overlay" mask="url(#path-1-inside-1_597_204)"/>
                            <defs>
                            <linearGradient id="paint0_linear_597_204" x1="28.5" y1="21" x2="8.5" y2="43" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C441F4"/>
                            <stop offset="1" stop-color="#00DAEA"/>
                            </linearGradient>
                            </defs>
                            </svg>`,
            line: `<svg xmlns="http://www.w3.org/2000/svg" width="69" height="844" viewBox="0 0 69 844" fill="none">
                        <g filter="url(#filter0_bd_597_203)">
                            <path d="M 69 0 H 88 V 844 H 69 V 519.3 C 69 505.3 62.3 492.1 51.1 483.8 L 18.9 460.2 C 7.7 451.9 1 438.7 1 424.7 V 130.3 C 1 116.3 7.7 103.1 18.9 94.8 L 51.1 71.2 C 62.3 62.9 69 49.7 69 35.7 V 0 Z" fill="#383a57" fill-opacity="0.51" shape-rendering="crispEdges"/>
                        </g>
                        <defs>
                            <filter id="filter0_bd_597_203" x="-29" y="-30" width="147" height="904" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="15"/>
                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_597_203"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dx="-1"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"/>
                            <feBlend mode="normal" in2="effect1_backgroundBlur_597_203" result="effect2_dropShadow_597_203"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_597_203" result="shape"/>
                            </filter>
                        </defs>
                    </svg>`,
            glorying: `
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <g filter="url(#filter0_f_597_253)">
                            <circle cx="25" cy="25" r="20.5" stroke="url(#paint0_linear_597_253)" style="mix-blend-mode:overlay"/>
                        </g>
                        <circle cx="25" cy="25" r="19.5" fill="black" fill-opacity="0.2"/>
                        <circle cx="25" cy="25" r="19.5" stroke="url(#paint1_linear_597_253)" style="mix-blend-mode:overlay"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M36 25C36 31.0751 31.0751 36 25 36C18.9249 36 14 31.0751 14 25C14 18.9249 18.9249 14 25 14C31.0751 14 36 18.9249 36 25ZM29.2639 19.4437C30.0727 19.1327 30.8673 19.9273 30.5563 20.7361L28.1475 26.9988C27.9444 27.527 27.527 27.9444 26.9988 28.1475L20.7361 30.5563C19.9273 30.8673 19.1327 30.0727 19.4437 29.2639L21.8525 23.0012C22.0556 22.473 22.473 22.0556 23.0012 21.8525L29.2639 19.4437ZM25 27C26.1046 27 27 26.1046 27 25C27 23.8954 26.1046 23 25 23C23.8954 23 23 23.8954 23 25C23 26.1046 23.8954 27 25 27Z" fill="white" style="mix-blend-mode:overlay"/>
                        <defs>
                            <filter id="filter0_f_597_253" x="0" y="0" width="50" height="50" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_597_253"/>
                            </filter>
                            <linearGradient id="paint0_linear_597_253" x1="6" y1="9.5" x2="47.5" y2="41.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C322FF"/>
                            <stop offset="1" stop-color="#00BAE1"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_597_253" x1="6" y1="9.5" x2="47.5" y2="41.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#E8A9FF"/>
                            <stop offset="1" stop-color="#53E1FF"/>
                            </linearGradient>
                        </defs>
                        </svg>`,
            victory: `<svg xmlns="http://www.w3.org/2000/svg" width="74" height="80" viewBox="0 0 74 80" fill="none">
                        <g filter="url(#filter0_f_597_200)">
                          <path d="M28 8.6188C32.9504 5.76068 39.0496 5.76068 44 8.6188L59.1769 17.3812C64.1273 20.2393 67.1769 25.5214 67.1769 31.2376V48.7624C67.1769 54.4786 64.1273 59.7607 59.1769 62.6188L44 71.3812C39.0496 74.2393 32.9504 74.2393 28 71.3812L12.8231 62.6188C7.87267 59.7607 4.82309 54.4786 4.82309 48.7624V31.2376C4.82309 25.5214 7.87267 20.2393 12.8231 17.3812L28 8.6188Z" fill="url(#paint0_linear_597_200)"/>
                          <path d="M44.5 7.75278C39.2402 4.71602 32.7598 4.71602 27.5 7.75278L12.3231 16.5152C7.06327 19.5519 3.82309 25.1641 3.82309 31.2376V48.7624C3.82309 54.8359 7.06327 60.4481 12.3231 63.4848L27.5 72.2472C32.7598 75.284 39.2402 75.284 44.5 72.2472L59.6769 63.4848C64.9367 60.4481 68.1769 54.8359 68.1769 48.7624V31.2376C68.1769 25.1641 64.9367 19.5519 59.6769 16.5152L44.5 7.75278Z" stroke="url(#paint1_linear_597_200)" stroke-width="2"/>
                        </g>
                        <path d="M28.25 9.05182C33.0457 6.28301 38.9543 6.28301 43.75 9.05182L58.9269 17.8142C63.7226 20.583 66.6769 25.7 66.6769 31.2376V48.7624C66.6769 54.3 63.7226 59.417 58.9269 62.1858L43.75 70.9482C38.9543 73.717 33.0457 73.717 28.25 70.9482L13.0731 62.1858C8.27737 59.417 5.32309 54.3 5.32309 48.7624V31.2376C5.32309 25.7 8.27737 20.583 13.0731 17.8142L28.25 9.05182Z" fill="url(#paint2_linear_597_200)"/>
                        <path d="M28.25 9.05182C33.0457 6.28301 38.9543 6.28301 43.75 9.05182L58.9269 17.8142C63.7226 20.583 66.6769 25.7 66.6769 31.2376V48.7624C66.6769 54.3 63.7226 59.417 58.9269 62.1858L43.75 70.9482C38.9543 73.717 33.0457 73.717 28.25 70.9482L13.0731 62.1858C8.27737 59.417 5.32309 54.3 5.32309 48.7624V31.2376C5.32309 25.7 8.27737 20.583 13.0731 17.8142L28.25 9.05182Z" stroke="white" style="mix-blend-mode:overlay"/>
                        <defs>
                          <filter id="filter0_f_597_200" x="-1.17691" y="0.47522" width="74.3538" height="79.0496" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                            <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_597_200"/>
                          </filter>
                          <linearGradient id="paint0_linear_597_200" x1="32.5" y1="42" x2="12.5" y2="64" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C441F4"/>
                            <stop offset="1" stop-color="#00DAEA"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_597_200" x1="36" y1="4" x2="36" y2="76" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C618FF"/>
                            <stop offset="1" stop-color="#00C3FB"/>
                          </linearGradient>
                          <linearGradient id="paint2_linear_597_200" x1="32.5" y1="42" x2="12.5" y2="64" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#C441F4"/>
                            <stop offset="1" stop-color="#00DAEA"/>
                          </linearGradient>
                        </defs>
                      </svg>`,
            logo: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <mask id="mask0_611_85" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="36" height="38">
              <path d="M16.0002 2.30941C18.4754 0.880346 21.525 0.880346 24.0002 2.30941L33.3207 7.69061C35.7959 9.11967 37.3207 11.7607 37.3207 14.6188V25.3812C37.3207 28.2393 35.7959 30.8803 33.3207 32.3094L24.0002 37.6906C21.525 39.1197 18.4754 39.1197 16.0002 37.6906L6.67967 32.3094C4.20447 30.8803 2.67967 28.2393 2.67967 25.3812V14.6188C2.67967 11.7607 4.20447 9.11967 6.67967 7.69061L16.0002 2.30941Z" fill="#C4C4C4"/>
            </mask>
            <g mask="url(#mask0_611_85)">
              <path d="M49 42H41.062C38.4102 42 34.4187 40.6052 31.215 38.5833C29.3988 39.7319 27.404 40.6238 25.2817 41.2079C23.912 41.72 22.4289 42 20.8805 42C20.6657 42 20.4522 41.9946 20.2401 41.984C19.9578 41.9946 19.6742 42 19.3893 42C14.5212 42 10.0198 40.4299 6.36388 37.7684C3.7801 36.7774 1.09516 35.8474 -0.832309 35.4357C-1.94589 35.1978 -3.03698 35.0693 -3.99033 34.957C-5.49633 34.7796 -6.65861 34.6427 -7.02283 34.1792C-7.56512 33.4892 -7.07602 32.0395 -6.78067 31.1641C-6.75208 31.0793 -6.7253 31 -6.70145 30.9272C-6.41706 30.0594 -6.62317 29.7027 -7.04762 29.2404C-7.47207 28.7782 -7.47483 28.2295 -7.03425 27.6996C-6.73925 27.3448 -6.08213 27.2543 -5.75209 27.2089C-5.68781 27.2 -5.63594 27.1929 -5.60156 27.1859C-5.72441 27.0893 -5.91031 26.9889 -6.11872 26.8764C-6.72519 26.549 -7.52222 26.1186 -7.51023 25.3803C-7.50556 25.0924 -7.18703 24.827 -6.80201 24.5061C-6.46748 24.2274 -6.08276 23.9068 -5.81008 23.4933C-5.34452 22.7873 -6.20745 22.3539 -6.83736 22.0376C-7.00102 21.9554 -7.14895 21.8811 -7.25377 21.812C-7.76201 21.4768 -7.99949 20.9696 -8 20.3172C-8.00063 19.5158 -7.34214 19.2583 -6.61092 18.9724C-6.27862 18.8424 -5.9313 18.7066 -5.62399 18.5112C-4.46549 17.7745 -3.28786 16.7861 -2.4362 16.0187C-2.16163 14.4417 -1.72031 12.9219 -1.13107 11.4783C2.01632 3.20917 10.065 -2.52252 19.2357 -2.52252C28.7872 -2.52252 37.7453 3.6721 40.6173 12.7816L49 42Z" fill="url(#paint0_angular_611_85)"/>
              <path d="M9.75 23.5881C8.83163 25.3338 8.31192 27.3219 8.31192 29.4314C8.31192 36.3729 13.9391 42 20.8805 42C27.8219 42 33.449 36.3729 33.449 29.4314C33.449 26.8869 32.6929 24.519 31.3931 22.5401C30.158 27.2641 25.8611 30.75 20.75 30.75H9.75V23.5881Z" fill="url(#paint1_angular_611_85)"/>
              <path d="M12.25 20.2945C14.5013 18.1672 17.5386 16.8629 20.8805 16.8629C24.0924 16.8629 27.023 18.0677 29.2448 20.0501C29.0868 24.6055 25.344 28.25 20.75 28.25H12.25V20.2945Z" fill="url(#paint2_angular_611_85)"/>
              <path d="M43.9016 38.0956C45.1691 39.3641 42.5712 42 42.5712 42C37.9109 42 29.154 41.1687 26.2158 33.2435L25.1518 29.8339C29.0358 28.1361 31.75 24.26 31.75 19.75C31.75 13.6749 26.8251 8.75002 20.75 8.75002H12.2693C7.23438 7.54917 1.95934 9.6324 -0.887784 13.998C-1.29167 14.5685 -2.10553 14.2264 -1.92333 13.5516C0.606133 4.18279 9.31662 -2.52252 19.2357 -2.52252C27.6485 -2.52252 35.601 2.28318 39.34 9.65354C40.321 11.5873 40.0494 13.8623 39.4007 15.9313C37.8681 20.8193 36.2757 30.4632 43.9016 38.0956Z" fill="url(#paint3_angular_611_85)"/>
              <path d="M24.401 27.4281L21.1637 17.0541C20.4445 14.7494 19.0778 12.7462 17.2747 11.25H20.75C25.4444 11.25 29.25 15.0556 29.25 19.75C29.25 23.1376 27.2683 26.0623 24.401 27.4281Z" fill="url(#paint4_angular_611_85)"/>
              <g style="mix-blend-mode:overlay">
                <path d="M16 2.3094C18.4752 0.880338 21.5248 0.880338 24 2.3094L33.3205 7.6906C35.7957 9.11966 37.3205 11.7607 37.3205 14.6188V25.3812C37.3205 28.2393 35.7957 30.8803 33.3205 32.3094L24 37.6906C21.5248 39.1197 18.4752 39.1197 16 37.6906L6.67949 32.3094C4.20428 30.8803 2.67949 28.2393 2.67949 25.3812V14.6188C2.67949 11.7607 4.20428 9.11966 6.67949 7.6906L16 2.3094Z" fill="url(#paint5_linear_611_85)" style="mix-blend-mode:overlay"/>
                <path d="M16 2.3094C18.4752 0.880338 21.5248 0.880338 24 2.3094L33.3205 7.6906C35.7957 9.11966 37.3205 11.7607 37.3205 14.6188V25.3812C37.3205 28.2393 35.7957 30.8803 33.3205 32.3094L24 37.6906C21.5248 39.1197 18.4752 39.1197 16 37.6906L6.67949 32.3094C4.20428 30.8803 2.67949 28.2393 2.67949 25.3812V14.6188C2.67949 11.7607 4.20428 9.11966 6.67949 7.6906L16 2.3094Z" fill="url(#paint6_linear_611_85)" fill-opacity="0.5"/>
              </g>
            </g>
            <defs>
              <radialGradient id="paint0_angular_611_85" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(21.6835 19.8136) rotate(35.2605) scale(29.0182 38.102)">
                <stop offset="0.101333" stop-color="#612566"/>
                <stop offset="0.12497" stop-color="#ED6A84"/>
                <stop offset="0.396084" stop-color="#9E235F"/>
                <stop offset="0.509199" stop-color="#612566"/>
                <stop offset="0.58545" stop-color="#2C1842"/>
                <stop offset="0.865758" stop-color="#21142C"/>
              </radialGradient>
              <radialGradient id="paint1_angular_611_85" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.0982 21.4661) rotate(-31.3229) scale(21.2003 34.3807)">
                <stop offset="0.101333" stop-color="#612566"/>
                <stop offset="0.12497" stop-color="#ED6A84"/>
                <stop offset="0.396084" stop-color="#9E235F"/>
                <stop offset="0.509199" stop-color="#612566"/>
                <stop offset="0.58545" stop-color="#2C1842"/>
                <stop offset="0.865758" stop-color="#21142C"/>
              </radialGradient>
              <radialGradient id="paint2_angular_611_85" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24.0982 21.4661) rotate(-31.3229) scale(21.2003 34.3807)">
                <stop offset="0.101333" stop-color="#612566"/>
                <stop offset="0.12497" stop-color="#ED6A84"/>
                <stop offset="0.396084" stop-color="#9E235F"/>
                <stop offset="0.509199" stop-color="#612566"/>
                <stop offset="0.58545" stop-color="#2C1842"/>
                <stop offset="0.865758" stop-color="#21142C"/>
              </radialGradient>
              <radialGradient id="paint3_angular_611_85" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23.1994 33.5473) rotate(54.3486) scale(19.0784 10.2935)">
                <stop offset="0.000195603" stop-color="#2C1842"/>
                <stop offset="0.0990559" stop-color="#21142C"/>
                <stop offset="0.220158" stop-color="#080808"/>
                <stop offset="0.381095" stop-color="#ED6A84"/>
                <stop offset="0.589726" stop-color="#9E235F"/>
                <stop offset="0.6817" stop-color="#612566"/>
              </radialGradient>
              <radialGradient id="paint4_angular_611_85" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23.1994 33.5473) rotate(54.3486) scale(19.0784 10.2935)">
                <stop offset="0.000195603" stop-color="#2C1842"/>
                <stop offset="0.0990559" stop-color="#21142C"/>
                <stop offset="0.220158" stop-color="#080808"/>
                <stop offset="0.381095" stop-color="#ED6A84"/>
                <stop offset="0.589726" stop-color="#9E235F"/>
                <stop offset="0.6817" stop-color="#612566"/>
              </radialGradient>
              <linearGradient id="paint5_linear_611_85" x1="36.5" y1="8" x2="18.0645" y2="45.249" gradientUnits="userSpaceOnUse">
                <stop stop-color="#C441F4"/>
                <stop offset="1" stop-color="#00DAEA"/>
              </linearGradient>
              <linearGradient id="paint6_linear_611_85" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="#2596FF" stop-opacity="0.79"/>
              </linearGradient>
            </defs>
          </svg>`
          }
        }

      })
    ],

    transformers: [transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }), transformerVariantGroup()],
    rules: [
      ['shadow', { 'box-shadow': '0px 2px 4px 0px #ECEBEA' }],
      ['shadow1', { 'box-shadow': '1px 0px 0px 0px rgba(255, 255, 255, 0.10) inset' }],
      ['shadow2', { 'box-shadow': '0px 4px 10px 0px rgba(0, 0, 0, 0.25)' }],
      ['shadow3', { 'box-shadow': '0px 10px 20px 0px rgba(0, 0, 0, 0.50)' }],
      ['shadow-blur', { 'box-shadow': '2px -3px 20px 0px rgba(195, 34, 255, 1), -2px 2px 20px 0px rgba(0, 186, 225, 1)' }],
      [/^bgl-\[(.*)_(.*)_(.*)]$/, ([, deg, from, to]) => {
        return {
          'background': `linear-gradient(${deg}, ${from}, ${to})`,
        }
      }],
      ['text-base', { 'font-size': '12px' }],
      ['text-lg', { 'font-size': '12px' }],
      ['text-xl', { 'font-size': '16px' }],
      ['text-2xl', { 'font-size': '20px' }],
      ['text-3xl', { 'font-size': '24px' }],
      ['text-4xl', { 'font-size': '28px' }],
      ['text-5xl', { 'font-size': '32px' }],
      ['text-6xl', { 'font-size': '36px' }],
      ['text-7xl', { 'font-size': '40px' }],
      ['text-8xl', { 'font-size': '44px' }],
      [/^box-\[(.*)_(.*)_(.*)_(.*)]$/, ([, width, height, background, radius]) => {
        return {
          width: width || "auto",
          height: height || "auto",
          background: background || "transparent",
          "border-radius": radius || "0px",
        }
      }],


      [
        /^shadow-\[(.*)\]$/,
        ([, shadow]) => {
          return {
            'box-shadow': shadow.replace(/_/g, ' '),
          };
        },
      ],
    ],
    shortcuts: [
      [
        /^bd-\[(.*)_(.*)_(.*)_(.*)]$/,
        ([, direction, width, style, color]) => `border-${direction} border-${direction}-${width} border-${direction}-${style} border-${direction}-${color}`,
      ],
      [
        /^bdf-\[(.*)_(.*)_(.*)]$/,
        ([, width, style, color]) => `border-${width} border-${style} border-${color}`,
      ],
    ],
  })
}

export default createConfig();
