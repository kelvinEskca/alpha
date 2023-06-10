import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../CartContext";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import MobileNav from "../Components/MobileNav";
import axios from "axios";
import ImageCard from "../Components/ImageCard";
import ColorModal from "../Components/ColorModal";
import AlertModal from "../Components/AlertModal";
import baseUrl from "../config/config.js";
import Search from "../Components/Search";
const Details = () => {
  axios.defaults.withCredentials = true;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [colorModal, setColorModal] = useState(false);
  const [mobile, setMobile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectColor, setSelectColor] = useState([]);
  const [selectColorName, setSelectColorName] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [alertText,setAlertText] = useState('');
  const [search,setSearch] = useState(false);
  const [desctoggle,setDescToggle] = useState(false);
 
  const { id } = useParams();
  useEffect(() => {
    const getproducts = async () => {
      try {
        const res = await axios.get(
          `${baseUrl.baseUrl}/alphaapi/product/${id}`
        );
        setProducts([res.data]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getproducts();
  }, [id]);

  const handleMobile = () => {
    setMobile(!mobile);
  };
  const handleModal = () => {
    setModal(!modal);
  };

  const openModal = () => {
    setColorModal(!colorModal);
  };

  const handleClick = (size, item) => {
    setSelectedSizes({ ...selectedSizes, [item._id]: size });
    // addToCart({ ...item, size, color: selectColor,colorName:selectColorName });
  };

  const addToBag = (size,item) => {
    // setSelectedSizes({ ...selectedSizes, [item._id]: size });
    if (!size) {
      setIsSuccessModalOpen(true);
      setAlertText("Please Select a size!");
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 5000);
      return; // stop executing the function
    }
    if(selectColorName.length === 0){
      addToCart({...item, size, color: selectColor,colorName:item.colorName });
      setIsSuccessModalOpen(true);
      setAlertText("Item added to cart!");
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 5000);
    }
    else{
      addToCart({...item, size, color: selectColor,colorName:selectColorName });
      setIsSuccessModalOpen(true);
      setAlertText("Item added to cart!");
      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 5000);
    }
  }

  const handleColorUpdate = (color,colorName) => {
    setSelectColor(color);
    setSelectColorName(colorName);
  };

  const searchToggle = () =>{
    setSearch(!search);
  };

  const toggleDescription = (e) =>{
    if (e.target === e.currentTarget){
      console.log("clicked");
      setDescToggle(!desctoggle);
    }
  }
  
  return (
    <>
      <Header handleModal={handleModal} handleMobile={handleMobile} searchToggle={searchToggle} />
      <main className="main">
        <section className="section detailss">
          <div className="wrapper">
            <div className="boxes">
              <div className="mobile-center">
                {products.map((item, i) => {
                  return (
                    <div className="box" key={item._id}>
                      <div className="product-image">
                        {selectColor.length > 0 ? (
                          <img src={selectColor} alt={selectColor} />
                        ) : (
                          item.colors.map((col, i) => {
                            return col.image.map((pic, j) => {
                              return <img src={pic.url} alt={item.name} key={j} />;
                            });
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {user && user.isAdmin ? (
          <>
            {products.map((item, i) => {
              return (
                <div className="row-sections">
                  <section className="details">
                    <div className="bottom-wrapper">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          {selectColorName.length > 0 ? (<small>{selectColorName}</small>) : (<small>{item.colorName}</small>)}
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="row-top">
                        <div className="color-box">
                          <h3 className="heading">
                            {products && products.length} color (s) |{" "}
                            {selectColorName.length > 0 ? (selectColorName) : (item.colorName)}
                          </h3>
                          <div className="color-rounds">
                            {products.map((img, i) => {
                              return (
                                img.colors.map((bg,j)=>{
                                  return(
                                    bg.image.map((bgimg,k)=>{
                                      return(
                                        <div className="color-image">
                                          <img
                                            src={bgimg.url}
                                            alt={bgimg.url}
                                            onClick={() =>
                                              handleColorUpdate(bgimg.url,bg.colorName)
                                            }
                                          />
                                        </div>
                                      )
                                    })
                                  )
                                })
                              );
                            })}
                          </div>
                        </div>

                        <div className="sizes-box">
                          <div className="top">
                            <h3 className="heading">Size</h3>
                          </div>

                          <div className="size-box">
                            {item.sizes.map((size, i) => {
                              return (
                                <div className="size">
                                  <small>{size}</small>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="desc-box">
                        <div className={`description ${desctoggle ? ("descOpen") : ("description")}`}>
                          <div className="desc-top" onClick={toggleDescription}>
                            <h3 className="heading">Description</h3>
                            <h3 className="heading">{desctoggle ? ("-") : ("+")}</h3>
                          </div>

                          <div className="desc-bottom">
                            <p className="paragraph">{item.desc}</p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="addbtn"
                        onClick={openModal}
                      >
                        Upload Colors
                      </button>
                    </div>
                  </section>
                </div>
              );
            })}

            {products.map((item, i) => {
              return (
                <div className="desktop-details">
                  <div className="desktop-details-top">
                    <div className="grid-top">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          {selectColorName.length > 0 ? (<small>{selectColorName}</small>) : (<small>{item.colorName}</small>)}
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="center">
                        {products.map((item, i) => {
                          return (
                            <div className="box" key={item._id}>
                              <div className="product-image">
                                {selectColor.length > 0 ? (
                                  <img src={selectColor} alt={selectColor} />
                                ) : (
                                  item.colors.map((col, i) => {
                                    return col.image.map((pic, j) => {
                                      return <img src={pic.url} alt={item.name} key={j} />;
                                    });
                                  })
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="right">
                        <div className="row-top">
                          <div className="color-box">
                            <h3 className="heading">
                              {products && products.length} color (s) |{" "}
                             {selectColorName.length > 0 ? (selectColorName) : (item.colorName)}
                            </h3>
                            <div className="color-rounds">
                            {products.map((img, i) => {
                              return (
                                
                                img.colors.map((bg,j)=>{
                                  return(
                                    bg.image.map((bgimg,k)=>{
                                      return(
                                        <div className="color-image">
                                          <img
                                            src={bgimg.url}
                                            alt={bgimg.url}
                                            onClick={() =>
                                              handleColorUpdate(bgimg.url,bg.colorName)
                                            }
                                          />
                                        </div>
                                      )
                                    })
                                  )
                                })
                                
                              );
                            })}
                            </div>
                          </div>

                          <div className="sizes-box">
                            <div className="top">
                              <h3 className="heading">Size</h3>
                            </div>

                            <div className="size-box">
                              {item.sizes.map((size, i) => {
                                return (
                                  <div className="size">
                                    <small>{size}</small>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="addbtn"
                          onClick={openModal}
                        >
                          Upload Colors
                        </button>
                      </div>
                    </div>

                    <div className="grid-bottom">
                      <span>
                        <div className="top">
                          <p className="paragraph">{item.desc}</p>
                        </div>

                        <div className="bottom">
                          <h3 className="heading">Description</h3>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="row-sections">
              <section className="details">
                {products.map((item, i) => {
                  return (
                    <div className="bottom-wrapper">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          {selectColorName.length > 0 ? (<small>{selectColorName}</small>) : (<small>{item.colorName}</small>)}
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="row-top">
                        <div className="color-box">
                          <h3 className="heading">
                            {products && products.length} color (s) |{" "}
                           {selectColorName.length > 0 ? (selectColorName) : (item.colorName)}
                          </h3>
                          <div className="color-rounds">
                            {products.map((img, i) => {
                              return (
                                
                                img.colors.map((bg,j)=>{
                                  return(
                                    bg.image.map((bgimg,k)=>{
                                      return(
                                        <div className="color-image">
                                          <img
                                            src={bgimg.url}
                                            alt={bgimg.url}
                                            onClick={() =>
                                              handleColorUpdate(bgimg.url,bg.colorName)
                                            }
                                          />
                                        </div>
                                      )
                                    })
                                  )
                                })
                                
                              );
                            })}
                          </div>
                        </div>

                        <div className="sizes-box">
                          <div className="top">
                            <h3 className="heading">Select Size</h3>
                          </div>

                          <div className="size-box">
                            {item.sizes.map((size, i) => {
                              return (
                                <div
                                  className="size"
                                  onClick={() => handleClick(size, item)}
                                >
                                  <small className={`${
                                  size === selectedSizes[item._id] ? 'sizeActive' : ''}`}>{size}</small>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="desc-box">
                        <div className={`description ${desctoggle ? ("descOpen") : ("description")}`}>
                          <div className="desc-top" onClick={toggleDescription}>
                            <h3 className="heading">Description</h3>
                            <h3 className="heading">{desctoggle ? ("-") : ("+")}</h3>
                          </div>

                          <div className="desc-bottom">
                            <p className="paragraph">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                      <button className={selectedSizes.length > 0 ? ("addbtnactive") : ("addbtn")} onClick={() => addToBag(selectedSizes[item._id], item)}>Add to bag</button>
                    </div>
                  );
                })}
              </section>

              <section className="section new details-page">
                <div className="wrapper">
                  <div className="area">
                    <h3 className="heading">You May Also Like</h3>
                  </div>
                  <div className="boxes">
                    <ImageCard />
                  </div>
                </div>
              </section>
            </div>

            {products.map((item, i) => {
              return (
                <div className="desktop-details">
                  <div className="desktop-details-top">
                    <div className="grid-top">
                      <div className="top">
                        <div className="left">
                          <h3 className="heading">{item.name}</h3>
                          <p className="paragraph">{item.desc}</p>
                          <small>{item.category}</small>
                          {selectColorName.length > 0 ? (<small>{selectColorName}</small>) : (<small>{item.colorName}</small>)}
                        </div>
                        <div className="right">
                          <h3 className="heading red">${item.price}</h3>
                        </div>
                      </div>

                      <div className="center">
                        {products.map((item, i) => {
                          return (
                            <div className="box" key={item._id}>
                              <div className="product-image">
                                {selectColor.length > 0 ? (
                                  <img src={selectColor} alt={selectColor} />
                                ) : (
                                  item.colors.map((img, i) => {
                                    img.image.map((bgimg,k)=>{
                                      return <img src={bgimg.url} alt={bgimg.url} />;
                                    })
                                  })
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="right">
                        <div className="color-box">
                          <h3 className="heading">
                            {products && products.length} color (s) |{" "}
                           {selectColorName.length > 0 ? (selectColorName) : (item.colorName)}
                          </h3>
                          <div className="color-rounds">
                            {products.map((img, i) => {
                              return (
                                
                                img.colors.map((bg,j)=>{
                                  return(
                                    bg.image.map((bgimg,k)=>{
                                      return(
                                        <div className="color-image">
                                          <img
                                            src={bgimg.url}
                                            alt={bgimg.url}
                                            onClick={() =>
                                              handleColorUpdate(bgimg.url,bg.colorName)
                                            }
                                          />
                                        </div>
                                      )
                                    })
                                  )
                                })
                              );
                            })}
                          </div>
                        </div>

                        <div className="sizes-box">
                          <div className="top">
                            <h3 className="heading">Select Size</h3>
                          </div>

                          <div className="size-box">
                            {item.sizes.map((size, i) => {
                              return (
                                <div
                                  className="size"
                                  onClick={() => handleClick(size, item)}
                                >
                                  <small className={`${
                                  size === selectedSizes[item._id] ? 'sizeActive' : ''}`}>{size}</small>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <button className={selectedSizes > 0 ? ("addbtnactive") : ("addbtn")} onClick={() => addToBag(selectedSizes[item._id], item)}>Add to bag</button>
                      </div>
                    </div>

                    <div className="grid-bottom">
                      <span>
                        <div className="top">
                          <p className="paragraph">{item.desc}</p>
                        </div>

                        <div className="bottom">
                          <h3 className="heading">Description</h3>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <section className="section new details-page desktop-details-page">
              <div className="wrapper">
                <div className="area">
                  <h3 className="heading">You May Also Like</h3>
                </div>
                <div className="boxes">
                  <ImageCard />
                </div>
              </div>
            </section>
          </>
        )}

        <ColorModal openModal={openModal} colorModal={colorModal} />
        <Modal modal={modal} handleModal={handleModal} />
        <MobileNav mobile={mobile} handleMobile={handleMobile} />
        <AlertModal isOpen={isSuccessModalOpen} alertText={alertText} onClose={() => setIsSuccessModalOpen(false)} />
        <Search search={search} searchToggle={searchToggle} />
      </main>
      <Footer />
    </>
  );
};

export default Details;
