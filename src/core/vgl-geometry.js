import { BufferGeometry, BufferAttribute } from '../three.js';
import { string, floatArray } from '../validators.js';
import { parseArray } from '../parsers.js';

/**
 * This is the base mixin component for all geometry components,
 * corresponding [THREE.Geometry](https://threejs.org/docs/index.html#api/core/Geometry).
 * This can also be used directly for building custom geometries.
 */

export default {
  inject: ['vglNamespace'],
  props: {
    /** Name of the component. */
    name: string,
    /** The x, y, and z coordinates of each vertex in this geometry. */
    positionAttribute: floatArray,
  },
  computed: {
    inst: () => new BufferGeometry(),
  },
  watch: {
    inst: {
      handler(inst, oldInst) {
        if (this.positionAttribute) {
          const positionAttribute = oldInst ?
            oldInst.getAttribute('position') :
            new BufferAttribute(new Float32Array(parseArray(this.positionAttribute)), 3);
          inst.addAttribute('position', positionAttribute);
        }
        if (oldInst) oldInst.dispose();
        this.vglNamespace.geometries[this.name] = inst;
      },
      immediate: true,
    },
    name(name, oldName) {
      const { vglNamespace: { geometries }, inst } = this;
      if (geometries[oldName] === inst) delete geometries[oldName];
      geometries[name] = inst;
    },
    positionAttribute(positionAttribute) {
      const positionArray = parseArray(positionAttribute);
      const attributeObject = this.inst.getAttribute('position');
      if (attributeObject.array.length === positionArray.length) {
        attributeObject.copyArray(positionArray);
      } else {
        attributeObject.setArray(new Float32Array(positionArray));
      }
      attributeObject.needsUpdate = true;
    },
  },
  beforeDestroy() {
    const { vglNamespace: { geometries }, inst } = this;
    if (geometries[this.name] === inst) delete geometries[this.name];
    inst.dispose();
  },
  created() { this.vglNamespace.update(); },
  beforeUpdate() { this.vglNamespace.update(); },
  render(h) { return this.$slots.default ? h('div', this.$slots.default) : undefined; },
};
