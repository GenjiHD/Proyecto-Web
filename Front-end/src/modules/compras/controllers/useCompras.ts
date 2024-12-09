import {ref} from 'vue';
import type {Compra, CompraAgregar} from '../interfaces/compras_interfaces';
import {comprasAPI} from '../api/comprasAPI';


export const useCompras = () => {
    const compras = ref<Compra[]>([]); // inicializa los clientes con para mostrarlos en la view
    let mensaje = ref<string[]>([]); // inicializan mensaje con para mostrarlo en la view

    // Función: obtener compras
    const getCompras = async (params:Record<string,any> = {} ) => {
        try {
            const queryParams = new URLSearchParams(params).toString();
            const url = /${queryParams ? '?' + queryParams : ''};
            const response = await comprasAPI.get<{ data: Compra[], pagination: any }>(url);
            compras.value = response.data.data; //refleja la respuesta de la API en la variable compras
            return response.data; // Devolver la respuesta completa incluyendo la paginacion
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    };

    const getComprasById = async (id: number) => {
        try {
            const response = await comprasAPI.get<Compra[]>(/${id})
            compras.value = response.data;
        } catch (error) {
            mensaje.value = ['No fue posible conectarse con el servidor'];
        }
    }

    const setCompras = async (compra: CompraAgregar) => {
        try {
            const response = await comprasAPI.post('/', compra);
            
            // si hya un error en la respuesta
            if (response.data.error) {
                let { error } = response.data;
                // Asegurarse de que 'issues' existe antes de intentar accesar
                if (error && error.issues) {
                    mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
                } else {
                    mensaje.value = ['Error desconocido al agregar la compra'];
                }
            } else {
                mensaje.value = ['Compra agregada con éxito'];
            }
        } catch (error) {
            mensaje.value = ['Error al intentar agregar la compra.'];
            console.error(error);
        }
    };
    
    const updateCompras = async (compra: Compra) => {
        try {
            const response = await comprasAPI.put(/, compra);
            if (response.data.error) {
                let { error } = response.data;
                mensaje.value = error.issues.map((issue: { message: string }) => issue.message);
            }else{
                mensaje.value = ['Compra actualizada con éxito'];
            }
        } catch (error) {
            mensaje.value = ['Error al intentar actualizar la compra.'];
            console.error(error);
        }
    };

    return {
        compras,
        mensaje,
        getCompras,
        getComprasById,
        setCompras,
        updateCompras
    };
};