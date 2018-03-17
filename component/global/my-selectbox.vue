<template>
  <div class="my-selectbox" :class="{ expanded }">
    <label :for="id">{{ label }}</label>
    <select :id="id" @change="internalOnChange">
      <option v-for="(_unused_val, key) in options"
        :key="key"
        :value="key">

        {{ key }}
      </option>
    </select>

    <div class="nice-looking-selectbox">
      <ul class="more">
      </ul>
      <chevron-down />
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-selectbox',
  data: () => ({
    state: {
      expanded: false,
    },
  }),
  props: {
    id: {
      required: true,
      type: String,
    },
    label: {
      required: true,
      type: String,
    },
    options: {
      required: true,
      type: Object,
    },
    onChange: {
      required: true,
      type: Function,
    },
  },
  methods: {
    internalOnChange(event) {
      const key = event.target.value,
        value = this.options[key]

      this.onChange(value, key)
    },
  },
}
</script>

<style lang="scss">
.my-selectbox {
  cursor: pointer;
  display: inline-block;

  > select {
    position: absolute;
    opacity: 0;
  }

  > label {
    cursor: pointer;
    display: inline-block;
    transition: color $duration-short $easing-default;
    vertical-align: middle;
  }

  &.expanded > .nice-looking-selectbox {
    > .chevron-down {
      transform: rotate(180deg);
    }
  }

  > .nice-looking-selectbox {
    @include res-aware-element-spacing('margin-left', 'sm');

    background-color: $bg;
    border-radius: $radius-small;
    border: 1px solid $fg-light;
    cursor: pointer;
    display: inline-block;
    height: 30px;
    text-align: center;
    transition: background-color $duration-short $easing-default;
    vertical-align: middle;
    width: 30px;

    > .chevron-down {
      color: $fg;
      margin-top: 2px;
      transform: rotate(0deg);
      transition: transform $duration-short $easing-default;
    }
  }
}
</style>
