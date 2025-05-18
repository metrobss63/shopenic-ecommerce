import React, { useEffect, useMemo } from 'react';
import './HomePage.css';
import HeaderSlider from '../../components/Slider/HeaderSlider';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from '../../components/ProductList/ProductList';
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import { STATUS } from '../../utils/status';
import shuffle from 'lodash.shuffle';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  const isLoading = productStatus === STATUS.LOADING;

  useEffect(() => {
    if (productStatus === STATUS.IDLE) {
      dispatch(fetchAsyncProducts(50));
    }
  }, [dispatch, productStatus]);



  const shuffledProducts = useMemo(() => {
    return products.length ? shuffle(products) : [];
  }, [products]);



  const categorizedProducts = useMemo(() => {
    if (!categories.length || !products.length) return [];
    return categories.slice(0, 4).map((cat) =>
      products.filter((p) => p.category === cat.name).slice(0, 3)
    );
  }, [categories, products]);

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>

      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          {isLoading ? (
            <></>
          ) : (
            <div className='categories py-5'>
              <div className='categories-item'>
                <div className='title-md'>
                  <h3>See our products</h3>
                </div>

                <ProductList products={shuffledProducts} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;









const dta = {
  availabilityStatus: "In Stock",
  brand: "Essence",

  category: "beauty",

  description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",

  dimensions: {
    depth: 22.99,
    height: 13.08,
    width: 15.14,
  },

  discountPercentage: 10.48,
  id: 1,
  images: ['https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'],


  meta: {
    barcode: "5784719087687",
    createdAt: "2025-04-30T09:41:02.053Z",
    qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
    updatedAt: "2025-04 - 30T09: 41:02.053Z",
  },

  minimumOrderQuantity: 48,
  price: 9.99,
  rating: 2.56,
  returnPolicy: "No return policy",
  reviews: [{
    comment: "Would not recommend!",
    date: "2025-04-30T09:41:02.053Z",
    rating: 3,
    reviewerEmail: "eleanor.collins@x.dummyjson.com",
    reviewerName: "Eleanor Collins",
  }],

  shippingInformation: "Ships in 3-5 business days",
  sku: "BEA-ESS-ESS-001",
  stock: 99,
  tags: ["beauty", "mascara"],

  thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  title: "Essence Mascara Lash Princess",
  warrantyInformation: "1 week warranty",
  weight: 4

}