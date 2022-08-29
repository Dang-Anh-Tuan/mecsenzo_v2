<template>
  <div class="grid grid-cols-[20%_70%_10%] w-full mt-2 items-center">
    <div>
      <p class="text-[1rem] sm:text-[1.2rem] font-semibold text-dark_primary">
        {{ labelField }}
      </p>
    </div>
    <div>
      <div v-if="typeInput != 'file'">
        <ValidationProvider v-slot="{ errors }" :rules="rule">
          <input
            ref="inputField"
            :type="typeInput"
            :name="labelField"
            :value="valueField"
            class="appearance-none outline-none w-full px-3 text-[1rem] sm:text-[1.2rem] py-2 border-b-[2px] border-b-[rgb(100,116,139] focus:border-b-[#ff7200]"
            readonly
            @input="$emit('onChangeField', [name, $event.target.value])"
          />
          <p class="text-red-500 text-[0.9rem] italic mt-2">{{ errors[0] }}</p>
        </ValidationProvider>
      </div>
      <div v-else>
        <input
          v-if="isEdit"
          ref="inputField"
          type="file"
          class="appearance-none outline-none w-[200px]"
          @change="handleChangeAvatar"
        />
      </div>
    </div>
    <div>
      <button
        v-if="!isEdit"
        id="btn-edit"
        type="button"
        class="h-full p-4"
        @click="handleEnableEdit"
      >
        <fa icon="pen-to-square" />
      </button>
      <button
        v-else
        id="btn-edit"
        type="button"
        class="h-full p-4"
        @click="handleDisableEdit"
      >
        <fa icon="eye" class="text-primary" />
      </button>
    </div>
  </div>
</template>

<script>
import { createTempUrlForImageFile } from '~/helper/FileHelper'

export default {
  props: {
    name: {
      type: String,
      default: () => '',
    },
    labelField: {
      type: String,
      default: () => '',
    },
    typeInput: {
      type: String,
      default: () => 'text',
    },
    valueField: {
      type: String,
      default: () => '',
    },
    rule: {
      type: String || null,
      default: () => null,
    },
  },
  emits: ['onChangeField', 'onChangeFile'],

  data() {
    return {
      isEdit: false,
    }
  },

  methods: {
    handleEnableEdit() {
      const inputFieldEl = this.$refs.inputField

      if (this.typeInput !== 'file' && this.typeInput !== 'number') {
        const end = inputFieldEl.value.length
        inputFieldEl.setSelectionRange(end, end)
        inputFieldEl.readOnly = false
        inputFieldEl.focus()
      }
      if (this.typeInput === 'number') {
        inputFieldEl.readOnly = false
      }

      this.isEdit = true
    },

    handleDisableEdit() {
      const inputFieldEl = this.$refs.inputField

      if (this.typeInput !== 'file' && this.typeInput !== 'number') {
        inputFieldEl.readOnly = true
      }
      this.isEdit = false
    },

    handleChangeAvatar(e) {
      const fileImage = createTempUrlForImageFile(e.target.files[0])
      this.$emit('onChangeFile', fileImage)
    },
  },
}
</script>
