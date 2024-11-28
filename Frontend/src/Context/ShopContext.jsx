import react, { createContext, useEffect, useState } from 'react'




export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {


    const defaultCart = () => {
        const savedCart = localStorage.getItem('cartItem')
        return savedCart ? JSON.parse(savedCart) : {}
    }

    const [all_product, setAll_Product] = useState([])
    const [cartItem, setCartItem] = useState(() => {
        const initialCart = {};
        all_product.forEach((product) => {
            initialCart[product.id] = 0; // Initialize cartItem for all products
        });
        return initialCart;
    });

    useEffect(()=>{
        fetch('https://e-commerce-backend-iota-khaki.vercel.app/allproduct')
        .then((response)=>response.json())
        .then((data)=>{setAll_Product(data)})

        if(localStorage.getItem('auth-token')) {
            fetch('https://e-commerce-backend-iota-khaki.vercel.app/getCart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: ""
            }).then((response)=>response.json())
            .then((data)=>{setCartItem(data)})
        }

    }, [])

    
    
    const addToCart = (itemId) => {
        setCartItem((prev)=>{
        const updatedCart = {...prev, [itemId]: (prev[itemId] || 0) + 1}


        if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-backend-iota-khaki.vercel.app/addtocart',{
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({itemId})
            }).then((response)=>response.json()).then((data)=>console.log(data))
        }
        // localStorage.setItem('cartItem', JSON.stringify(updatedCart))
        return updatedCart
        })

        console.log(cartItem);
    }
    
    
    const removeFromCart = (itemId) => {
        setCartItem( (prev) =>{
             const updatedCart = {...prev} 
             
             if (updatedCart[itemId]>1) {
                updatedCart[itemId] -= 1
            }else{
                delete updatedCart[itemId]
            }




             if(localStorage.getItem('auth-token')){
                fetch('https://e-commerce-backend-iota-khaki.vercel.app/removefromcart',{
                    method: 'POST',
                    headers:{
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({itemId})
                }).then((response)=>response.json()).then((data)=>console.log(data))
            }
            return updatedCart
        })
    }
    
    const getTotalItems = () =>{
        let totalItem = 0
        for(const item in cartItem){
            if (cartItem[item]>0) {
                totalItem+=cartItem[item];
            }
        }
        return totalItem
    }

    const contextValue = {all_product, cartItem, removeFromCart, addToCart, getTotalItems}



    return(
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider

