<template>
  <div class="flex justify-between icon-footer">
    <router-link :to="{ name: 'alarm' }" class="alarm-footer-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="115.556"
        height="105.278"
        viewBox="0 0 115.556 105.278"
        fill="none"
        stroke="#000000"
      >
        <line
          x2="25"
          y2="25"
          transform="translate(82.778 7.778)"
          stroke-linecap="round"
          stroke-width="11"
        />
        <line
          x1="25"
          y2="25"
          transform="translate(7.778 7.778)"
          stroke-linecap="round"
          stroke-width="11"
        />
        <g transform="translate(14.278 18.278)" stroke-width="11">
          <circle cx="43.5" cy="43.5" r="38" fill="none" />
        </g>
      </svg>
      <div class="pt-2 text-xs">{{ $t('alarm') }}</div>
    </router-link>

    <router-link :to="{ name: 'labs.sleep' }" class="alarm-footer-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="160.257"
        height="157.456"
        viewBox="0 0 160.257 157.456"
        fill="none"
        stroke="#000000"
      >
        <path
          d="M136.089,31.274C123.776,40.828,102.248,60.719,95.3,84.79c-7.6,26.32-7.251,58.868,20.846,80.274,41.692,24.082,88.822,13.379,124.17-30.326,0,0-40.786,12.487-84.29-14.271C110.711,91.034,136.089,31.274,136.089,31.274Z"
          transform="translate(-85.562 -25.774)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="11"
        />
      </svg>
      <div class="pt-2 text-xs">{{ $t('sleep_lab') }}</div>
    </router-link>

    <router-link :to="{ name: 'settings.profile' }" class="alarm-footer-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="162.816"
        height="169.477"
        viewBox="0 0 162.816 169.477"
        stroke="#000"
        fill="none"
      >
        <g transform="translate(42.445)" stroke-width="11">
          <ellipse cx="39" cy="39.5" rx="33.5" ry="34" />
        </g>
        <path
          d="M52.933,242.923s-14.572-76.878,75.03-76.878,75.03,76.878,75.03,76.878Z"
          transform="translate(-46.555 -78.946)"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="11"
        />
      </svg>
      <div class="pt-2 text-xs">{{ $t('profile') }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      status: 'alarm'
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/variables.scss';

.icon-footer {
  margin: 1rem 0.6rem;
  padding: 1rem 3rem;
  background: #242f46;
  border: 1px solid $blue-100;
  border-radius: 15px;

  .alarm-footer-button {
    width: fit-content;
    height: fit-content;
    padding: 0;
    background: none;
    font-size: 0.8rem;
    font-weight: 500;
    color: $blue-100;

    &:hover {
      background: none;
      color: $sky-100;

      svg {
        stroke: $sky-100;
      }
    }

    &:focus {
      outline: none;
    }

    &.router-link-active {
      background: none;
      outline: none;
      color: $sky-100;

      svg {
        stroke: $sky-100;
      }
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin: auto;
      stroke: $blue-100;
    }
  }
}
</style>
