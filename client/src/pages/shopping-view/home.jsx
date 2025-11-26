import React, { useEffect, useState } from 'react';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwoe from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { Button } from '@/components/ui/button';
import {
  BabyIcon,
  BaggageClaim,
  ChevronLeftIcon,
  ChevronRight,
  ChevronRightIcon,
  Citrus,
  CloudLightning,
  Clover,
  Container,
  Lightbulb,
  Mic,
  Radical,
  ShirtIcon,
  UmbrellaIcon,
  Volleyball,
  WatchIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/components/ui/use-toast';
import ProductsDetailsDialog from '@/components/shopping-view/products-details';
import { getFeatureImages } from '@/store/common-slice';

const categoriesWithIcon = [
  { id: 'men', label: 'Men', icon: Citrus },
  { id: 'women', label: 'Women', icon: Container },
  { id: 'kids', label: 'Kids', icon: Clover },
  { id: 'accessories', label: 'Accessories', icon: Mic },
  { id: 'footwear', label: 'Footwear', icon: Radical },
];

const brandWithIcon = [
  { id: 'nike', label: 'Nike', icon: ShirtIcon },
  { id: 'adidas', label: 'Adidas', icon: Container },
  { id: 'puma', label: 'Puma', icon: Clover },
  { id: 'levi', label: "Levi's", icon: Radical },
  { id: 'zara', label: 'Zara', icon: Mic },
  { id: 'h&m', label: 'H&M', icon: Volleyball },
];
const ShoppingHome = () => {
  // const slides = [bannerOne, bannerTwoe, bannerThree];
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const handleNavigateToListingPage = (getCurentItem, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurentItem.id],
    };
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/shop/listing');
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  const handleAddToCart = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(
      addToCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: 'Product is added to cart',
        });
      }
    });
  };
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(productList, 'productList');
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full  h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}                     
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(categoryItem, 'category')}
                className="cursor-pointer hover:shadow-lg transition-shadow "
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop By Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ">
            {brandWithIcon.map((brandItem) => (
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow "
                onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Feature Products</h2>
          <div className="grid  grid-cols-1 sm:grid-col md:grid-cols-4 gap-6 ">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductsDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
};

export default ShoppingHome;
