describe('VglRectAreaLight:', function suite() {
  const { VglRectAreaLight, VglNamespace } = VueGL;
  it('without properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-rect-area-light ref="o" /></vgl-namespace>',
      components: { VglRectAreaLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new THREE.RectAreaLight();
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('with properties', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-rect-area-light color="#f8054a" width="15" height="20" intensity="0.88" ref="o" /></vgl-namespace>',
      components: { VglRectAreaLight, VglNamespace },
    }).$mount();
    vm.$nextTick(() => {
      try {
        const actual = vm.$refs.o.inst.clone();
        const expected = new THREE.RectAreaLight(0xf8054a, 0.88, 15, 20);
        expected.uuid = actual.uuid;
        expect(actual.toJSON()).to.deep.equal(expected.toJSON());
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('after properties are changed', function test(done) {
    const vm = new Vue({
      template: '<vgl-namespace><vgl-rect-area-light ref="o" :color="c" :width="w" :height="h" :intensity="i" /></vgl-namespace>',
      components: { VglRectAreaLight, VglNamespace },
      data: {
        c: '#f8054a', i: 0.88, w: 15, h: 20,
      },
    }).$mount();
    vm.$nextTick(() => {
      vm.c = '#8899da';
      vm.i = '0.76';
      vm.w = 25;
      vm.h = 30;
      vm.$nextTick(() => {
        try {
          const actual = vm.$refs.o.inst.clone();
          const expected = new THREE.RectAreaLight(0x8899da, 0.76, 25, 30);
          expected.uuid = actual.uuid;
          expect(actual.toJSON()).to.deep.equal(expected.toJSON());
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});
