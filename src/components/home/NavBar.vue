    <template>
        <nav class="w-full bg-[#2a9db0] px-6 py-3 flex items-center gap-4">
            <!-- Logo -->
            <span class="text-white font-bold text-xl whitespace-nowrap">ReservaYa!</span>

            <!-- Buscador centrado -->
            <div class="flex-1 flex justify-center">
                <InputText placeholder="Buscar Hotel..." type="text" class="w-full max-w-xl" />
            </div>

            <!-- Links a la derecha -->
            <div class="flex items-center gap-4 ml-auto">
                <router-link to="/" class="text-white font-medium whitespace-nowrap">Hoteles</router-link>

                <router-link v-if="authStore.isAuthenticated && authStore.isUsuario" to="/mis-reservas"
                    class="text-white font-medium whitespace-nowrap">
                    Mis Reservas
                </router-link>

                <!-- Si NO está logueado -->
                <template v-if="!authStore.isAuthenticated">
                    <router-link to="/login"
                        class="bg-white text-[#2a9db0] font-medium px-4 py-1 rounded-full whitespace-nowrap">
                        Iniciar Sesión
                    </router-link>
                    <router-link to="/register"
                        class="bg-white text-[#2a9db0] font-medium px-4 py-1 rounded-full whitespace-nowrap">
                        Registrarse
                    </router-link>
                </template>


                <!-- Si SÍ está logueado -->
                <div v-else class="relative" ref="menuRef">
                    <Avatar icon="pi pi-user" shape="circle" class="bg-white cursor-pointer"
                        @click="menuOpen = !menuOpen" />

                  
                    <div v-if="menuOpen" class="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-40 z-50">
                        <p class="px-4 py-2 text-sm text-gray-700 border-b font-medium">
                            {{ authStore.user?.name }}
                        </p>
                        <button @click="logout"
                            class="w-full text-left px-4 py-2 text-base text-red-500 bg-white hover:bg-blue-100">
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </div>


        </nav>
    </template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";


const authStore = useAuthStore();
const menuOpen = ref(false);


const items = ref([
    { label: 'Hoteles', icon: 'pi pi-building' },
    { label: 'Mis Reservas', icon: 'pi pi-calendar' }
])


const logout = () => {
    authStore.logout()
    menuOpen.value = false
}
</script>


   


<style scoped>
:deep(a) {
    text-decoration: none;
}
</style>
