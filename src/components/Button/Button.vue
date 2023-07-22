<script lang="ts" setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  label: {
    type: String,
    required: false,
    default: undefined,
  },
  variant: {
    type: String,
    required: false,
    default: undefined,
    validator(value: string) {
      return ['primary', 'danger'].includes(value);
    },
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (props.disabled) return;
  emit('click');
};
</script>

<template>
  <button :disabled="props.disabled" :class="{ primary: props.variant === 'primary', danger: props.variant === 'danger' }" :title="props.label" @click.prevent="handleClick">
    <slot />
  </button>
</template>
