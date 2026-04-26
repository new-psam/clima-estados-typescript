import { addDoc, collection, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getWeather } from "./api"
import { auth, db } from "./firebaseConfig";

//CREATE: Agora recebe a photoUrl de fora
export const addFavorityCity = async (cityName: string, comment: string, photoUrl: string) => {
    try {
        // 1. Validação: tenta buscar o clima para ver se a cidade existe
        const  weatherData = await getWeather(cityName);

        if (!weatherData) throw new Error("cidade não encontrada!");

        // 2. Busca de Foto: Usando o Lorem Flickr (Banco de fotos dinâmico)
        // Usamos o nome da cidade na URL para o serviço buscar uma foto relevante
        // const photoUrl = `https://loremflickr.com/600/400/city,${cityName.replace(' ', '')}`;

        //3. Gravação no Firestore
        await addDoc(collection(db, "favorite_cities"),{
            cityName: weatherData.name, //nome oficial retornado pela Api
            comment: comment,
            photoUrl: photoUrl, // Vem da tela (pode ser a padrão ou customizada)
            userId: auth.currentUser?.uid, // vincula ao login do Marcelino (usuário)
            createdAt: serverTimestamp(), //Data automática do servidor
        });

        return true;
    } catch (error) {
        console.error("Erro ao salvar cidade!", error);
        throw error;
    }
}

// UPDATE: A função que você vai usar para editar comentário e foto
export const updateFavorityCity = async (cityId: string, newComment: string, newPhotoUrl: string) => {
    try {
        const cityRef = doc(db, "favorite_cities", cityId);
        await updateDoc(cityRef, {
            comment: newComment,
            photoUrl: newPhotoUrl
        });
        return true;
    } catch (error) {
        console.error("Erro ao atualizar a cidade!", error);
        throw error;
    }
};

//DELETE: 
export const deleteFavorityCity = async (cityId: string) => {
    try {
        const cityRef = doc(db, "favorite_cities", cityId);
        await deleteDoc(cityRef);
        return true;
    } catch (error) {
        console.error("Erro ao deletar a cidade", error)   ;
        throw error;
    }
};