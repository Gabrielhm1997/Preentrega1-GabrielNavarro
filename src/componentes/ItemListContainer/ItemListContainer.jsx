import { useState, useEffect } from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom";
import { db } from "../../services/config";
import { getDocs, collection, query, where } from "firebase/firestore";

// import { cargarProductos } from "../../asyncmock";

const ItemListContainer = ({}) => {

        const [productos, setProductos] = useState([]);
    
        const { categoria } = useParams();

        useEffect(() => {

            const getProductos = () => {

                const inventario = query(collection(db, "inventario"));
                
                return inventario;
            }
            
            const getCategoria = (idCategoria) => {

                const inventarioPorCategoria = query(collection(db, "inventario"), where("categoria", "==", idCategoria));
                return inventarioPorCategoria;
            }

            const  funcionProductos =   categoria ? getCategoria : getProductos;
    
            getDocs(funcionProductos(categoria))
                .then(respuesta => {
                  setProductos(respuesta.docs.map((doc) => ({id: doc.id, ...doc.data()})));
                })
                .catch(error => console.log(error));

        }, [categoria])
     
        return (
            <>
                <h2 className="text-center m-2">{categoria ? categoria.toUpperCase() : "PRODUCTOS"}</h2>
    
                <div className="container-fluid">
                    <ItemList productos={productos} />
                </div>

                {/* <button type="button" onClick={cargarProductos}> Cargar Productos</button> */}
    
            </>
        )
    }
    
    export default ItemListContainer

// import { useState, useEffect } from "react"
// import ItemList from "../ItemList/ItemList"
// import { getProductos, getCategoria } from "../../asyncmock";
// import { useParams } from "react-router-dom";

// const ItemListContainer = ({}) => {

//     const [productos, setProductos] = useState([]);

//     const { categoria } = useParams();

//     useEffect(() => {

//         const funcionProductos = categoria ? getCategoria : getProductos;

//         funcionProductos(categoria)
//             .then(respuesta => setProductos(respuesta))
//             .catch(error => console.log(error))
//     }, [categoria])
 
//     return (
//         <>
//             <h2 className="text-center m-2">{categoria ? categoria.toUpperCase() : "PRODUCTOS"}</h2>

//             <div className="container-fluid">
//                 <ItemList productos={productos} />
//             </div>

//         </>
//     )
// }

// export default ItemListContainer