import React, { useEffect, useState } from 'react';
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';

const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products asynchronously
    const fetchData = async () => {
      await dispatch(fetchAsyncProducts(50)); // Fetch products
    };

    fetchData();

    // Set loading to false when categories are loaded
    if (categories.length > 0) {
      setLoading(false);
    }
  }, [dispatch, categories]); // Trigger re-fetch when categories change

  // Randomizing the products
  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  // Filter products by category (only proceed if categories are available)
  let catProductsOne = categories[0] ? products.filter(product => product.category === categories[0].name) : [];
  let catProductsTwo = categories[1] ? products.filter(product => product.category === categories[1].name) : [];
  let catProductsThree = categories[2] ? products.filter(product => product.category === categories[2].name) : [];
  let catProductsFour = categories[3] ? products.filter(product => product.category === categories[3].name) : [];

  // Show loading message while data is fetching
  if (loading || productStatus === STATUS.LOADING) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md'>
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
            </div>

            {categories.length > 0 && (
              <>
                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[0].name}</h3> {/* Access name property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[1].name}</h3> {/* Access name property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[2].name}</h3> {/* Access name property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
                </div>

                <div className='categories-item'>
                  <div className='title-md'>
                    <h3>{categories[3].name}</h3> {/* Access name property */}
                  </div>
                  {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;


