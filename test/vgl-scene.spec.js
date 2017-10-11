describe("VglScene component", function() {
    const {VglScene, VglNamespace} = VueGL;
    const assert = chai.assert;
    describe("The instance should be registered to the injected namespace.", function() {
        it("Should be registered when created.", function() {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-scene name="dm'&^>" ref="me" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglScene,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglScenes"],
                        render() {}
                    }
                }
            }).$mount();
            assert.strictEqual(vm.$refs.other.vglScenes["dm'&^>"], vm.$refs.me.inst);
        });
        it("Should be unregistered when destroyed.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><vgl-scene name="n<!--" v-if="!destroyed" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglScene,
                    VglNamespace,
                    OtherComponent: {
                        inject: ["vglScenes"],
                        render() {}
                    }
                },
                data: {destroyed: false}
            }).$mount();
            assert.hasAllKeys(vm.$refs.other.vglScenes, ["n<!--"]);
            vm.destroyed = true;
            vm.$nextTick(() => {
                try {
                    assert.isEmpty(vm.$refs.other.vglScenes);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
        it("Should be replaced when the instance is replaced.", function(done) {
            const vm = new Vue({
                template: `<vgl-namespace><mixed-in name="'<!--" ref="geo" /><other-component ref="other" /></vgl-namespace>`,
                components: {
                    VglNamespace,
                    MixedIn: {
                        mixins: [VglScene],
                        computed: {
                            inst() {return this.i;}
                        },
                        data: () => ({i: new THREE.Scene()})
                    },
                    OtherComponent: {
                        inject: ["vglScenes"],
                        render() {}
                    }
                }
            }).$mount();
            vm.$refs.geo.i = new THREE.Scene();
            vm.$nextTick(() => {
                try {
                    assert.strictEqual(vm.$refs.other.vglScenes["'<!--"], vm.$refs.geo.inst);
                    done();
                } catch(e) {
                    done(e);
                }
            });
        });
    });
});
