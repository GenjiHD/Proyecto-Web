import { ref } from "vue";
import type { Personal, PersonalAgregar } from "../interfaces/Personal-interface";
import PersonalAPI from "../api/PersonalAPI";
import axios from "axios";

export const UsePersonal = () => {
    const personal = ref<Personal[]>([]);
    let message = ref(0);

    const getPersonal = async () => {
        try {
            const response = await PersonalAPI.get<Personal[]>('/');
            personal.value = response.data;
        } catch (err) {
            console.log(err);
        }
    };

    const getPersonalId = async (id:number) => {
        try{
            const response = await PersonalAPI.get<Personal[]>('/'+id);
        personal.value = response.data;
        }catch(err){
            console.log(err);
        }
    };

    const agregarPersonal = async (personal: PersonalAgregar) => {
        try{
            const response = await PersonalAPI.post('/', personal);
            if(response.data.affectedRows >= 1){
                message.value = 1;
            }
        }catch(err){
            console.log(err);
        }
    };

    const updatePersonal = async (personal:Personal) => {
        try{
            const response = await PersonalAPI.put('/',personal);
            if(response.data.affectedRows >= 1){
                message.value = 1;
            }
        }catch(err){
            console.log(err);
        }
    };

    const deletePersonal = async (personal:Personal) => {
        try{
            const response = await PersonalAPI.delete('/',{data: {id: personal.id}});
            if(response.data.fieldCount == 0){
                message.value = 1;
            }
        }catch(err){
            console.log(err);
        }
    };

    return{
        personal,
        message,
        getPersonal,
        agregarPersonal,
        getPersonalId,
        updatePersonal,
        deletePersonal
    };
};
