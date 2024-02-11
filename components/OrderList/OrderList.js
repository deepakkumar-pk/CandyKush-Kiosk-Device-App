import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import OrderDetail from "./OrderDetail/OrderDetail";
import { selectCartItems } from "@/Redux/Slices/cartSlice";

const ProductList = ({ type, quality, size, price, buymore, lang }) => {
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);

  const handleUpdateData = () => {
    const route = `/${lang}/products`;
    router.push(route, undefined, { locale: lang });
  };


  return (
    <>
      <motion.div
        className="space-y-4 py-2 px-2 max-h-[27rem] overflow-y-auto"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }} // Shorter delay for the first item
      >
        {cartItems.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }} // Delay each item
          >
            <OrderDetail
              product={product}
              quality={quality}
              size={size}
              price={price}
              type={type}
            />
          </motion.div>
        ))}
      </motion.div>
      {cartItems.length > 0 && (
        <motion.div
          className="flex justify-start items-center py-2"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: cartItems.length * 0.2 + 0.5 }} // Delay for the buy more button
        >
          <button
            className="relative px-4 py-2 line-clamp-3 backdrop-blur-lg bg-white bg-opacity-40 rounded-full shadow-[0_1px_2px_rgb(0,0,0,0.5)] text-carpetMoss text-center w-44 h-12 font-semibold"
            onClick={handleUpdateData}
          >
            {buymore}
          </button>
        </motion.div>
      )}
    </>
  );
};

export default ProductList;
