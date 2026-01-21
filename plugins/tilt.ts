import VanillaTilt from 'vanilla-tilt';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tilt', {
        mounted(el, binding) {
            VanillaTilt.init(el, {
                max: 8,
                speed: 400,
                glare: true,
                "max-glare": 0.3,
                scale: 1.02,
                ...binding.value
            });
        },
        unmounted(el) {
            if (el.vanillaTilt) {
                el.vanillaTilt.destroy();
            }
        }
    });
});
