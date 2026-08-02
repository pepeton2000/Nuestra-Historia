export default class SaveSystem {

    static guardar(datos){

        localStorage.setItem(

            "NuestraHistoria",

            JSON.stringify(datos)

        );

    }

    static cargar(){

        let datos=localStorage.getItem(

            "NuestraHistoria"

        );

        if(datos){

            return JSON.parse(datos);

        }

        return {

            rosas:0,

            cartas:0,

            logros:[],

            completado:false

        };

    }

    static borrar(){

        localStorage.removeItem(

            "NuestraHistoria"

        );

    }

}
